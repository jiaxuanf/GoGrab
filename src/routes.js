
import CarListing from './components/CarListing.vue'
import Home from './components/home.vue' 
import IndividualListing from './components/IndividualListing.vue' 
import IndividualListed from './components/IndividualListed.vue' 
import Login from './components/login.vue'
import SignUp from './components/signUp.vue'
import reviewForm from './components/reviewForm.vue'

export default[
    { path: '/', component: Home},
    { path: '/listing', component: IndividualListing},
    { path: '/listed', component: IndividualListed},
    { path : '/login', component: Login},
    { path: '/signup', component: SignUp},
    { path : '/CarListing', component:CarListing },
    { path : '/reviewForm', component:reviewForm },
]


