<template>
  <div id="app">

    <div class="buttons">
      <button class="button is-primary">Primay</button>
      <button class="button in-link">Link</button>
    </div>
    
    <h3>Cadastro: </h3>
    <small id="Erro" v-show="nomeErr">[ERRO] Nome inválido.<br></small>
    <input type="text" placeholder="nome" v-model="nomeField"><br>
    <small id="Erro" v-show="emailErr">[ERRO] E-Mail inválido. <br></small>
    <input type="email" placeholder="email" v-model="emailField"><br>    
    <small id="Erro" v-show="idadeErr">[ERRO] Idade inválida. <br></small>
    <input type="number" placeholder="idade" v-model="idadeField"><br>
    <button @click="cadastrarUsuario">Cadastrar</button>
    <small id="Sucesso" v-show="ok"><br>Cadastro realizado com sucesso!<br></small>
   
    <div v-for="(cliente, index) in orderClient" :key="cliente.id">
      <h4> {{ index + 1}}</h4>
      <ClientComponent :cliente="cliente" @deleteMe="deletarUsuario($event)"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import ClientComponent from './components/ClientComponent'

export default {
  name: 'App',
  data() {
    return {
      nomeErr: false,
      emailErr: false,
      idadeErr: false,
      ok: false,
      nomeField: "",
      emailField: "",
      idadeField: 0,

      nomeDoVictor: "Victor O. Lima",
      clienteVictor: {
        nome: "Victor Lima",
        email: "victor@gmail.com",
        idade: 30
      },
      clientes: [
        {
          id: 1,
          nome: "Victor Lima",
          email: "victor@gmail.com",
          idade: 30
        },
        {
          id: 2,
          nome: "Lucas Lima",
          email: "lucas@gmail.com",
          idade: 23
        },
        {
          id: 3,
          nome: "Victor Silva",
          email: "silva@gmail.com",
          idade: 34
        },
        {
          id: 4,
          nome: "Manoel Gomes",
          email: "Manoel@gmail.com",
          idade: 44
        }

      ]
    }
  },
  components: {
    ClientComponent
  },
  methods: {
    cadastrarUsuario: function(){
      if(this.nomeField == "" || this.nomeField == " " || this.nomeField.length < 3){
          this.nomeErr = true
        } else {
          this.nomeErr = false
        }

      if(this.idadeFiel == "" || this.idadeField.length > 3 || this.idadeField == 0){
          this.idadeErr = true
      }else {
        this.idadeErr = false
      }

      if (this.emailField == "" || this.emailField == " " || this.emailField == Number || this.emailField.length < 8){
        this.emailErr = true
      }else {
        this.emailErr = false
      }

      if (this.nomeErr == false && this.idadeErr == false && this.emailErr == false){
        this.clientes.push({nome: this.nomeField, email: this.emailField, idade: this.idadeField, id: Date.now()})
        this.nomeField = ""
        this.emailField = ""
        this.idadeField = ""
        this.ok = true
      }
    },
    deletarUsuario: function($event){
      console.log("recebendo evento")
      var id = $event.idDoCliente
      var novoArray = this.clientes.filter(cliente => cliente.id != id)
      this.clientes = novoArray
    }
  },
  computed: {
    orderClient: function(){
      return _.orderBy(this.clientes,['nome'],['asc'])
    }
  }
}


</script>

<style>
  #Erro {
    color: red;
  }
  #Sucesso {
    color: rgb(255, 255, 255);
    background-color: black;
    border-radius: 4px;
    font-size: 1.2em;
  }
</style>
