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
}); 
