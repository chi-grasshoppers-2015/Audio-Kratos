
class SongsController < ApplicationController

  def index
  end

  def new
  end

  def create

    file = params[:file]

    @song = Song.new(
      original_filepath: file.path,
      original_filename: file.original_filename,
      owner_id: current_user.id,
    )

    @song.create_s3

    TagLib::MPEG::File.open(file.path) do |fileref|
      unless fileref.nil?
        tag = fileref.id3v2_tag
        @song.assign_attributes(  artist: tag.artist,
                                  album: tag.album,
                                  track: tag.track,
                                  title: tag.title,
                                  genre: tag.genre,
                                  release_year: tag.year
                                )
      end
    end

    if @song.save
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
