import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin'
import signup from '@/components/signup'
import HomePage from '@/components/HomePage'
import keysFinder from '@/components/keysFinder'
import venueEvents from '@/components/venueEvents'
import eventDetails from '@/components/VenueEventsComponents/eventDetails'
import bookVenue from '@/components/bookVenue'
import venueCalendar from '@/components/venueCalendar'
import meetWithDCS from '@/components/meetWithDCS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signin',
      component:signin
    },
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomePage
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
      props: true
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
    }
  ],

})
