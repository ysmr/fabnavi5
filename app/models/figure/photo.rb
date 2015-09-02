class Figure::Photo < Figure
  private
  def validate_parent_model
    if content.type != Content::PhotoList.name
      errors.add :base, "Figure::Photo is not allowed to be a child of #{content.type}."
    end
  end
end
