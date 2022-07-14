<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>My Current Trip</h1>
        <p>
          Here is the trip you are currently planning. If you would like to create a schedule, adjust the start and end
          time of each event. Make sure to press update after choosing a date and time. Current functionality will only
          allow to update update one event at a time.
        </p>
        <p>
          Not using this as a scheduled itinerary? No problem, just ignore the Start Time and End Time features and save
          your trip.
        </p>
        <p>
          If you are using this as a scheduled itinerary, keep adding places until you are all planned out. Once you are
          finished with your trip, press "Save Trip" if you want to reference these places in the future. Once you save
          your trip, all current trip events will be cleared.
        </p>
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
                  <br />
                  <input type="datetime-local" id="start_time" name="start_time" v-model="event.start" />
                </td>
                <td>
                  {{ event.end }}
                  <br />
                  <input type="datetime-local" id="end_time" name="end_time" v-model="event.end" />
                </td>
                <td width="10%">
                  <button class="button small" @click="updateTripEvent(event)">Update Time</button>
                  <br class="alt" />
                  <button class="button warning small" @click="deleteTripEvent(event)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="col-12">
            <ul class="actions">
              <li class="primary">
                <router-link to="/findPlaces">
                  <button class="secondary">Find more places to add!</button>
                </router-link>
              </li>
              <li>
                <button class="button warning" @click="deleteAllTripEvents()">Delete All Trip Events</button>
              </li>
            </ul>
          </div>
          <form id="saveTrip" @submit.prevent="saveTrip(), deleteAllTripEvents()">
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
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div v-else>
          <p><b class="alt">No events have been added yet.</b></p>
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
      start_time: "",
      end_time: "",
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
    updateTripEvent: function (event) {
      console.log(event.id);
      var params = {
        start: event.start,
        end: event.end,
      };
      axios.patch("api/trip_events/" + event.id, params).then((response) => {
        console.log("update trip event", response);
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
    deleteAllTripEvents: function () {
      var params = {
        user_id: localStorage.getItem("user_id"),
      };
      axios
        .delete("api/trip_events", params)
        .then((response) => {
          console.log("deleting all trip events", response);
          this.$router.push({ name: "Saved Trips Index" });
        })
        .catch((error) => {
          console.log(error.messages);
        });
    },
  },
};
</script>
