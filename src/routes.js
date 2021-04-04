
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
import RentalRequest from './components/rentalRequest.vue' 

export default[
    { path: '/', component: Home},
    { path: '/listing', component: IndividualListing, name : 'IndividualListing', props: true},
    { path: '/listed', component: IndividualListed, name : 'IndividualListed', props: true},
    { path : '/login', component: Login},
    { path: '/signup', component: SignUp},
    { path : '/CarListing', component:CarListing, name: 'CarListing' },
    { path : '/reviewForm', name: 'reviewForm', component:reviewForm, props: true },
    { path: '/updateProfile', component: UpdateProfile},
    { path: '/profilePage', component: ProfilePage},
    { path: '/chat', component: ChatPage},
    { path : '/MyRentals', name: 'MyRentals', component : MyRentals, props: true},
    { path: '/rentalRequest', name: 'rentalRequest', component : RentalRequest, props: true},
]


