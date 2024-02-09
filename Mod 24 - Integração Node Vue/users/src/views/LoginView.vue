<template>
    <div>
        <h2>Login</h2>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        <p>{{ error }}</p>
                    </div>
                </div>
                <p>Email</p>
                <input type="email" placeholder="Email@exemplo.com" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <button class="button is-primary" id="button" @click="login">Entrar</button>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return {
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        login(){
            axios.post("http://localhost:8686/login", {
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res)
                localStorage.setItem('token',res.data.token)
                this.$router.push({name: 'home'})
            }).catch(err => {
                var msgErro = err.response.data.err
                this.error = msgErro
            })
        }
    }  
}
</script>

<style scoped>
    .button {
        margin-top: 1.5%;
    }
</style>