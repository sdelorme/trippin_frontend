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
                    <div class="table-wrapper">
                      <table class="alt">
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
                      </table>
                    </div>
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
            this.$router.push({ name: "Trip Events" });
          })
          .catch((error) => {
            console.log(error.messages);
          });
      } else {
        this.add_to_trip_message = "You must at least select a start time before adding to your trip!";
      }
    },
  },
};
</script>
