class PlaylistEventsController < ApplicationController

  def create
    @playlistevent = PlaylistEvent.new(playlistevent_params)
  end

  private

    def playlistevent_params
      params.require(:playlistevent).permit(:playlist_id, :event_id)
    end

end
