import Home from './components/home.vue' 
import IndividualListing from './components/IndividualListing.vue' 
import IndividualListed from './components/IndividualListed.vue' 
export default[
    { path: '/', component: Home},
    { path: '/listing', component: IndividualListing},
    { path: '/listed', component: IndividualListed} ]

