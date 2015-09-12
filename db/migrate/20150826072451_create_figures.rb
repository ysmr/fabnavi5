class CreateFigures < ActiveRecord::Migration
  def change
    create_table :figures do |t|
      t.string :type
      t.belongs_to :content, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
