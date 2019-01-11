Rails.application.routes.draw do

  get 'home/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    passwords: 'users/passwords',
  }
  resources :expenses, only: [:index, :create, :update, :destroy]

  authenticated :user do
    root :to => 'home#index'
  end
  devise_scope :user do
    root to: "devise/sessions#new"
  end

end
