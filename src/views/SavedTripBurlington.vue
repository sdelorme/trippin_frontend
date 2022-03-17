<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>Breweries of The Queen City!</h1>
        <div class="col-12">
          <ul class="actions">
            <li>
              <router-link to="/"><button class="primary">Back to Home</button></router-link>
            </li>
          </ul>
        </div>
        <div class="table-wrapper">
          <table class="alt">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody v-for="event in saved_trip.trip_events" :key="event.id">
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
                  {{ event.rating }}
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
      saved_trip: [],
    };
  },
  created: function () {
    axios.get("/api/burlington").then((response) => {
      console.log("Burlington preset", response);
      this.saved_trip = response.data;
    });
  },
  methods: {},
};
</script>
