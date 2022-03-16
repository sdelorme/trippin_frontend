<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <header>
          <h1>Welcome to Trippin</h1>
          <h3>How does it work?</h3>
          <blockquote>
            Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget tempus euismod. Vestibulum
            ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing
            accumsan faucibus. Vestibulum ante ipsum primis in faucibus lorem ipsum dolor sit amet nullam adipiscing eu
            felis.
          </blockquote>
        </header>
        <hr class="hr major" />
        <div v-if="isLoggedIn()" class="box alt">
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
        <div v-else class="box alt">
          <div class="row gtr-uniform">
            <div class="col-12">
              <p style="text-align: center">
                <strong>Planning a trip? Signup or login to experience the app's full functionality</strong>
              </p>
              <ul class="actions fit stacked">
                <li>
                  <router-link to="/signup">
                    <button class="button primary fit">Signup</button>
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
        <section class="tiles">
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
            <a href="/saved_trips">
              <h2>Boston</h2>
              <div class="content">
                <p>Seafood, good beer, and mudslides on the Cape will have you loving Bean Town.</p>
              </div>
            </a>
          </article>
          <article class="style5">
            <span class="image">
              <img src="images/pic05.jpg" alt="" />
            </span>
            <a href="/saved_trips">
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
            <a href="/saved_trips">
              <h2>San Francisco</h2>
              <div class="content">
                <p>Good food and some site seeing!.</p>
              </div>
            </a>
          </article>
          <article class="style1">
            <span class="image">
              <img src="images/pic07.jpg" alt="" />
            </span>
            <a href="/saved_trips">
              <h2>Los Angeles</h2>
              <div class="content">
                <p>Treat yo self in Hollywood!</p>
              </div>
            </a>
          </article>
          <article class="style2">
            <span class="image">
              <img src="images/pic08.jpg" alt="" />
            </span>
            <a href="/saved_trips">
              <h2>Seattle</h2>
              <div class="content">
                <p>Coffee, kayaking, and Pike Place Market!</p>
              </div>
            </a>
          </article>
          <article class="style3">
            <span class="image">
              <img src="images/pic09.jpg" alt="" />
            </span>
            <a href="/saved_trips">
              <h2>Washington D.C.</h2>
              <div class="content">
                <p>D.C. has some of the best brunch spots in the country.</p>
              </div>
            </a>
          </article>
          <article class="style4">
            <span class="image">
              <img src="images/pic10.jpg" alt="" />
            </span>
            <a href="/saved_trips">
              <h2>Nashville</h2>
              <div class="content">
                <p>Bach party?</p>
              </div>
            </a>
          </article>
          <article class="style5">
            <span class="image">
              <img src="images/pic11.jpg" alt="" />
            </span>
            <a href="/saved_trips">
              <h2>Charleston</h2>
              <div class="content">
                <p>Good seafood and beach vibes await.</p>
              </div>
            </a>
          </article>
          <article class="style6">
            <span class="image">
              <img src="images/pic12.jpg" alt="" />
            </span>
            <a href="/saved_trips">
              <h2>Atlanta</h2>
              <div class="content">
                <p>ATL will not dissapoint -- this list is NOT big enough!</p>
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
  },
};
</script>
