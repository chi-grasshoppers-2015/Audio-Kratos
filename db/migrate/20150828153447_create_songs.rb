class CreateSongs < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.string :url, null: false
      t.string :filename, null: false
      t.string :artist, null: false
      t.string :album, null: false
      t.string :song_name, null: false
      t.integer :owner_id, null: false

      t.timestamps null: false
    end
  end
end
