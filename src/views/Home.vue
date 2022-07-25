<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <header>
          <h1>Welcome to Trippin'</h1>
        </header>
        <p>
          <strong>
            This app was built by
            <a target="_blank" href="https://www.linkedin.com/in/seth-delorme/"><b class="alt-2">Seth Delorme</b></a>
            on a Rails backend, Vuejs frontend, and the Google Places API. Seth loves food and is always recommending
            places to friends. He built Trippin' to make that a little easier. The app allows you to plan a vacation
            ("trip") itinerary, search for restaurants or attractions , and save a list of places that you would like to
            share with others. Check out Seth's favorite Vermont breweries at the bottom of this page.
          </strong>
        </p>
        <hr />
        <h3>How does it work?</h3>
        <section class="tiles">
          <article class="image home">
            <span class="image">
              <img src="images/homepage.png" alt="" />
            </span>
            <a>
              <div class="content">
                <blockquote>
                  <ul class="actions fit stacked">
                    <li>
                      <button class="button secondary fit">
                        <p class="fas fa-sign-in-alt"></p>
                        Create an account and log in!
                      </button>
                    </li>
                    <li>
                      <button class="button secondary fit">
                        <p class="fas fa-solid fa-globe-europe"></p>
                        Head over to the "Find Places" page.
                      </button>
                    </li>
                    <li>
                      <button @click="scrollToPresets()" class="button secondary fit">
                        <p class="fas fa-map-marker-alt"></p>
                        Start finding places for your trip! 
                      </button>
                    </li>
                  </ul>
                </blockquote>
              </div>
            </a>
          </article>
        </section>
        <hr />
        <section>
          <div v-if="isLoggedIn()" class="box">
            <div class="row gtr-uniform">
              <div class="col-12">
                <h2 style="text-align: center">Welcome Back!</h2>
                <ul class="actions fit stacked">
                  <li>
                    <router-link to="/trip_events">
                      <button class="button primary fit">My Current Trip</button>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/saved_trips">
                      <button class="button primary fit">My Saved Trips</button>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="box">
            <p>
              <strong>
                Planning a trip? Sign up or login to experience the app's full functionality. Just looking for some
                sushi nearby? Click the "Find Places" tab below.
              </strong>
            </p>
            <div class="row gtr-uniform">
              <div class="col-12">
                <ul class="actions fit stacked">
                  <li>
                    <router-link to="/signup">
                      <button class="button primary fit">Sign Up</button>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/login">
                      <button class="button primary fit">Login</button>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <h3>Check out some trip ideas below!</h3>
        <section id="preset_trips" class="tiles">
          <article class="style1">
            <span class="image">
              <img src="images/pic01.jpg" alt="" />
            </span>
            <a href="/chicago">
              <h2>Chicago</h2>
              <div class="content">
                <p>A curated trip to Chicago's best dive bars!</p>
              </div>
            </a>
          </article>
          <article class="style2">
            <span class="image">
              <img src="images/pic02.jpg" alt="" />
            </span>
            <a href="/nyc">
              <h2>New York City</h2>
              <div class="content">
                <p>Planning a trip to New York? Here's some touristy stuff!</p>
              </div>
            </a>
          </article>
          <article class="style3">
            <span class="image">
              <img src="images/pic03.jpg" alt="" />
            </span>
            <a href="/ann_arbor">
              <h2>Ann Arbor</h2>
              <div class="content">
                <p>Hail to the victors! Check out these local spots in A2.</p>
              </div>
            </a>
          </article>
          <article class="style4">
            <span class="image">
              <img src="images/pic04.jpg" alt="" />
            </span>
            <a href="/boston">
              <h2>Boston</h2>
              <div class="content">
                <p>Quick stop in Boston!</p>
              </div>
            </a>
          </article>
          <article class="style5">
            <span class="image">
              <img src="images/pic05.jpg" alt="" />
            </span>
            <a href="/burlington">
              <h2>Burlington, VT</h2>
              <div class="content">
                <p>By far the best vacation you never knew about.</p>
              </div>
            </a>
          </article>
          <article class="style6">
            <span class="image">
              <img src="images/pic06.jpg" alt="" />
            </span>
            <a href="/san_francisco">
              <h2>San Francisco</h2>
              <div class="content">
                <p>Good food and some site seeing!.</p>
              </div>
            </a>
          </article>
        </section>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {};
  },
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
    scrollToPresets: function () {
      var section = document.getElementById("preset_trips");
      section.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
