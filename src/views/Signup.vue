<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
        <h1>Signup</h1>
        <section>
          <form id="signup" @submit.prevent="submit()">
            <div class="row gtr-uniform">
              <div class="col-6 col-12-xsmall">
                <input type="text" name="first-name" id="first-name" v-model="firstName" placeholder="First Name" />
              </div>
              <div class="col-6 col-12-xsmall">
                <input type="text" name="last-name" id="last-name" v-model="lastName" placeholder="Last Name" />
              </div>
              <div class="col-6 col-12-xsmall">
                <input type="text" name="username" id="username" v-model="username" placeholder="Username" />
              </div>
              <div class="col-6 col-12-xsmall">
                <input type="email" name="email" id="email" v-model="email" placeholder="Email" />
              </div>
              <div class="col-6 col-12-xsmall">
                <input type="password" name="password" id="password" v-model="password" placeholder="Password" />
              </div>
              <div class="col-6 col-12-xsmall">
                <input
                  type="password"
                  name="password-confirmation"
                  id="password-confirmation"
                  v-model="passwordConfirmation"
                  placeholder="Confirm Password"
                />
              </div>
              <div class="col-12">
                <ul class="actions">
                  <li><input form="signup" type="submit" value="Submit" class="primary" /></li>
                  <li><input type="reset" value="Clear" /></li>
                </ul>
              </div>
            </div>
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
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      valid: false,
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    submit: function () {
      var params = {
        username: this.username,
        name: `${this.firstName} ${this.lastName}`,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
