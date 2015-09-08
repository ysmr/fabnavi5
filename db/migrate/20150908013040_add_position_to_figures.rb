class AddPositionToFigures < ActiveRecord::Migration
  def change
    add_column :figures, :position, :integer
  end
end
