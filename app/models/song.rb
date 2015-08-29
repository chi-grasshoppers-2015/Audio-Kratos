class Song < ActiveRecord::Base
  belongs_to :owner, class_name: "User"

  def destroy_both
    self.destroy_s3
    self.destroy
  end

  def destroy_s3
    s3 = Aws::S3::Resource.new(region:'us-west-2')
    s3.bucket('bytewayve').object(self.filename).delete
  end

end
