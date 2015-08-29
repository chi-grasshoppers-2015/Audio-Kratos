class User < ActiveRecord::Base
  has_many :songs, foreign_key: "owner_id"

  validates_presence_of :first_name, :last_name, :email, :hashed_password,
  validates :email, uniqueness: true

  def password
    @password ||= BCrypt::Password.new(hashed_password)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.hashed_password = @password
  end

  def self.authenticate(email, password)
    @user = User.find_by_email(email)
    @user if @user && @user.password == password
  end

end
