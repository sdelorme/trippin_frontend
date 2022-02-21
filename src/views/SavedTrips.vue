<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>My Saved Trips</h1>
        <p>{{ saved_trips }}</p>
        <!-- <div class="table-wrapper">
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
            <tbody v-for="event in saved_trips" :key="event.id">
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
        </div> -->
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
