// Andamento delle vendite totali della nostra azienda con un grafico
// di tipo Line con un unico dataset che conterrà il numero di vendite
// totali mese per mese nel 2017.

// Il secondo grafico è quello a torta che evidenzierà il contributo di
// ogni venditore per l’anno 2017. Il valore dovrà essere lapercentuale
// di vendite effettuate da quel venditore
// (fatturato_del venditore /fatturato_totale)


$(document).ready(function(){
  var url_base = 'http://157.230.17.132:4017/sales';
  // var chiavi=[];
  // var valori=[];
// creo oggetto con all'inteno i mesi a 0 per poi dagli
// la somma dei ricavi per ogni mese
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
// chiamata ajax per i ricavi mensili
  $.ajax({
    'url':url_base,
    'method':'GET',
    'success':function(data){

      for (var i = 0; i < data.length; i++) {
// creo una variabile nella quale do il formato delle date utilizzando
// monet e pendo solo i mesi delle varie date
        var mese = moment(data[i].date, 'DD/MM/YYYY').format('M');
// ciclo for in con il quale sommo e assegno i profitti ai vari
// mesi dell'oggetto 'mesi'.
        for(prop_mese in mesi){
          if(prop_mese == mese){
            mesi[prop_mese] += data[i].amount;
          }
        }

      }
      // create_graph(chiavi, valori);
      // var keys_months = Object.keys(mesi);
      // var values = Object.values(mesi);
      // chiavi.push(keys_months);
      // valori.push(values);
// richiamo la funzione con le chiavi e i valori come argomento
      create_graph(Object.keys(mesi), Object.values(mesi));
    },
    'error':function(){
      alert(errore);
    }
  })
// funzione che mi disegna il grafico
  function create_graph(chiavi, valori){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels:chiavi,
          datasets: [{
              label: 'Vendite totali mensili',
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
  }
  var labels = [];
  var array = [];

  $.ajax({
    'url':url_base,
    'method':'GET',
    'success':function(data){




      for (var i = 0; i < data.length; i++) {
        var venditori = data[i].salesman;
        if(!labels.includes(venditori)){
          labels.push(venditori);
        }
        // var guadagni = data[i].amount;
      }
// ciclo sull'array dei 4 venditori
      for (var i = 0; i < labels.length; i++) {
// variabile d'appoggio che identifica il venditore ciclato nel momento
        var venditore_corrente = labels[i];
// variabile per andare a sommare i guadagni del venditore ciclato
        var somma_prof_sing_vend = 0;
// ciclo dell'array iniziale
       for (var j = 0; j < data.length; j++) {
         var data_corrente = data[j];
// per ogni vendita controllo de corrisponde al veditore corrente
// se si sommo
         if(data_corrente.salesman == venditore_corrente){
           somma_prof_sing_vend += data_corrente.amount;
         }
       }
// faccio il push delle somme profitti per ogni veditore
       array.push(somma_prof_sing_vend);

      }

      create_pie(labels, array);
    },
    'error':function(){
      alert(errore);
    }
  })

  function create_pie(labels, array){
    var secondoChart = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(secondoChart, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: array,
              backgroundColor: [
                  'red',
                  'yellow',
                  'blue',
                  'green'
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
  };


});
