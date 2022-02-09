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
            <!-- Enter Type:
          <input type="text" v-model="type" /> -->
            <div class="col-12">
              <ul class="actions">
                <li><input form="nearbySearch" type="submit" class="primary" value="Search" /></li>
              </ul>
            </div>
          </div>
        </form>
        <div>
          <p>{{ message }}</p>
        </div>

        <section>
          <div class="row gtr-uniform">
            <div class="col-4" v-for="(place, i) in nearby_places" :key="i" @click="showPlaceDetails(i)">
              <div class="box">
                <span class="image fit">
                  <ul class="alt">
                    <li>{{ place.name }}</li>
                    <li>Should be picture here</li>
                    <li>Rating: {{ place.rating }}</li>
                    <li>Number of Ratings: {{ place.user_ratings_total }}</li>
                    <li>Address: {{ place.address }}</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
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
        <div id="wrapper">
          <div class="inner">
            <div id="place_details" v-if="place_id.length > 0">
              <ul class="alt">
                <div v-if="place.photos">
                  <img
                    v-bind:src="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${photo_reference}&key=${api_key}`"
                  />
                </div>
                <div v-else>No photo</div>
                <br />
                <div v-if="place.website">
                  <li>
                    <a v-bind:href="place.website" target="_blank" rel="noreferrer noopener">{{ place.name }}</a>
                  </li>
                </div>
                <div v-else>{{ place.name }}</div>
                <div v-if="place.phone_number">
                  <li>{{ place.phone_number }}</li>
                </div>
                <div v-else>No phone number listed</div>
                <div v-if="place.address">
                  <li>{{ place.address }}</li>
                </div>
                <div v-else>No address listed</div>
                <div v-if="place.hours">
                  <div v-for="item in place.hours" :key="item">
                    <li>{{ item }}</li>
                  </div>
                </div>
                <div v-else>No hours listed</div>
                <div v-if="place.rating > 0">
                  <li>Rating: {{ place.rating }}</li>
                </div>
                <div v-else>No ratings listed</div>
                <div v-if="place.user_ratings_total > 0">
                  <li>Total Ratings: {{ place.user_ratings_total }}</li>
                </div>
                <div v-else>No rating totals</div>
                <div v-if="place.google_url">
                  <li>
                    <a v-bind:href="place.google_url" target="_blank" rel="noreferrer noopener">
                      See More Information Here
                    </a>
                  </li>
                </div>
                <!-- <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-menu
              ref="menu"
              v-model="date_status"
              :close-on-content-click="true"
              :return-value.sync="date"
              transition="scale-transition"
              offset-x
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="selected_date"
                  label="Choose date"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="selected_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="date_status = false">Cancel</v-btn>
                <v-btn text color="primary">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-row>
            <v-col cols="auto">
              <v-menu
                ref="menu"
                v-model="start_time_status"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-x
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start_time"
                    label="Choose start time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="start_time_status" v-model="start_time" full-width>
                  <v-btn text color="primary">Cancel</v-btn>
                  <v-btn text color="primary" @click="start_time_status = false">OK</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto">
              <v-menu
                ref="menu"
                v-model="end_time_status"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-x
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="end_time"
                    label="Choose end time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="end_time_status" v-model="end_time" full-width>
                  <v-btn text color="primary">Cancel</v-btn>
                  <v-btn text color="primary" @click="end_time_status = false">OK</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-row> -->
              </ul>
              <div class="row">
                <div class="col-6 col-12-medium">
                  <ul class="actions">
                    <li><label for="start_time">Choose Start Time</label></li>
                    <li><input type="datetime-local" id="start_time" name="start_time" v-model="start_time" /></li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-6 col-12-medium">
                  <ul class="actions">
                    <li><label for="end_time">Choose End Time</label></li>
                    <li><input type="datetime-local" id="end_time" name="end_time" v-model="end_time" /></li>
                  </ul>
                </div>
              </div>
              <ul class="actions">
                <li><button v-if="place_id" class="button primary" @click="addToTripEvents()">Add to trip</button></li>
              </ul>
            </div>
          </div>
        </div>
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
      message: "",
      search_status: false,
      need_previous_page: false,
      api_key: process.env.VUE_APP_MY_API_KEY,
      errors: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      selected_date: null,
      date_status: false,
      start_time: null,
      end_time: null,
      start_time_status: false,
      end_time_status: false,
    };
  },
  created: function () {
    // this.nearbySearch();
  },
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
      if (this.nearby_places[i].photos) {
        this.photo_reference = this.nearby_places[i].photos[0]["photo_reference"];
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
      axios
        .post("/api/trip_events/new", params)
        .then((response) => {
          console.log(params);
          console.log(this.start_time);
          console.log(this.end_time);
          console.log("adding this to trip_events", response);
          this.$router.push({ name: "Trip Events" });
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
  },
};
</script>
