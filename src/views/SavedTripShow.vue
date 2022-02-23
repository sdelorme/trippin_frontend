<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>Saved Trip Page</h1>
        <div>
          <p>Id: {{ saved_trip.id }}</p>
          <p>Name: {{ saved_trip.trip_name }}</p>
          <div v-for="event in saved_trip.trip_events" :key="event.id">
            <ul>
              <li>name: {{ event.name }}</li>
              <li>id: {{ event.id }}</li>
              <li>place_id: {{ event.place_id }}</li>
              <li>address: {{ event.address }}</li>
              <li>phone_number: {{ event.phone_number }}</li>
              <li>hours: {{ event.hours }}</li>
              <li>rating: {{ event.rating }}</li>
              <li>website: {{ event.website }}</li>
              <li>google_url: {{ event.google_url }}</li>
              <li>photo_reference: {{ event.photo_reference }}</li>
            </ul>
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
      saved_trip: {},
    };
  },
  created: function () {
    axios.get("/api/saved_trips/" + this.$route.params.id).then((response) => {
      console.log("saved trip", response);
      this.saved_trip = response.data;
    });
  },
  methods: {},
};
</script>
