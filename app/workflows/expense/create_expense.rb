class Expense::CreateExpenseWorkflow
    attr_accessor :user, :expense_name, :expense_price, :expense_date, :expense_category_id, :success

    def initialize(user_id:, expense_name:, expense_price:, expense_date:, expense_category_id:)
        @user = User.find(user_id)
        @expense_name = expense_name
        @expense_price = expense_price
        @expense_date = expense_date
        @expense_category_id = expense_category_id
        @success = false
    end

    def run
        create_expense
    end

    private
    def create_expense
        Expense.transaction do
            user.expenses.create!(
                user_id: user.id
                name: expense_name,
                price: expense_price,
                spent_date: expense_date,
                expensecateory_id: expense_category_id
            )
            self.success = true
        end
    end
end