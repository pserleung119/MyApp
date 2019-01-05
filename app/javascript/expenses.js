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
},false)
