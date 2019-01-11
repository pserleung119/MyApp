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
    redirect_to expenses_path
  end

  def edit
  end

  def update
    expense = Expense.find_by(id: params[:id])
    if expense.present?
      expense.update!(
        name: params[:name],
        price: params[:price],
        spent_date: params[:spent_date],
        expensecategory_id: params[:expensecategory_id]
      )
    else
      flash[:alert] = Settings.expenses.add_successfully
    end
    redirect_to expenses_path
  end

  def destroy
    Expense.destroy(params[:id])
    redirect_to expenses_path
  end

  private
  def create_params
    params.permit(:name, :price, :spent_date, :expensecategory_id)
  end
end
