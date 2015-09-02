class Figure::Frame < Figure
  private
  def validate_parent_model
    if content.type != Content::Movie.name
      errors.add :base, 'Invalid parent model. Only Content::Movie is allowed for Figure::Frame.'
    end
  end
end
