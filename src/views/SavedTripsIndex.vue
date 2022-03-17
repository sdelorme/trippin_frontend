<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>My Saved Trips</h1>
        <div v-for="event in saved_trips" :key="event.id">
          <article class="box">
            <router-link v-bind:to="`/saved_trips/${event.id}`">
              <p>{{ event.trip_name }}</p>
            </router-link>
          </article>
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
      saved_trips: [],
    };
  },
  created: function () {
    axios.get("/api/saved_trips").then((response) => {
      console.log("saved trips for this user", response);
      this.saved_trips = response.data;
    });
  },
  methods: {},
};
</script>
