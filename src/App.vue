<template>
  <div id="app">
    <!-- Header -->
    <div id="wrapper">
      <header id="header">
        <div class="inner">
          <!-- Logo -->
          <a href="/" class="logo">
            <span class="symbol"><img src="images/logo.png" alt="" /></span>
            <span class="title">Trippin</span>
          </a>

          <!-- Nav -->
          <nav>
            <ul>
              <li><a href="#menu">Menu</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>

    <nav id="menu">
      <div class="inner">
        <h2>Menu</h2>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link v-if="isLoggedIn()" to="/trip_events">My Trip Events</router-link></li>
          <li><router-link to="/findPlaces">Find Places</router-link></li>
          <li><router-link to="/calendar">Calendar</router-link></li>
          <li><router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link></li>
          <li><router-link v-if="!isLoggedIn()" to="/login">Login</router-link></li>
          <li><router-link v-if="isLoggedIn()" to="/logout">Logout</router-link></li>
        </ul>
      </div>
    </nav>

    <router-view />

    <div id="wrapper">
      <footer id="footer">
        <div class="inner">
          <section>
            <h2>Get in touch</h2>
            <form method="post" action="#">
              <div class="fields">
                <div class="field half">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div class="field half">
                  <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div class="field">
                  <textarea name="message" id="message" placeholder="Message"></textarea>
                </div>
              </div>
              <ul class="actions">
                <li><input type="submit" value="Send" class="primary" /></li>
              </ul>
            </form>
          </section>
          <section>
            <h2>Follow</h2>
            <ul class="icons">
              <li>
                <a href="#" class="icon brands style2 fa-github"><span class="label">GitHub</span></a>
              </li>
              <li>
                <a href="#" class="icon brands style2 fa-linkedin"><span class="label">LinkedIn</span></a>
              </li>
              <li>
                <a href="#" class="icon solid style2 fa-phone"><span class="label">Phone</span></a>
              </li>
              <li>
                <a href="#" class="icon solid style2 fa-envelope"><span class="label">Email</span></a>
              </li>
            </ul>
          </section>
          <ul class="copyright">
            <li>&copy; Untitled. All rights reserved</li>
            <li>
              Design:
              <a href="http://html5up.net">HTML5 UP</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</template>

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
