class PlaylistsController < ApplicationController
  # include PlaylistsHelper
  # helper_method :sort_column, :sort_direction
  include ApplicationHelper
  helper_method :sort_column, :sort_direction

  def index
    @playlists = Playlist.where(owner_id: current_user.id)
  end

  def show
    @playlist = Playlist.find(params[:id])
    @songs = @playlist.songs.order(sort_column + " " + sort_direction)



  end

end
