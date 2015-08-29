class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :url, null: false
      t.string :filename, null: false
      t.string :artist
      t.string :album
      t.string :song_name
      t.integer :owner_id, null: false

      t.timestamps null: false
    end
  end
end
