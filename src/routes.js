import Home from './components/home.vue' 
import IndividualListing from './components/IndividualListing.vue' 
import IndividualListed from './components/IndividualListed.vue' 
import Login from './components/login.vue'
import SignUp from './components/signUp.vue'

export default[
    { path: '/', component: Home},
    { path: '/listing', component: IndividualListing},
    { path: '/listed', component: IndividualListed},
    { path : '/login', component: Login},
    { path: '/signup', component: SignUp}
]

