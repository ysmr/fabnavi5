class Figure::Frame < Figure
  private
  def validate_parent_model
    if content.type != Content::Movie.name
      errors.add :base, "Figure::Frame is not allowed to be a child of #{content.type}."
    end
  end
end
