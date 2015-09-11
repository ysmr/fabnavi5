if @calibration.errors.any?
  json.errors @calibration.errors
else
  json.partial! 'v1/calibrations/calibration', calibration: @calibration
end
