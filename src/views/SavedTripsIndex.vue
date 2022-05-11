<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>My Saved Trips</h1>
        <p>Here you can find all of the trips that you've saved.</p>
        <div v-if="saved_trips.length > 0">
          <div class="table-wrapper">
            <table class="alt">
              <thead>
                <tr>
                  <th>Trip Name</th>
                  <th>Delete?</th>
                </tr>
              </thead>
              <tbody v-for="(event, i) in saved_trips" :key="i">
                <tr>
                  <td>
                    <router-link v-bind:to="`/saved_trips/${event.id}`">
                      <strong>{{ event.trip_name }}</strong>
                    </router-link>
                  </td>
                  <td width="10%">
                    <button class="button warning small fit" @click="deleteSavedTrip(i)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else><b class="alt">You haven't saved any trips yet.</b></div>
      </div>
      <div class="row aln-center">
        <router-link to="/trip_events">
          <button class="primary">Take me to the current trip I'm planning!</button>
        </router-link>
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
