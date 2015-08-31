class V1::BaseAPI < Grape::API
  AUTH_HEADERS = {
    "Client" => {
      required: true
    },
    "Access-Token" => {
      required: true
    },
    "Uid" => {
      required: true
    }
  }
end
