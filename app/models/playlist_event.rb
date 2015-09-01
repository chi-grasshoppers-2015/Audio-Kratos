class PlaylistEvent < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :event


end
