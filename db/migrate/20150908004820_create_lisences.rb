class CreateLisences < ActiveRecord::Migration
  def change
    create_table :lisences do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
