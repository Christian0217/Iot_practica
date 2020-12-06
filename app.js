Vue.component('fancy-chronometer', {
  data: function() {
    return{
        mesTemp: [],
        valsTemp: [],
        text: "Mostrar gràfica",
        count: 0,
    }
  },
  methods: {
    clickButton: function(){ //Cerquem a la BD les dades
      if(this.count === 0){
        this.text = "Actualitzar dades"
        this.count++
        this.$emit('input', "5px solid #f4511e");
      }
      var starCountRef = firebase.database().ref('/').once('value', (snapshot) => { //funció asíncrona, molt compte!
        var valsTempNoves = []
        var mesTempNous = []
        for (valor in snapshot.val()){ //ens retorna la BD tota de una en un JSON i el recorrem
            valsTempNoves.push(snapshot.val()[valor])
            mesTempNous.push(valor)
        }
        if(this.valsTemp !== valsTempNoves){
          this.valsTemp = valsTempNoves;
          this.mesTemp = mesTempNous;
          var ctx = document.getElementById('myChart').getContext('2d');
          var chart = new Chart(ctx, { //generem la gràfica amb chartjs
              type: 'line',
              data: {
                  labels: this.mesTemp,
                  datasets: [{
                      label: 'Temperatura mitjana',
                      backgroundColor: '#f4511e',
                      borderColor: '#FDB813',
                      data: this.valsTemp,
                      fill: false,
                  } //Si afegissim aqui un altre dataset, tindriem una gràfica més
              ]},
              options: { //Configuracions de la gràfica
                scales: {
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Mes'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Temperatura'
                    }
                  }]
                }
              }
          });
        }
      });
    }
  },
  template: `<div>
  <button class="button" v-on:click="clickButton()"> <span> {{text}} </span> </button>
  </div>`,
});

var vm = new Vue({
  el: '#app',
  data: {
    estil: "",
  },
  template: `<div>
  <fancy-chronometer v-on:input="estil=$event"></fancy-chronometer>
  <div class="hola"><div class="proveta" v-bind:style="'border:' + estil"><canvas id="myChart"></canvas></div></div>
  </div>`,
});
