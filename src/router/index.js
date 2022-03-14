import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import TripEvents from "../views/TripEvents.vue";
import SavedTrips from "../views/SavedTrips.vue";
import SavedTripShow from "../views/SavedTripShow.vue";
import SavedTripChicago from "../views/SavedTripChicago.vue";
import FindPlaces from "../views/FindPlaces.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/findPlaces", name: "Find Places", component: FindPlaces },
  { path: "/trip_events", name: "Trip Events", component: TripEvents },
  { path: "/saved_trips", name: "Saved Trips", component: SavedTrips },
  { path: "/saved_trips/:id", name: "Saved Trips Show", component: SavedTripShow },
  { path: "/chicago", name: "Saved Trips Chicago", component: SavedTripChicago },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
