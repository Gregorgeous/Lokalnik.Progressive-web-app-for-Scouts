import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import {store} from './../store/store' 
import signin from '@/components/signin'
import signup from '@/components/signup'
import HomePage from '@/components/HomePage'
import keysFinder from '@/components/keysFinder'
import venueEvents from '@/components/venueEvents'
import eventDetails from '@/components/VenueEventsComponents/eventDetails'
import editEvent from '@/components/VenueEventsComponents/editEvent'
import bookVenue from '@/components/bookVenue'
import venueCalendar from '@/components/venueCalendar'
import meetWithDCS from '@/components/meetWithDCS'
import userProfile from '@/components/userProfile'

Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/signin',
    // },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        initialAuthCheckup: true
      }
    },
    {
      path: '/user-profile',
      name: 'userProfile',
      component: userProfile
    },
    {
      path: '/signin',
      name: 'signin',
      component:signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/keysfinder',
      name: 'keysFinder',
      component: keysFinder
    },
    {
      path: '/venueevents',
      name: 'venueEvents',
      component: venueEvents
    },
    {
      path: '/venueevents/:event_id',
      name: 'eventDetails',
      component: eventDetails,
    },
    {
      path: '/venueevents/:editedEvent_id',
      name: 'editEvent',
      component: editEvent
    },
    {
      path: '/bookvenue',
      name: 'bookVenue',
      component: bookVenue
    },
    {
      path: '/venuecalendar',
      name: 'venueCalendar',
      component: venueCalendar
    },
    {
      path: '/meetwithdcs',
      name: 'meetWithDCS',
      component: meetWithDCS
    },
    // TODO: delete catch-all route after implementing PWA! 
    {
      path: '*',
      name: 'catchall',
      component: signin
    }
  ],

})

router.beforeEach((to, from, next) => {
  console.log("jestem w beforeEach");
  let currentUser = firebase.auth().currentUser;
  console.log(`currentUser = ${currentUser}`);
  let guestUser = store.state.isUserAGuest;
  console.log(`guestUser = ${guestUser}`);  
  let initialAuthCheckup = to.matched.some(record => record.meta.initialAuthCheckup);
  // if ( true ) next()
  // else next('signin')
  if (initialAuthCheckup && !currentUser && !guestUser) next('signin')
  else next()
  // if ((initialAuthCheckup && !currentUser) || (initialAuthCheckup && !guestUser) ) next('login')
  // else next()
})

export default router