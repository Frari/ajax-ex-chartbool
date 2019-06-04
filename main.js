// Andamento delle vendite totali della nostra azienda con un grafico
// di tipo Line con un unico dataset che conterrà il numero di vendite
// totali mese per mese nel 2017.

// Il secondo grafico è quello a torta che evidenzierà il contributo di
// ogni venditore per l’anno 2017. Il valore dovrà essere lapercentuale
// di vendite effettuate da quel venditore
// (fatturato_del venditore /fatturato_totale)


$(document).ready(function(){
  var url_base = 'http://157.230.17.132:4017/sales';

  $.ajax({
    'url':url_base,
    'method':'GET',
    'success':function(data){

      var mesi = [01,02,03,04,05,06,07,08,09,10,11,12];

      for (var i = 0; i < data.length; i++) {
        var mese = moment(data[i].date).format('MM');
        console.log(mese);

        var guadagni = mesi[mese] += data.amount;
      }
      console.log(mese);
    },
    'error':function(){
      alert(errore);
    }
  })
});
