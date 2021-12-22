<template>
  <div class="home">
    <h1>Nearby Places</h1>
    <form v-on:submit.prevent="nearbySearch()">
      Enter Address:
      <input type="text" v-model="address" />
      <hr />
      Enter Keyword:
      <input type="text" v-model="keyword" />
      <hr />
      Enter Type: Change this to dropdown when bootstrap is done
      <input type="text" v-model="type" />
      <hr />
      <input type="submit" value="Search" />
      <br />
    </form>
    <div>
      <p>{{ message }}</p>
    </div>
    <div v-for="(place, i) in nearby_places" :key="i">
      <button v-on:click="showPlaceDetails(i)" style="list-style: none">
        <li>Should be picture here</li>
        <li>Name: {{ place.name }}</li>
        <li>Rating: {{ place.rating }}</li>
        <li>Number of Ratings: {{ place.user_ratings_total }}</li>
        <li>Address: {{ place.address }}</li>
      </button>
    </div>
    <div id="next_page">
      <button v-if="search_status == true && next_page_token" v-on:click="nearbySearchNextPage()" type="button">
        Next Page
      </button>
    </div>
    <div id="previous_page">
      <button v-if="need_previous_page == true" v-on:click="nearbySearch()" type="button">Previous Page</button>
    </div>
    <div id="place_details">
      <ul v-if="place_id.length > 0" style="list-style: none">
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
            <a v-bind:href="place.google_url" target="_blank" rel="noreferrer noopener">See More Information Here</a>
          </li>
        </div>
        <br />
      </ul>
      <button type="button" v-on:click="addToTripEvents()">Add to trip</button>
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
      type: "",
      place_id: "",
      next_page_token: "",
      message: "",
      search_status: false,
      need_previous_page: false,
      api_key: process.env.VUE_APP_MY_API_KEY,
      errors: [],
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
        type: this.type,
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
      };
      axios
        .post("/api/trip_events/new", params)
        .then((response) => {
          console.log(params);
          console.log("adding this to trip_events", response);
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
  },
};
</script>
