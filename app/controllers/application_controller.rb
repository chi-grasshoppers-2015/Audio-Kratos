class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_action :authenticate

  include SessionsHelper
  include UsersHelper
  include ApplicationHelper
  helper_method :sort_column, :sort_direction

  def authenticate
    if !logged_in?
      redirect_to :root, flash: { error: "You must be logged in to access that." }
    end
  end

  private

  def sort_column
    current_user.songs.column_names.include?(params[:sort]) ? params[:sort] : "title"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
