class CreatePlaylistEvents < ActiveRecord::Migration
  def change
    create_table :playlist_events do |t|
      t.integer :playlist_id, null: false
      t.integer :event_id, null: false

      t.timestamps null: false
    end
  end
end
