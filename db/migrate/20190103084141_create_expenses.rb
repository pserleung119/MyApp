class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.references :user
      t.string :name
      t.integer :price
      t.date :spent_date
      t.references :expensecategory

      t.timestamps
    end
  end
end
