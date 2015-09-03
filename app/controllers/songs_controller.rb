class SongsController < ApplicationController
  include SongsHelper
  # helper_method :sort_column, :sort_direction

  def index
    @songs = current_user.songs.order(sort_column + " " + sort_direction)
  end

  def new

  end

  def create

    file = params[:file]

    @song = Song.new(
      original_filepath: file.path,
      original_filename: file.original_filename,
      owner_id: current_user.id
    )

    @song.create_s3


    mfile = File.open(file.path, "rb")
    tag = ID3Tag.read(mfile)
    if tag.artist && tag.album
      images = ALBUMART.search("#{tag.artist}", "#{tag.album}", [:medium, :large])
    else
      images = {:images => {:medium => "untitled"}}
    end
        @song.assign_attributes(  artist: sanitize(tag.artist), 
                                  album: sanitize(tag.album),
                                  track: sanitize(tag.track_nr),
                                  title: sanitize(tag.title),
                                  genre: sanitize_genre(tag.genre),
                                  release_year: sanitize(tag.year),
                                  album_url: images[:images][:medium] || "untitled"
                                )

    if @song.save
      playlist = Playlist.find_by(owner_id: current_user.id, name: "All songs")
      PlaylistAssociation.create(song_id: @song.id, playlist_id: playlist.id)

      redirect_to songs_path, success: 'File successfully uploaded'
    else
      flash.now[:notice] = 'There was an error'
      render :new
    end
  end

  def show
    @song = Song.find(params[:id])
  end

  def destroy

    @song = Song.find(params[:id])

    if (@song)
      @song.destroy_both
      redirect_to songs_path
    else
      render :text => "No song was found to delete!"
    end

  end

end
