require 'taglib'

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
      owner_id: current_user.id
    )

    @song.create_s3

    # i think the reason that this doesn't work is that we don't know how to
    # get the file into the correct format to feed into taglib
    # p obj.public_url
    # TagLib::MPEG::File(obj.public_url) do |fileref|
    #   unless fileref.null?
    #       tag = fileref.tag
    #       p tag
    #   else
    #       p "file was null"
    #   end
    # end

    # Save the upload
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
