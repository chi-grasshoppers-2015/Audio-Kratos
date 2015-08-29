class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false, unique: true
      t.string :hashed_password, null: false

      t.timestamps null: false
    end
  end
end
