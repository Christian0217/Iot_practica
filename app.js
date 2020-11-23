Vue.component('secure-button', {
  data: function(){
    return{
      enabled: false,
    }
  }, //Quan executes $emit, abaix ho captura (en el v-on?)
  template: `<div style="display:inline-block;padding:10px;border:solid">
  <button v-on:click="$emit('click')" v-bind:disabled="! enabled"> Reset </button>
  <label><input type="checkbox" v-model="enabled"> Enable </label>
  </div>`
});


Vue.component('fancy-chronometer', { //genero un tag especial que podré utilitzar on sigui! Al segon paràmetre poso les opcions
  data: function() { //S'ha de crear com una funció que retorna un objecte
    return{
        time: 0,
        enabled: false,
    }
  },
  props: ['chronoLabel'], //coloquem les propietats que usarem. Fixa't que la propietat label està abaix posada al html (template). Les propietats (variables) seran reactives. Fixa't que label, només la mostrem al primer requadre posant <span v-if="label">. Si aixo no estigués, els dos punts (:) estarien als 3 quadrats del html
  methods: {
    clickButton: function(){
      this.enabled = false; //Fem que quan piqui a RESET, el enabled es desmarqui i que per tant el botó es desactivi
      this.time=0
    }
  },
  template: `<div style="display:inline-block;padding:10px;border:solid">
  <span v-if="chronoLabel"> {{chronoLabel}}: </span>
  {{time}}
  <button v-on:click="clickButton()" v-bind:disabled="! enabled"> Reset </button>
  <label><input type="checkbox" v-model="enabled"> Enable </label>
  </div>`,
  created: function(){
    setInterval(() => this.time++, 1000); //Podrem utilitzar el this per agafar el time de "data". La funció setInterval és pròpia de Vuejs
  }
});

//ANNOTACIONS SOBRE EL CODI "template":

//El chronoLabel és una propietat que es defineix aquí i que pintarem però s'inicialitza abaix al fer el objecte Vue!
//Fixa't que, adalt, chronoLabel està definida amb la "L" majúscula. Abaix, al html
//no entén de majúscules/minúscules i per substituir la majúscula, posem el guió "-".
// JS(chronoLabel) = HTML(chrono-label)

//El v-if es coloca per dir que el botó (Reset2) sols apareixerà quan el valor de litres sigui més gran que 0
//El v-on es posa per a que el html detecti que el que volem fer en aquella propietat és assignar algo a alguna vble o cridar una funció

var vm = new Vue({
  el: '#app',
  data: {
    label2: "Hola" //Lliguem una instància de Vue amb una prop del objecte (la prop de fancy-chronometer)! Amazing
  },
  template: `<div>
  <fancy-chronometer chrono-label="Crono 1"></fancy-chronometer>
  <fancy-chronometer v-bind:chrono-label="label2"></fancy-chronometer>
  <fancy-chronometer></fancy-chronometer>
  <secure-button></secure-button>
  </div>`,
}); //ELs paràmetres es coloquen aqui directament! veure adalt

//ANNOTACIONS SOBRE EL CODI DEL "template":
//El v-bind feia que les propietats que es posaven a un tag, s'agafessin com a variables.
//El "label2" està definit dins l'objecte Vue!
