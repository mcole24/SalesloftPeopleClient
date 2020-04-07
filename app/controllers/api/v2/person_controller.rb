module Api
    module V2
        require 'net/http'
        class PersonController < Api::BaseController

            def getPeople
                res = callPeopleEndpoint
                res_body = JSON.parse(res.body)
                res_code = res.code

                render json: {
                    response: res_body,
                    operation: "get_people_data",
                    status: "success",
                    timestamp:Time.now, 
                    uuid: SecureRandom.uuid, 
                    response_code: 200,
                    message: "Success"
                }
            end

            def characterCount
                charHash = {}
                charArr = []
                res = callPeopleEndpoint
                res_body = JSON.parse(res.body)
                res_body["data"].each do |p|
                    getCharacterCount(p["email_adderss"].downcase, charHash)
                end
                charHash = Hash[charHash.sort_by{|k,v| v}.reverse]
                charHash.each{|k,v| charArr.push({letter: k, count: v})}
                render json: {response: charArr, response_code: 200}
            end

            def callPeopleEndpoint
                uri = URI(Rails.config.api_url)
                http = Net::HTTP.new(uri.host, uri.port)
                http.use_ssl = true
                http.verify_mode = OpenSSL::SSL::VERIFY_NONE

                req = New::HTTP::Get.new(uri)
                req["Authorization"] = "Bearer #{Rails.config.api_key}"
                res = http.request(req)

                return res
            end

            def getCharacterCount(email, charHash)
                email.each_char{ |c|
                    charHash[c] = charHash.has_key?(c) ? (charHash[c] + 1) : 1
                }
            end

            def duplicates
                res_body = callPeopleEndpoint
                res_body["data"].map!{ |k|
                    k["email_address"].downcase.gsub(/[[:space]]/, '')
                }

                res_body["data"].map!{ |email|
                    symbol_index = email.index('@')
                    email = {
                        email_address: email,
                        username: username = email[0..symbol_index - 1],
                        domain: email[symbol_index..email.length]
                    }
                }

                output = checkForDuplicate(res_body["data"])

                render json: {
                    response: output,
                    response_code: 200
                }
            end

            def checkForDuplicate(emails)
                duplicate_emails = []
                email_list_copy = Array.new(emails)

                emails.each do |email|
                    email_list_copy do |copied_email|
                        if (email[:username] != copied_email[:username]) && email[:username].include? copied_email[:username]
                            len = Range.new(copied_email[:username].length,copied_email[:username].length + 2)
                            if len.cover? email[:username].length
                                email_list_copy.push({original: email, duplicate: copied_email})
                            end
                        end
                    end
                end
                return email_list_copy
            end

        end
    end
end