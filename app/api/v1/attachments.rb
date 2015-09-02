class V1::Attachments < V1::Base
  resource :attachments do
    desc 'Upload a file', {headers: AUTH_HEADERS}
    params do
      requires :attachment, type: Hash do
        requires :file, type: Rack::Multipart::UploadedFile
      end
    end
    post jbuilder: 'v1/attachments/create' do
      authenticate_user!
      @attachment = current_user.attachments
        .create_with_type params[:attachment][:file]
    end
  end
end
