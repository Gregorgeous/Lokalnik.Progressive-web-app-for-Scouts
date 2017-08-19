import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import keysFinder from '@/components/keysFinder'
import venueEvents from '@/components/venueEvents'
import bookVenue from '@/components/bookVenue'
import venueCalendar from '@/components/venueCalendar'
import meetWithDCS from '@/components/meetWithDCS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
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
  mode: 'history'
})
