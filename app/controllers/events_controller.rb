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

    if current_user == @event.owner
      @event.assign_attributes(event_params)
      @event.save
    end

    if @event.current_song
      @current_song = @event.current_song

      @songs = @songs - [@current_song]

      @songs.shuffle!

      @songs.sort! {|a,b| b.net_votes <=> a.net_votes}

      if current_user == @event.owner
        @all_songs.each { |song| song.votes.each {|vote| vote.destroy}}
        @all_songs.each { |song| song.update_attributes(net_votes: 0)}
      end

      @all_songs = [@current_song] + @songs


    end


    if request.xhr?
      if current_user == @event.owner
        render :json => { :attachmentPartial => render_to_string('_event_rows', :layout => false), :songs => @all_songs }
      else
        render :json => { :attachmentPartial => render_to_string('_event_guest_rows', :layout => false), :songs => @all_songs }
      end
      # render partial: "event_rows"
    end

  end

  def tally
    @event = Event.find(params[:id])
    @vote = Vote.new
    @songs = @event.songs
    @all_songs = @songs

    if @event.current_song
      @current_song = @event.current_song

      @songs = @songs - [@current_song]

      @songs.shuffle!

      @songs.sort! {|a,b| b.net_votes <=> a.net_votes}

      @all_songs = [@current_song] + @songs


    end


    if request.xhr?
      if current_user == @event.owner
        render :json => { :attachmentPartial => render_to_string('_event_rows', :layout => false), :songs => @all_songs }
      else
        render :json => { :attachmentPartial => render_to_string('_event_guest_rows', :layout => false), :songs => @all_songs }
      end
    end

  end

  def index
    if logged_in?
      @events = Event.all
    end
  end

  def destroy

    @event = Event.find(params[:id])

    if (@event)
      @event.destroy
      redirect_to events_path
    else
      render :text => "No event was found to delete!"
    end

  end

  private

    def event_params
      params.require(:event).permit(:name, :owner_id, :start, :finish, :current_song_id)
    end

end
