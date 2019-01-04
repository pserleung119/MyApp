Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    passwords: 'users/passwords',
  }
  resources :expenses

  authenticated :user do
    root :to => 'expenses#index'
  end
  devise_scope :user do
    root to: "devise/sessions#new"
  end

end
