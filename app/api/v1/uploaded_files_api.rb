class V1::UploadedFilesAPI < V1::BaseAPI
  resource :uploaded_files do
    params do
      requires :uploaded_file, type: Hash do
        requires :file, type: Rack::Multipart::UploadedFile
      end
    end

    post do
      authenticate_user!
      proj = UploadedFile.create file: params[:uploaded_file][:file]
      proj.to_json
    end
  end
end
