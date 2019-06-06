// Andamento delle vendite totali della nostra azienda con un grafico
// di tipo Line con un unico dataset che conterrà il numero di vendite
// totali mese per mese nel 2017.

// Il secondo grafico è quello a torta che evidenzierà il contributo di
// ogni venditore per l’anno 2017. Il valore dovrà essere lapercentuale
// di vendite effettuate da quel venditore
// (fatturato_del venditore /fatturato_totale)


$(document).ready(function(){

  var url_base = 'http://157.230.17.132:4017/sales';



  stampaGrafici(url_base);
  function stampaGrafici(url_base){
    // oggetto contenente i mesi del primo grafico
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

    // array per il secondo grafico
      var labels = [];
      var array = [];
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

    // manipolazione dati per il secondo grafico
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
    // ciclo l'array labels per popolare la selection dei venditori
          for (var i = 0; i < labels.length; i++) {
            $('.sel_venditori').append('<option>'+labels[i]+'</option>')
          }
    // ciclo le chiavi dell'array mesi per popolare la selection dei mesi
          for (var i = 0; i < Object.keys(mesi).length; i++) {
            $('.sel_mesi_anno').append('<option>'+Object.keys(mesi)[i]+'</option>')
          }
          
          create_graph(Object.keys(mesi), Object.values(mesi));
          create_pie(labels, array);
        },
        'error':function(){
          alert(errore);
        }
      })
  }


// funzione che mi disegna il primo grafico
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
      }
  });
  }

// funzione che mi disegna il secondo grafico
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
      }
    });
  };
  // chiamata ajax per inserimento nuove vendite
  $('#but_inserimento').click(function(){

    var venditore_selezionato = $('.sel_venditori').val();
    var mese_selezionato = $('.sel_mesi_anno').val();
    var importo_inserito = $('#input_inserimento').val();
    var mese_moment = '01/'+moment(mese_selezionato, 'M').format('MM')+'/2017';

    $.ajax({
      'url':url_base,
      'method':'POST',
      'data': JSON.stringify({
        'salesman':venditore_selezionato,
        'date': mese_moment,
        'amount':parseInt(importo_inserito)
      }),
      'contentType':'application/json',
      'success':function(data){
        stampaGrafici(url_base);

            $('.sel_venditori').val('');
            $('.sel_mesi_anno').val('');
            $('#input_inserimento').val('');

      },
      'error':function(){
        alert(errore);
      }
    })
  })


});
