<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>Login</h1>
        <section>
          <form id="login" @submit.prevent="submit()">
            <div class="row gtr-uniform">
              <div class="col-6 col-12-xsmall">
                <input type="text" name="username" id="username" v-model="username" placeholder="Username" />
              </div>
            </div>
            <div class="row gtr-uniform">
              <div class="col-6 col-12-xsmall">
                <input type="password" name="password" id="password" v-model="password" placeholder="Password" />
              </div>
              <div class="col-12">
                <ul class="actions">
                  <li><input form="login" type="submit" class="primary" value="Submit" /></li>
                </ul>
              </div>
            </div>
            <ul>
              <li class="text-danger" v-for="error in errors" v-bind:key="error">
                {{ error }}
              </li>
            </ul>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
