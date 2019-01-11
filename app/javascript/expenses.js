window.addEventListener("load", function() {
    $('#new-expense-btn').on('click', function() {
        $('#greeting-msg, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeOut('fast', function() {
            $('#add-expense-form').fadeIn();
        });
    })

    $('#back-to-expense-index-btn').on('click', function() {
        $('#add-expense-form').fadeOut('fast', function() {
            $('#greeting-msg, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeIn('fast');
        })
    })

    $('#save-budget-btn').on('click', function(event) {
        event.preventDefault();
        if (window.confirm('Changing your budget to ' + $('#budget-input').val())) {
            $('#edit_user').submit();
        } else {
            return;
        }
    })

    $('.edit-expense').on('click', function() {
        const expenseId = $(this).attr('target');
        const rowIndex = $(this).attr('row');
        $('#greeting-msg, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeOut('fast', function() {
            $('#edit-expense-form').fadeIn().attr({
                'action' : '/expenses/' + expenseId,
            });
            const editForm = $('#edit-expense-form');
            const row = $('#expenses-table').find('tr')[rowIndex];
            const targetTd = $(row).find('td');
            $(editForm).find('input[name="name"]').val($(targetTd[2]).text().trim());
            $(editForm).find('input[name="spent_date"]').val($(targetTd[1]).text().trim())
            $(editForm).find('input[name="price"]').val($(targetTd[3]).text().match(/\d+/)[0]);
            $(editForm).find('#expensecategory_id option[value="' + $(targetTd[4]).find('input').val().toString() + '"]').prop('selected', true);
        });
    })
},false)
