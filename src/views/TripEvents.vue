<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <div class="table-wrapper">
          <table class="alt">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete?</th>
              </tr>
            </thead>
            <tbody v-for="event in trip_events" :key="event.id">
              <tr>
                <td>
                  <a v-bind:href="event.website" target="_blank" rel="noreferrer noopener">{{ event.name }}</a>
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
                <td>
                  <ul class="actions">
                    <li>
                      <input type="submit" class="primary" value="Delete" @click="deleteTripEvent(event)" />
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
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
