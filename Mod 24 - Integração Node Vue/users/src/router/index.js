import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue' 
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import axios from 'axios'
import EditView from "../views/EditView.vue"

function adminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://localhost:8686/validate",{},req).then(res=> {
    console.log(res)
    next()
    }).catch(err => {
      console.log(err.response)
      next("/login")
    })
    }else{
     next("/login")
    }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: UsersView,
    beforeEnter: adminAuth
  },
  {
    path: "/admin/users/edit/:id",
    name: 'UserEdit',
    component: EditView,
    beforeEnter: adminAuth
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
