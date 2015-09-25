class AddFigureToProjects < ActiveRecord::Migration
  def change
    add_reference :projects, :figure, index: true, foreign_key: true
  end
end
