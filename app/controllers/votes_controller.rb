class VotesController < ApplicationController

  def create
    @event = Event.find(params[:vote][:event_id])
    @song = Song.find(params[:vote][:song_id])

    @vote = Vote.find_by(song_id: params[:vote][:song_id],user_id: params[:vote][:user_id])

    if @vote
      @vote.assign_attributes(vote_params)
    else
      @vote = Vote.new(vote_params)
    end


    if request.xhr?
      if @vote.save
        @song.update_vote_count
        @songs = @event.songs
        if @event.current_song
          @current_song = @event.current_song
          @songs = @songs - [@current_song]
          @songs.shuffle!
          @all_songs = [@current_song] + @songs
        else
          @all_songs = @event.songs
        end

        if current_user == @event.owner
          render :json => { :attachmentPartial => render_to_string('events/_event_rows', :layout => false), :songs => @all_songs }
        else
          render :json => { :attachmentPartial => render_to_string('events/_event_guest_rows', :layout => false), :songs => @all_songs }
        end

      end
    else
      if @vote.save
        @song.update_vote_count
        redirect_to @event
      else
        redirect_to @event
      end
    end
  end

  def vote_params
    params.require(:vote).permit(:user_id, :song_id, :value)
  end

end
