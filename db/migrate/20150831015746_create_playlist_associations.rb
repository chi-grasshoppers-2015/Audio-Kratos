class CreatePlaylistAssociations < ActiveRecord::Migration
  def change
    create_table :playlist_associations do |t|
      t.integer :song_id, null: false
      t.integer :playlist_id, null: false

      t.timestamps null: false
    end
  end
end
