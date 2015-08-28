class UploadsController < ApplicationController

  def index
    @uploads = Upload.all
    @buckets = buckets
  end

  def new
  end

  def create

    @bucket = bucket
    @resource = upload_resource
    obj = @resource.bucket('bytewayve').object(params[:file].original_filename)

    obj.upload_file(params[:file].path, :acl => :public_read)

    # params[:file].original_filename)

    # Make an object in your bucket for your upload
    # obj = S3_BUCKET.objects[params[:file].original_filename]

    # Upload the file
    # obj.write(
    #   file: params[:file],
    #   acl: :public_read
    # )

    # Create an object for the upload
    @upload = Upload.new(
      url: obj.public_url,
      name: obj.key
    )

    # Save the upload
    if @upload.save
      redirect_to uploads_path, success: 'File successfully uploaded'
    else
      flash.now[:notice] = 'There was an error'
      render :new
    end
  end

  def show
    @upload = Upload.find(params[:id])
  end


  private

  def upload_resource
    s3 = Aws::S3::Resource.new(region:'us-west-2')
  end

  #  def upload_object(file_name, object_to_upload)
         #   s3 = rails ::Resource.new(region:'us-west-2')
         #   obj = s3.bucket('bucket-name').object(file_name)
         #   obj.upload_file(object_to_upload)
         # end

  def buckets
    s3 = Aws::S3::Client.new
    resp = s3.list_buckets
    resp.buckets
  end

  def bucket
    buckets.first
  end
end
