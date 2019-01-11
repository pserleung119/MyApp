export default class Currency {
    getRate() {
        return new Promise(function(resolve, reject) {
            const baseCurrency = 'JPY';
            const targetCurrency = 'USD';
            const baseUrl = 'http://free.currencyconverterapi.com/api/v5/convert?q=' + baseCurrency + '_' + targetCurrency +'&compact=y';
            $.ajax({
                url: baseUrl,
                type: 'GET',
                dataType: 'json',
                timeout: 5000,
              })
              .done(function(data) {
                  resolve(data);
              })
              .fail(function() {
                  reject('Error!');
              });
        })

    }
}