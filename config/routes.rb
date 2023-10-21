Rails.application.routes.draw do
  resources :orders
  resources :sessions, only: :create
  resources :registrations, only: :create
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  get 'cart', to: 'cart#show'
  post 'cart/add'
  post 'cart/remove'
  resources :items
  devise_for :users, controllers: { registrations: 'users/registrations' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "item#index"
  root "static#home"

  get "about", to: "welcome#about"
end
