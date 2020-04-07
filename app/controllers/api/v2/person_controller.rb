module Api
    module V2
        require 'httparty'
        class PersonController < Api::BaseController

            include HTTParty

            def getPeople
                puts Rails.config.api_key
                res = callPeopleEndpoint
                res_body = JSON.parse(res.body)
                res_code = res.code

                render json: {
                    response: res_body,
                    response_code: 200
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
                url = Rails.config.api_url
                res = HTTParty.get(url, :headers =>{
                        'Content-Type' => 'application/json',
                        'Authorization' => "Bearer #{Rails.config.api_key}"
                    } 
                ))              
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