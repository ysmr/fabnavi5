class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.string :movie
      t.belongs_to :project, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
