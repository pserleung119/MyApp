class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :expenses

  def expenses_this_month
    expenses.where(spent_date: Time.current.beginning_of_month..Time.current.end_of_month)
  end

  def total_expenses_this_month
    total = 0
    expenses_this_month.each do |expense|
      total = total + expense.price
    end
    total
  end

  def average_daily_budget_for_remaining_days
    remaining_days = (Time.current.end_of_month - Time.current) / (24 * 60 * 60).floor
    return ((Settings.expenses.budget - total_expenses_this_month) / remaining_days).floor
  end
end
