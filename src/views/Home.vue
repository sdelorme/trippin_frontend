<template>
  <div class="home">
    <h1>Nearby Places</h1>
    <form v-on:submit.prevent="nearbySearch()">
      Enter Address:
      <input type="text" v-model="address" />
      <br />
      Enter Keyword:
      <input type="text" v-model="keyword" />
      <br />
      Enter Type:
      <input type="text" v-model="type" />
      <br />
      <input type="submit" value="Search" />
    </form>
    <div v-for="place in nearby_places" :key="place.id">
      <ul style="list-style: none">
        <li>Name: {{ place.name }}</li>
        <li>Rating: {{ place.rating }}</li>
        <li>Number of Ratings: {{ place.user_ratings_total }}</li>
        <li>Address: {{ place.address }}</li>
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
  },
};
</script>
