class Playlist < ActiveRecord::Base
  belongs_to :owner, class_name: "User"

  has_many :playlist_associations
  has_many :songs, through: :playlist_associations

  has_many :playlist_events
  has_many :events, through: :playlist_events


  def owner
    User.find(self.owner_id).name
  end

end
