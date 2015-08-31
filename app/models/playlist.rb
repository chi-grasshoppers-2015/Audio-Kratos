class Playlist < ActiveRecord::Base
  belongs_to :owner, class_name: "User"

  has_many :playlist_associations
  has_many :songs, through: :playlist_associations

end
