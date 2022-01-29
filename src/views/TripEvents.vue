<template>
  <div class="home">
    <div v-for="event in trip_events" :key="event.id">
      <ul>
        <li>
          <a v-bind:href="event.website" target="_blank" rel="noreferrer noopener">{{ event.name }}</a>
        </li>
        <p>{{ event.id }}</p>
        <p>{{ event.address }}</p>
        <p>{{ event.phone_number }}</p>
        <p>Start:{{ event.start }}</p>
        <p>End:{{ event.end }}</p>
        <v-btn v-model="event.id" @click="deleteTripEvent(event)">Delete</v-btn>
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
      trip_events: [],
    };
  },
  created: function () {
    axios.get("/api/trip_events").then((response) => {
      console.log("trip events for this user", response);
      this.trip_events = response.data;
    });
  },
  methods: {
    deleteTripEvent: function (event) {
      console.log(event.id);
      axios.delete("api/trip_events/" + event.id).then((response) => {
        console.log("deleted trip event", response);
        window.location.reload();
      });
    },
  },
};
</script>
