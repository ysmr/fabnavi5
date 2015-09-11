class CreateCalibrations < ActiveRecord::Migration
  def change
    create_table :calibrations do |t|
      t.string :name
      t.belongs_to :user, index: true, foreign_key: true
      t.float :x
      t.float :y
      t.float :width
      t.float :height

      t.timestamps null: false
    end
    add_index :calibrations, [:name, :user_id], unique: true
  end
end
