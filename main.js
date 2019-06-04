// Andamento delle vendite totali della nostra azienda con un grafico
// di tipo Line con un unico dataset che conterrà il numero di vendite
// totali mese per mese nel 2017.

// Il secondo grafico è quello a torta che evidenzierà il contributo di
// ogni venditore per l’anno 2017. Il valore dovrà essere lapercentuale
// di vendite effettuate da quel venditore
// (fatturato_del venditore /fatturato_totale)


$(document).ready(function(){
  var url_base = 'http://157.230.17.132:4017/sales';
  var chiavi=[];
  var valori=[];

  var mesi = {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0,
    11:0,
    12:0
  };

  $.ajax({
    'url':url_base,
    'method':'GET',
    'success':function(data){

      for (var i = 0; i < data.length; i++) {
        var mese = moment(data[i].date, 'DD/MM/YYYY').format('M');

        for(prop_mese in mesi){
          if(prop_mese == mese){
            mesi[prop_mese] += data[i].amount;
          }
        }
        var keys_months = Object.keys(mesi);
        var values = Object.values(mesi);
      }
      chiavi.push(keys_months);
      valori.push(values);
      console.log(chiavi);
      console.log(valori);
    },
    'error':function(){
      alert(errore);
    }
  })

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:chiavi,
        datasets: [{
            label: '# of Votes',
            data: valori,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

});
