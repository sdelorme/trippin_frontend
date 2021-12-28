<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div id="nav">
        <router-link to="/">Home</router-link>
        ++
        <router-link to="/calendar">Calendar</router-link>
        ++
        <router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link>
        ++
        <router-link v-if="!isLoggedIn()" to="/login">Login</router-link>
        ++
        <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
        ++
        <router-link v-if="isLoggedIn()" to="/trip_events">My Trip Events</router-link>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #fcfcfc;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  name: "App",
  methods: {
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        console.log("logged in");
        return true;
      } else {
        return false;
      }
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
