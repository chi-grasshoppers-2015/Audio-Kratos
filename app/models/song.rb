require 'taglib'

class Song < ActiveRecord::Base
  belongs_to :owner, class_name: "User"

  has_many :playlist_associations
  has_many :playlists, through: :playlist_associations


  def create_s3
    @bucket = bucket
    @resource = upload_resource
    self.s3_filename = create_token(self.original_filename) + ".mp3"
    obj = @resource.bucket('bytewayve').object(self.s3_filename)
    obj.upload_file(self.original_filepath, acl: "public-read")
    self.s3_url = obj.public_url
  end

  def destroy_both
    self.destroy_s3
    self.destroy
  end

  def destroy_s3
    s3 = Aws::S3::Resource.new(region:'us-west-2')
    s3.bucket('bytewayve').object(self.s3_filename).delete
  end

  private

  def create_token(input)
    Digest::SHA1.hexdigest(input + Time.now.to_s)
  end

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
