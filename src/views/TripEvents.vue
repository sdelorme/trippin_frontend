<template>
  <div class="home">
    <div v-for="event in trip_events" :key="event.id">
      <ul>
        <li>
          <a v-bind:href="event.website" target="_blank" rel="noreferrer noopener">{{ event.name }}</a>
        </li>
        <p>{{ event.address }}</p>
        <p>{{ event.phone_number }}</p>
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
      message: "Trip Events",
      trip_events: [],
    };
  },
  created: function () {
    axios.get("/api/trip_events").then((response) => {
      console.log("trip events for this user", response);
      this.trip_events = response.data;
    });
  },
  methods: {},
};
</script>
