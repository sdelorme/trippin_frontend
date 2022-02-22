<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>Saved Trip Page</h1>
        <div>
          <p>Id: {{ saved_trip.id }}</p>
          <p>Name: {{ saved_trip.trip_name }}</p>
          <p>Trip Events: {{ saved_trip.trip_events }}</p>
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
