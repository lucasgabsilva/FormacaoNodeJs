<template>
  <div id="app">  
    <div class="column is-half is-offset-one-quarter"> 
      <img src="./assets/guia.png" alt="">
      <hr>
      <h4 class="is-size-4">Pokedex</h4>
      <input type="text" placeholder="Buscar pokemons" v-model="busca" class="input is-rounded">
      <button id="busca" class="button is-primary is-fullwidth" @click="buscar">Buscar</button>
      <div v-for="(poke,index) in filteredPokemons" :key="poke.url">
        <PokeComponent :name="poke.name" :url="poke.url" :num="index + 1"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PokeComponent from './components/PokeComponent'
export default {
  name: 'App',

  data(){
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: ''
    }
  },
  created: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").then(res => {
      console.log("Lista de pokemons recebida com sucesso.")
      this.pokemons = res.data.results
      this.filteredPokemons = res.data.results
    })
  },
  components: {
    PokeComponent
  },
  methods: {
    buscar: function(){
      this.filteredPokemons = this.pokemons
      if(this.busca == '' || this.busca == ' ' || this.busca == Number){
        this.filteredPokemons = this.pokemons
      }else{
       this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca)
      }
    }
  }
  /*
  computed: {
    resultadoBusca: function(){
      if(this.busca == '' || this.busca == ' ' || this.busca == Number){
        return this.pokemons
      }else{
        return this.pokemons.filter(pokemon => pokemon.name == this.busca)
      }
    }
  }
  */
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#busca{
  margin-top: 2%;
}
</style>
