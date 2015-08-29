class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_action :authenticate

  include SessionsHelper
  include UsersHelper

  def authenticate
    if !logged_in?
      redirect_to :root, flash: { error: "You must be logged in to access that." }
    end
  end
end
