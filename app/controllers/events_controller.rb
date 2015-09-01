class EventsController < ApplicationController

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    @event.assign_attributes(owner_id: session[:user_id])

    if @event.save
      redirect_to @event
    else
      render 'new'
    end
  end

  def show
    @event = Event.find(params[:id])
    @event_playlists = @event.playlists
    @my_playlists = Playlist.where(owner_id: session[:user_id])
    @open_playlists = @my_playlists - @event_playlists
    @playlistevent = PlaylistEvent.new
    @songs = @event.songs
  end

  def index

  end

  private

    def event_params
      params.require(:event).permit(:name, :owner_id, :start, :finish)
    end

end