<template>
   
   <div :class="{'cliente': !isPremium, 'cliente-premium': isPremium}">
      <h4>Nome: {{ cliente.nome }}</h4>
      <hr>
      <p>Email: {{ cliente.email }}</p>
      <hr>
      <p>{{ cliente.idade }}</p>
      <button @click="mudarCor($event)">Mudar cor.</button>
      <button @click="emitirEventoDelete">Deletar</button>
      <h4> Id especial: {{idEspecial}}</h4>
   </div>
</template>

<script>
export default {
   data() {
      return {
         isPremium: false
      }
   },
   props: {
      cliente: Object,
      showIdade: Boolean
   },
   methods: {
      mudarCor: function($event){
         console.log($event)
        this.isPremium = !this.isPremium
      },
      emitirEventoDelete: function(){
         console.log("Emitindo evento filho.")
         this.$emit("deleteMe",{idDoCliente: this.cliente.id ,curso: "Formação Node.js", emPromo: true, 
         component: this})
      }, 
      testar: function(){
         console.log("teste de validação")
         alert("Validação realizada som sucesso.")
      }
   },
   filters: {
      processarEmail: function(value){
         return value.toUpperCase()
      }
      },
      computed: {
         idEspecial: function(){
           return(this.cliente.email + this.cliente.nome + this.cliente.id).toUpperCase()
      }
   }
}
</script>

<style scoped>
   .cliente {
      background-color: #ECE5E3;
      color: rgb(0, 0, 0);
      width: 600px;
      height: 240px;
      padding: 1%;
      margin-top: 2%;
      box-shadow: 2px 2px 6px black;
      border-radius: 10px;
   }
   .cliente-premium {
      background-color: #000000;
      color: yellow;
      width: 600px;
      height: 240px;
      padding: 1%;
      margin-top: 2%;
      box-shadow: 2px 4px 6px black;
   }
</style>
