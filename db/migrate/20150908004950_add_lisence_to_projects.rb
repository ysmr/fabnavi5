class AddLisenceToProjects < ActiveRecord::Migration
  def change
    add_reference :projects, :lisence, index: true, foreign_key: true
  end
end
