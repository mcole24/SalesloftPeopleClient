Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  namespace :api, defaults: { format: "json" } do
    get :me, to: 'me#me'
    namespace :v2 do
      get :person, to: 'person#index'
      get :people, to: 'person#getPeople'
      get :character_count, to: 'person#characterCount'
    end
  end

  root to: "main#index"
end
