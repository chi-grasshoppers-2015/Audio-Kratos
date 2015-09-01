class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false
      t.datetime :start,
      t.datetime :finish

      t.timestamps null: false
    end
  end
end
