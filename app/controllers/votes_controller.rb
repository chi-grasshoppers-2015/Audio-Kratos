class VotesController < ApplicationController

  def create
    @event = Event.find(params[:vote][:event_id])
    @song = Song.find(params[:vote][:song_id])
    @vote = Vote.new(vote_params)

    if @vote.save
      @song.update_vote_count
      redirect_to @event
    else
      redirect_to @event
    end
  end

  def vote_params
    params.require(:vote).permit(:user_id, :song_id, :value)
  end

end
