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
    @vote = Vote.new
    @my_event = current_user.id == @event.owner_id
    @songs = @event.songs

    # use the current song id from the event to find the current song
    if @event.current_song
      @current_song = @event.current_song
      # subtract out the current song from the songs list
      @songs = @songs - [@current_song]
    end

    # sort the rest of the songs descending by net vote total



    # push the current song to the front of the list


  end

  def update
    @event = Event.find(params[:id])
    @vote = Vote.new
    @songs = @event.songs
    @all_songs = @songs
    @event.assign_attributes(event_params)
    if @event.save
      # use the current song id from the event to find the current song
      if @event.current_song
        @current_song = @event.current_song
        # subtract out the current song from the songs list
        @songs = @songs - [@current_song]
        @all_songs = [@current_song] + @songs
      end

    end

    if request.xhr?
      render :json => { :attachmentPartial => render_to_string('_event_rows', :layout => false), :songs => @all_songs }
      # render partial: "event_rows"
    end

  end

  def index
    @my_events = current_user.events
  end

  private

    def event_params
      params.require(:event).permit(:name, :owner_id, :start, :finish, :current_song_id)
    end

end
