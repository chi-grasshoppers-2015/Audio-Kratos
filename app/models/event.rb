class Event < ActiveRecord::Base
  has_many :playlist_events
  has_many :playlists, through: :playlist_events

  has_many :songs, through: :playlists
end
