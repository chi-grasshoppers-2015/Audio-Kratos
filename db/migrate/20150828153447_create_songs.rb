class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string  :original_filepath, null: false
      t.string  :original_filename, null: false
      t.string  :s3_url, null: false
      t.string  :s3_filename, null: false
      t.string  :artist
      t.string  :album
      t.integer :track
      t.string  :title
      t.string  :genre
      t.integer :release_year
      t.integer :owner_id, null: false

      t.timestamps null: false
    end
  end
end
