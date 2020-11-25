Vue.component('fancy-chronometer', {
  data: function() {
    return{
        dades: [],
    }
  },
  methods: {
    clickButton: function(){

      var starCountRef = firebase.database().ref('/').once('value', (snapshot) => {
        var dadesNoves = []
        for (valor in snapshot.val()){ //ens retorna la BD tota de una en un JSON i el recorrem
            dadesNoves.push(snapshot.val()[valor])
        }
        if(this.dades !== dadesNoves){
          this.dades = dadesNoves;
        }
      });

    }
  },
  template: `<div style="display:inline-block;padding:10px;border:solid">
  <ul>
    <li v-for="item in dades"> {{item}} </li>
  </ul>
  <button v-on:click="clickButton()"> Mostrar dades </button>
  </div>`,
});

var vm = new Vue({
  el: '#app',
  template: `<div>
  <fancy-chronometer></fancy-chronometer>
  </div>`,
});
