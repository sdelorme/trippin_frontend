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
      Enter Type:
      <input type="text" v-model="type" />
      <hr />
      <input type="submit" value="Search" />
      <br />
      <br />
      <br />
      <br />
    </form>
    <div v-for="(place, i) in nearby_places" :key="i">
      <button v-on:click="showPlaceDetails(i)" style="list-style: none">
        <li>Name: {{ place.name }}</li>
        <li>Rating: {{ place.rating }}</li>
        <li>Number of Ratings: {{ place.user_ratings_total }}</li>
        <li>Address: {{ place.address }}</li>
      </button>
    </div>
    <div>
      <ul style="list-style: none">
        <a v-bind:href="place.website" target="_blank" rel="noreferrer noopener">{{ place.name }}</a>
        <br />
        {{
          place.phone_number
        }}
        <br />
        {{
          place.address
        }}
        <hr />
        <div v-for="item in place.hours" :key="item">
          {{ item }}
        </div>
        <hr />
        Rating:
        {{
          place.rating
        }}
        <br />
        Total Ratings:
        {{
          place.user_ratings_total
        }}
        <br />
        <a v-bind:href="place.google_url" target="_blank" rel="noreferrer noopener">See More Information Here</a>

        <br />
      </ul>
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
      keyword: "",
      type: "",
      place_id: "",
    };
  },
  created: function () {
    // this.nearbySearch();
  },
  methods: {
    nearbySearch: function () {
      var params = {
        address: this.address,
        keyword: this.keyword,
        type: this.type,
      };
      axios
        .get("/api/places/nearby_search", { params })
        .then((response) => {
          console.log(params);
          console.log("nearby search", response.data);
          this.nearby_places = response.data;
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
    showPlaceDetails: function (i) {
      this.place_id = this.nearby_places[i].place_id;
      console.log("here is place_id", this.place_id);
      var params = {
        place_id: this.place_id,
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
  },
};
</script>
