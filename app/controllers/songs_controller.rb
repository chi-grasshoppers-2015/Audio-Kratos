require 'taglib'

class SongsController < ApplicationController

  def index
  end

  def new
  end

  def create

    @bucket = bucket
    @resource = upload_resource

    file = params[:file]

    # Upload the song
    obj = @resource.bucket('bytewayve').object(file.original_filename)
    obj.upload_file(file.path, acl: "public-read")


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



    # Create an object for the upload
    @song = Song.new(
      url: obj.public_url,
      filename: obj.key,
      owner_id: current_user.id
    )

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


  private

  def upload_resource
    Aws::S3::Resource.new(region:'us-west-2')
  end

  def buckets
    s3 = Aws::S3::Client.new
    resp = s3.list_buckets
    resp.buckets
  end

  def bucket
    buckets.first
  end
end
