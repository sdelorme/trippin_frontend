<template>
  <div id="app">
    <!-- Header -->
    <div id="wrapper">
      <header id="header">
        <!-- <div class="inner"> -->
        <!-- Logo -->
        <a href="/" class="logo">
          <span class="symbol"><img src="images/logo.png" alt="" /></span>
          <span class="title">Trippin'</span>
        </a>

        <!-- Nav -->
        <nav>
          <ul>
            <li><a href="#menu">Menu</a></li>
          </ul>
        </nav>
        <!-- </div> -->
      </header>
    </div>

    <nav id="menu">
      <div class="inner">
        <h2>Menu</h2>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/findPlaces">Find Places</router-link></li>
          <li><router-link v-if="isLoggedIn()" to="/trip_events">My Current Trip Events</router-link></li>
          <li><router-link v-if="isLoggedIn()" to="/saved_trips">My Saved Trips</router-link></li>
          <li><router-link v-if="!isLoggedIn()" to="/login">Log In</router-link></li>
          <li><router-link v-if="isLoggedIn()" to="/logout">Logout</router-link></li>
        </ul>
      </div>
    </nav>

    <router-view />

    <!-- <div id="wrapper"> -->
    <footer id="footer">
      <div class="inner">
        <section>
          <h2>Seth Delorme</h2>
          <ul class="icons">
            <li>
              <a href="https://github.com/sdelorme" class="icon brands style2 fa-github">
                <span class="label">GitHub</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/seth-delorme/" class="icon brands style2 fa-linkedin">
                <span class="label">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="tel:8029896323" class="icon solid style2 fa-phone"><span class="label">Phone</span></a>
            </li>
            <li>
              <a href="mailto: delorme.s.m@gmail.com" class="icon solid style2 fa-envelope">
                <span class="label">Email</span>
              </a>
            </li>
          </ul>
        </section>
        <ul class="copyright">
          <li>&copy; Trippin'. All rights reserved</li>
          <li>
            Design:
            <a href="https://html5up.net/phantom">Adapted from HTML5 UP - "Phantom"</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "App",
  created: function () {},
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
    // autoLogout: function () {
    //   axios.catch((error) => {
    //     if (error.status === 401) {
    //       console.log("logging out, no jwt");
    //       delete axios.defaults.headers.common["Authorization"];
    //       localStorage.removeItem("jwt");
    //       this.$router.push("/");
    //     }
    //   });
    // },
  },
};
</script>
