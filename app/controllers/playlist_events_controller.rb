class PlaylistEventsController < ApplicationController

  def create
    @event = Event.find(params[:event_id])

    @playlist = Playlist.find(params[:playlist_event][:playlist_id])
    @playlistevent = PlaylistEvent.new(playlist_id: @playlist.id, event_id: @event.id)

    if @playlistevent.save
      @playlist.songs.each { |song| song.votes.each {|vote| vote.destroy}}
      @playlist.songs.each { |song| song.update_attributes(net_votes: 0)}
   
      redirect_to @event
    else
      redirect_to @event
    end
  end


  def destroy
    @event = Event.find(params[:event_id])
    PlaylistEvent.find_by(playlist_id: params[:playlist_event][:playlist_id], event_id: params[:event_id]).destroy
    redirect_to @event
  end

  private

    def playlistevent_params
      params.require(:playlistevent).permit(:playlist_id)
    end

end
