module Api
    module V2
        require 'net/http'
        class PersonController < Api::BaseController
            def index
                render json: {person1: "Test Person"}
            end

            def getPeople
                uri = URI(Rails.config.api_url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.use_ssl = true
                http.verify_mode = OpenSSL::SSL::VERIFY_NONE

                req = New::HTTP::Get.new(uri)
                req["Authorization"] = "Bearer #{Rails.config.api_key}"
                res = http.request(req)
                res_body = JSON.parse(res.body)
                res_code = res.code

                render json: {response: res_body, response_code: res_code}
            end
        end
    end
end