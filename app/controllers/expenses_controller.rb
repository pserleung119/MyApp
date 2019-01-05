class ExpensesController < ApplicationController
  before_action :authenticate_user!
  before_action :create_params, only: %i[create]

  def index
  end

  def create
    Expense.transaction do
      current_user.expenses.create!(
        name: params[:name],
        price: params[:price],
        spent_date: params[:spent_date],
        expensecategory_id: params[:expensecategory_id]
      )
    end
    flash[:notice] = Settings.expenses.add_successfully
    redirect_to root_path
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def create_params
    params.permit(:name, :price, :spent_date, :expensecategory_id)
  end
end
