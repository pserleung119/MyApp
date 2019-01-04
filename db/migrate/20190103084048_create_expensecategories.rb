class CreateExpensecategories < ActiveRecord::Migration[5.2]
  def change
    create_table :expensecategories do |t|
      t.string :name

      t.timestamps
    end
  end
end
