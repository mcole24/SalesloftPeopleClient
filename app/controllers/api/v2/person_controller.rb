module Api
    module V2
        class PersonController < ApplicationController
            def index
                render json: {person1: "Test Person"}
            end
        end
    end
end