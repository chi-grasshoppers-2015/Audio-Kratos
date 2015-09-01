class PlaylistEventsController < ApplicationController

  def create
    @event = Event.find(params[:event_id])
    @playlistevent = PlaylistEvent.new(playlist_id: params[:playlist_event][:playlist_id], event_id: params[:event_id])

    if @playlistevent.save
      redirect_to @event
    else
      redirect_to @event
    end
  end

  private

    def playlistevent_params
      params.require(:playlistevent).permit(:playlist_id)
    end

end
