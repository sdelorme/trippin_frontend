<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>Nearby Places</h1>
        <form id="nearbySearch" v-on:submit.prevent="nearbySearch()">
          <div class="row gtr-uniform">
            <div class="col-12 col-12-xsmall">
              <strong>Enter Address:</strong>
              <input
                type="text"
                name="address"
                id="address"
                v-model="address"
                placeholder="Ex. 800 W Main St New York, NY or Chicago, IL"
              />
            </div>
            <div class="col-12 col-12-xsmall">
              <strong>Enter Keyword:</strong>
              <input
                type="text"
                name="keyword"
                id="keyword"
                v-model="keyword"
                placeholder="What are you looking for? Ex. Brewery, Pizza, Beaches, Parks, Zoo, Night Club"
              />
            </div>
            <div class="col-12">
              <ul class="actions">
                <li><input form="nearbySearch" type="submit" class="primary" value="Search" /></li>
              </ul>
            </div>
          </div>
        </form>
        <div>
          <p>{{ search_message }}</p>
        </div>

        <section class="tiles">
          <article class="style7" v-for="(place, i) in nearby_places" :key="i" @click="showPlaceDetails(i)">
            <span class="image">
              <img
                v-bind:src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${place.photo_reference}&key=${api_key}`"
                alt="No Image Found"
              />
            </span>
            <a>
              <h2>{{ place.name }}</h2>
              <h5>Rating: {{ place.rating }}</h5>
              <div class="content">
                <ul class="alt">
                  <li>Number of Ratings: {{ place.user_ratings_total }}</li>
                  <li><h3>Click for more info</h3></li>
                </ul>
              </div>
            </a>
          </article>
        </section>

        <br />
        <ul class="actions">
          <li>
            <button
              v-if="search_status == true && next_page_token"
              v-on:click="nearbySearchNextPage()"
              class="button primary"
            >
              Next Page
            </button>
          </li>
          <li>
            <button v-if="need_previous_page == true" v-on:click="nearbySearch()" class="button primary">
              Previous Page
            </button>
          </li>
        </ul>
        <section id="place_details">
          <div id="wrapper">
            <div class="box" v-if="place_id.length > 0">
              <div class="inner">
                <div class="row gtr-uniform">
                  <div id="place_details" class="col-12">
                    <ul class="alt">
                      <div v-if="place.photos">
                        <span class="image main">
                          <img
                            v-bind:src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${photo_reference}&key=${api_key}`"
                          />
                        </span>
                      </div>
                      <div v-else>No photo</div>
                      <br />
                      <div v-if="place.website">
                        <li>
                          <h1>
                            <a v-bind:href="place.website" target="_blank" rel="noreferrer noopener">
                              {{ place.name }}
                            </a>
                          </h1>
                        </li>
                      </div>
                      <div v-else>{{ place.name }}</div>
                      <li>
                        <div v-if="place.phone_number">
                          {{ place.phone_number }}
                        </div>
                        <div v-else>No phone number listed</div>
                      </li>
                      <li>
                        <div v-if="place.address">
                          {{ place.address }}
                        </div>
                        <div v-else>No address listed</div>
                      </li>
                      <li>
                        <div v-if="place.hours">
                          <div v-for="item in place.hours" :key="item">
                            {{ item }}
                          </div>
                        </div>
                        <div v-else>No hours listed</div>
                      </li>
                      <li>
                        <div v-if="place.rating > 0">Rating: {{ place.rating }}</div>
                        <div v-else>No ratings listed</div>
                      </li>
                      <li>
                        <div v-if="place.user_ratings_total > 0">Total Ratings: {{ place.user_ratings_total }}</div>
                        <div v-else>No rating totals</div>
                      </li>
                      <li>
                        <div v-if="place.google_url">
                          <h5>
                            <a v-bind:href="place.google_url" target="_blank" rel="noreferrer noopener">
                              See More Information Here
                            </a>
                          </h5>
                        </div>
                      </li>
                    </ul>
                    <div v-if="isLoggedIn()" class="table-wrapper">
                      <!-- <table class="alt">
                        <thead>
                          <th>Choose Start Time</th>
                          <th>Choose End Time</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input type="datetime-local" id="start_time" name="start_time" v-model="start_time" />
                            </td>
                            <td><input type="datetime-local" id="end_time" name="end_time" v-model="end_time" /></td>
                          </tr>
                        </tbody>
                      </table> -->
                      <ul class="actions">
                        <li>
                          <button v-if="place_id" class="button primary" @click="addToTripEvents()">Add to trip</button>
                        </li>
                      </ul>
                      <div v-if="add_to_trip_message" class="box">
                        <ul class="alt">
                          <li>
                            <b class="alt">{{ add_to_trip_message }}</b>
                          </li>
                        </ul>
                      </div>
                      <br />
                      <div class="col-12">
                        <ul class="actions">
                          <li class="primary">
                            <router-link to="/trip_events">
                              <button class="primary">Take me to my current trip!</button>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-else class="row gtr-uniform">
                      <div class="col-12">
                        <h4 style="text-align: center">
                          Planning a trip? Sign up or login to experience the app's full functionality
                        </h4>
                        <ul class="actions fit">
                          <li>
                            <router-link to="/signup">
                              <button class="button primary fit">Sign Up</button>
                            </router-link>
                          </li>
                          <li>
                            <router-link to="/login">
                              <button class="button primary fit">Login</button>
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      nearby_places: {},
      place: {},
      address: "",
      photo_reference: "",
      keyword: "",
      // type: "",
      place_id: "",
      next_page_token: "",
      search_message: "",
      add_to_trip_message: "",
      search_status: false,
      need_previous_page: false,
      api_key: process.env.VUE_APP_MY_API_KEY,
      errors: [],
      start_time: "2022-01-01T00:01",
      end_time: "2022-01-01T00:01",
    };
  },
  created: function () {},
  methods: {
    nearbySearch: function () {
      var params = {
        address: this.address,
        keyword: encodeURIComponent(this.keyword),
        // type: this.type,
        next_page_token: this.next_page_token,
      };
      axios
        .get("/api/places/nearby_search", { params })
        .then((response) => {
          if (response.data.length > 0) {
            console.log(params);
            console.log("next_page_token", response.data[0]["next_page_token"]);
            console.log("nearby search", response.data);
            this.search_status = true;
            console.log("search_status", this.search_status);
            this.nearby_places = response.data;
            this.next_page_token = response.data[0]["next_page_token"];
            this.need_previous_page = false;
          } else {
            this.message = "No results, try broadening your keyword search.";
          }
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
    nearbySearchNextPage: function () {
      var params = {
        next_page_token: this.next_page_token,
      };
      axios
        .get("/api/places/nearby_search/next_page", { params })
        .then((response) => {
          console.log("next_page_token", params);
          console.log("next results", response.data);
          this.nearby_places = response.data;
          this.next_page_token = response.data[0]["next_page_token"];
          this.need_previous_page = true;
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
    showPlaceDetails: function (i) {
      this.place_id = this.nearby_places[i].place_id;
      if (this.nearby_places[i].photo_reference) {
        this.photo_reference = this.nearby_places[i].photo_reference;
      } else {
        this.photo_reference =
          "Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT";
      }
      console.log("here is place_id", this.place_id);
      console.log("here is photo reference", this.photo_reference);
      var params = {
        place_id: this.place_id,
        // photo_reference: this.photo_reference,
      };
      axios
        .get("/api/places/place_details", { params })
        .then((response) => {
          console.log(params);
          console.log("showing place details", response);
          this.place = response.data;
        })
        .catch((error) => {
          console.log(error.messages);
        });

      var section = document.getElementById("place_details");
      section.scrollIntoView({ behavior: "smooth" });
    },
    addToTripEvents: function () {
      var params = {
        place_id: this.place_id,
        name: this.place["name"],
        address: this.place["address"],
        phone_number: this.place["phone_number"],
        hours: this.place["hours"],
        rating: this.place["rating"],
        user_ratings_total: this.place["user_ratings_total"],
        website: this.place["website"],
        google_url: this.place["google_url"],
        lat: this.place["lat"],
        lng: this.place["lng"],
        photo_reference: this.photo_reference,
        user_id: localStorage.getItem("user_id"),
        start: this.start_time,
        end: this.end_time,
      };
      if (this.start_time) {
        axios
          .post("/api/trip_events/new", params)
          .then((response) => {
            console.log(params);
            console.log(this.start_time);
            console.log(this.end_time);
            console.log("adding this to trip_events", response);
            // this.$router.push({ name: "Trip Events" });
            this.add_to_trip_message = "Added to trip!";
          })
          .catch((error) => {
            console.log(error.messages);
          });
      } else {
        this.add_to_trip_message = "You must select a start and end time before adding to your trip!";
      }
    },
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        console.log("logged in");
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
