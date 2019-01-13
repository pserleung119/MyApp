class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :expenses
  has_many :schedules

  def expenses_this_month
    expenses.where(spent_date: Time.current.beginning_of_month..Time.current.end_of_month).order(spent_date: "ASC")
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
    return ((budget - total_expenses_this_month) / remaining_days).floor
  end

  def average_daily_budget_difference
    average_daily_budget_for_remaining_days - original_average_daily_budget
  end

  private
  def original_average_daily_budget
    days_this_month = (Time.current.end_of_month - Time.current.beginning_of_month) / (24 * 60 * 60).floor
    return (budget / days_this_month).floor
  end
end
