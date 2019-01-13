class CreateSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :schedules do |t|
      t.references :user, foreign_key: true
      t.string :title
      t.text :content
      t.boolean :public

      t.timestamps
    end
  end
end
