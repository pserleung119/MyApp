window.addEventListener("load", function() {
    $('#new-expense-btn').on('click', function() {
        $('#greeting-msg, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeOut('fast', function() {
            $('#add-expense-form').fadeIn().attr({
                'method' : 'post',
                'action' : '/expenses'
            });
            $('#add-expense-form').find('input[type="submit"]').val('Add expense');
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
            $('#add-expense-form').fadeIn().attr({
                'method' : 'patch',
                'action' : '/expenses/?id=' + expenseId
            });
            $('#add-expense-form').find('input[type="submit"]').val('Edit expense');
            const row = $('#expenses-table').find('tr')[rowIndex];
            $('input[name="name"]').val($($(row).find('td')[2]).text().trim());
            $('input[name="spent_date"]').val($($(row).find('td')[1]).text().trim());
            $('input[name="price"]').val($($(row).find('td')[3]).text().match(/\d+/)[0]);
            $('#expensecategory_id option[value="' + $($(row).find('td')[4]).find('input').val().toString() + '"]').prop('selected', true);
        });
    })
},false)
