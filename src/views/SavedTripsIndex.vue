<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>My Saved Trips</h1>
        <div v-for="(event, i) in saved_trips" :key="i">
          <article class="box">
            <router-link v-bind:to="`/saved_trips/${event.id}`">
              <strong>{{ event.trip_name }}</strong>
            </router-link>
            <ul class="actions">
              <li>
                <button class="button warning" @click="deleteSavedTrip(i)">Delete This Trip</button>
              </li>
            </ul>
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
      // id: "",
    };
  },
  created: function () {
    axios.get("/api/saved_trips").then((response) => {
      console.log("saved trips for this user", response);
      this.saved_trips = response.data;
    });
  },
  methods: {
    deleteSavedTrip: function (i) {
      axios.delete("/api/saved_trips/" + this.saved_trips[i].id).then((response) => {
        console.log("deleted the trip", response);
        window.location.reload();
      });
    },
  },
};
</script>
