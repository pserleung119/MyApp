import Currency from './currency';

window.addEventListener("load", () => {
    $('#new-expense-btn').on('click', () => {
        $('#greeting-msg, #convert-rate-field, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeOut('fast', () => {
            $('#add-expense-form').fadeIn();
        });
    })

    $('.edit-expense').on('click', (event) => {
        const expenseId = $(event.currentTarget).attr('target');
        const rowIndex = $(event.currentTarget).attr('row');
        $('#greeting-msg, #convert-rate-field, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeOut('fast', function() {
            $('#edit-expense-form').fadeIn().attr({
                'action' : '/expenses/' + expenseId,
            });
            const editForm = $('#edit-expense-form');
            const row = $('#expenses-table').find('tr')[rowIndex];
            const targetTd = $(row).find('td');
            $(editForm).find('input[name="name"]').val($(targetTd[2]).text().trim());
            $(editForm).find('input[name="spent_date"]').val($(targetTd[1]).text().trim());
            $(editForm).find('input[name="price"]').val($(targetTd[3]).text().match(/\d+/)[0]);
            $(editForm).find('#expensecategory_id option[value="' + $(targetTd[4]).find('input').val().toString() + '"]').prop('selected', true);
        });
    })

    $('.back-to-expense-index-btn').on('click', () => {
        $('#add-expense-form, #edit-expense-form').fadeOut('fast', () => {
            backToExpensesTable();
        })
    })

    $('#save-budget-btn').on('click', (event) => {
        event.preventDefault();
        if (window.confirm('Changing your budget to ¥' + $('#budget-input').val())) {
            $('#edit_user').submit();
        } else {
            return;
        }
    })

    $('#convert-rate').on('click', () => {
        // Do nothing if already converted to USD
        if ($('.total-cost').text().match(/^\$/)) {
            return;
        }
        const currency = new Currency;
        const roundDigit = 2;
        currency.getRate().then((data) => {
            const rate = data.JPY_USD.val;
            let convertedTotalCost = 0;
            for (let i = 0; i < $('.cost').length; i++) {
                let baseCost = $($('.cost')[i]).attr('jpy');
                let convertedCost = baseCost * rate;
                convertedTotalCost = convertedTotalCost + convertedCost;
                $($('.cost')[i]).text(`$${convertedCost.toFixed(roundDigit)}`);
            }
            $('.total-cost').text(`$${convertedTotalCost.toFixed(roundDigit)}`);
            $('.diff-cost').hide();
        }).catch((e) => {
            return;
        });
    })

    let backToExpensesTable = () => {
        $('#greeting-msg, #convert-rate-field, #budget-setting, #expenses-table, #expenses-summary, #new-expense-btn').fadeIn('fast');
    }

    let setExpenseInJPY = () => {
        const diffCost = parseInt($('.diff-cost').attr('jpy')) < 0 ? `(- ¥${$('.diff-cost').attr('jpy')})` : `(+ ¥${$('.diff-cost').attr('jpy')})`
        $('.cost').each((i, elem) => {
            $(elem).text(`¥${$(elem).attr('jpy')}`);
        })
        $('.total-cost').text(`¥${$('.total-cost').attr('jpy')}`);
        $('.diff-cost').text(diffCost).show();
    }

    let init = () => {
        setExpenseInJPY();
    }
    init();
},false)
