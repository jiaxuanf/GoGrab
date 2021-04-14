
import CarListing from './components/CarListing.vue'
import Home from './components/home.vue' 
import IndividualListing from './components/IndividualListing.vue' 
import IndividualListed from './components/IndividualListed.vue' 
import Login from './components/login.vue'
import SignUp from './components/signUp.vue'
import reviewForm from './components/reviewForm.vue'
import UpdateProfile from './components/updateProfile.vue'
import ProfilePage from './components/profilePage.vue'
import ChatPage from './components/Chat.vue'
import MyRentals from './components/MyRentals.vue'
import reviewsPage from './components/reviewsPage.vue'
import Dashboard from './components/Dashboard.vue'
import RentalRequest from './components/rentalRequest.vue' 
import MyListings from './components/MyListings.vue' 
import Requests from './components/Requests.vue' 


export default[
    { path: '/', component: Home, meta: {requiresAuth: true}},
    { path: '/listing', component: IndividualListing, name : 'IndividualListing', props:true, meta: {requiresAuth: true}},
    { path: '/listed', component: IndividualListed, name : 'IndividualListed', props:true, meta: {requiresAuth: true}},
    { path : '/login', component: Login, name :'Login'},
    { path: '/signup', component: SignUp},
    { path : '/CarListing', component:CarListing, name: 'CarListing' , props:true, meta: {requiresAuth: true}},
    { path : '/reviewForm', name: 'reviewForm', component:reviewForm, props: true, meta: {requiresAuth: true} },
    { path: '/updateProfile', component: UpdateProfile, name :'updateProfile', meta: {requiresAuth: true}},
    { path: '/profilePage', component: ProfilePage, meta: {requiresAuth: true}},
    { path: '/chat', component: ChatPage, meta: {requiresAuth: true}},
    { path : '/MyRentals', name: 'MyRentals', component : MyRentals, props: true, meta: {requiresAuth: true}},
    { path : '/reviewsPage', name: 'reviewsPage', component:reviewsPage, props: true, meta: {requiresAuth: true} },
    { path : '/dashboard', name: 'dashboard', component:Dashboard, props: true, meta: {requiresAuth: true} },
    { path: '/rentalRequest', name: 'rentalRequest', component : RentalRequest, props: true, meta:{requiresAuth: true}},
    { path: '/MyListings', name : 'MyListings', component : MyListings, meta : {requiresAuth : true}},
    { path: '/Requests', name : 'Requests', component : Requests, meta : {requiresAuth : true}},
    { path: '/Dashboard', component: Dashboard},
]


