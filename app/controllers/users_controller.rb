class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.valid?
      session[:user_id] = @user.id
      redirect_to @user
    else
      render 'new'
    end
  end

  def show
    @user = User.find(params[:id])
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  # def update
  #   @user = User.find(params[:id])
  #   @user.update_attributes!(user_params)
  #   # redirect_to action: "show", id: @user.id
  #   redirect_to @user
  # end

  # def destroy
  #   User.find(params[:id]).destroy
  #   redirect_to users_url
  # end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password)
    end

end
