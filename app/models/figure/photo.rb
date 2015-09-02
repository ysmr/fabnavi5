class Figure::Photo < Figure
  private
  def validate_parent_model
    if content.type != Content::PhotoList.name
      errors.add :base, 'Invalid parent model. Only Content::PhotoList is allowed for Figure::Photo.'
    end
  end
end
