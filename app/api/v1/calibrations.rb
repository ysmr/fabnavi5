class V1::Calibrations < V1::Base
 include Grape::Kaminari
  helpers do
    def calibration_params
      ActionController::Parameters.new(params)
        .require(:calibration).permit *(Calibration.acceptable_attributes)
    end
  end

  resource :calibrations do
    paginate per_page: 20

    desc 'Get all calibrations'
    get jbuilder: 'v1/calibrations/index' do
      @calibrations = paginate Calibration.order(id: :desc)
    end

    desc 'Create a calibration', {headers: AUTH_HEADERS}
    params do
      requires :calibration, type: Hash do
        requires :name, type: String
        requires :x, type: Float
        requires :y, type: Float
        requires :width, type: Float
        requires :height, type: Float
      end
    end
    post jbuilder: 'v1/calibrations/create' do
      authenticate_user!
      @calibration = current_user.calibrations.build calibration_params
      if @calibration.save
        status 201
      else
        status 400
      end
    end

    resource ':id' do
      desc 'Update a calibration', {headers: AUTH_HEADERS}
      params do
        requires :calibration, type: Hash do
          optional :name, type: String
          optional :x, type: Float
          optional :y, type: Float
          optional :width, type: Float
          optional :height, type: Float
        end
      end
      patch jbuilder: 'v1/calibrations/update' do
        authenticate_user!
        @calibration = current_user.calibrations.find(params[:id])
        if @calibration.update calibration_params
          status 200
        else
          status 400
        end
      end

      desc 'Delete a calibration', {headers: AUTH_HEADERS}
      delete do
        authenticate_user!
        calibration = current_user.calibrations.find(params[:id])
        calibration.destroy
        body false
      end
    end
  end
end
