import Login from './login.vue'
import SignUp from './signUp.vue'
import Home from './home.vue'


export default [
  { path: '/login', name: 'Login', component: Login},
  { path: '/', name: 'SignUp', component: SignUp},
  { path: '/home', name: 'Home', component: Home},

]
