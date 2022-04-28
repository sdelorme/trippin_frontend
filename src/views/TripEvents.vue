<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>My Current Trip Events</h1>
        <!-- <div v-if="trip_events.count === 0">No trip events</div> -->
        <div v-if="trip_events.length" class="table-wrapper">
          <table class="alt">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete?</th>
              </tr>
            </thead>
            <tbody v-for="event in trip_events" :key="event.id">
              <tr>
                <td>
                  <strong>
                    <a v-bind:href="event.website" target="_blank" rel="noreferrer noopener">{{ event.name }}</a>
                  </strong>
                </td>
                <td>
                  {{ event.address }}
                </td>
                <td>
                  {{ event.phone_number }}
                </td>
                <td>
                  {{ event.start }}
                </td>
                <td>
                  {{ event.end }}
                </td>
                <td width="10%">
                  <button class="button warning small" @click="deleteTripEvent(event)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <form id="saveTrip" @submit.prevent="saveTrip()">
            <div class="row gtr-uniform">
              <div class="col-12 col-12-xsmall">
                <strong>Want to save this trip? Add a name below and press save!</strong>
                <input
                  type="text"
                  name="trip_name"
                  id="trip_name"
                  v-model="trip_name"
                  placeholder="Ex. Dive Bars In Chicago"
                />
              </div>
              <div class="col-12">
                <ul class="actions">
                  <li><input form="saveTrip" type="submit" class="primary" value="Save Trip" /></li>
                  <li class="primary">
                    <router-link to="/findPlaces">
                      <button class="secondary">Find more places to add!</button>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div v-else>
          <p>No trip events have been added yet.</p>
          <div class="col-12">
            <ul class="actions">
              <li class="primary">
                <router-link to="/findPlaces"><button class="secondary">Find places to add!</button></router-link>
              </li>
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
      trip_events: [],
      trip_name: "",
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
    saveTrip: function () {
      var params = {
        user_id: localStorage.getItem("user_id"),
        trip_name: this.trip_name,
        trip_events: this.trip_events,
      };
      axios
        .post("api/saved_trips/new", params)
        .then((response) => {
          console.log("adding to saved trips", response);
          this.$router.push({ name: "Saved Trips Index" });
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
  },
};
</script>
