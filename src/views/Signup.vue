<template>
  <div id="wrapper">
    <div id="main">
      <div class="inner">
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
        <!-- <div class="signup">
    <v-form @submit.prevent="submit()" v-model="valid" id="signup">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="username" :counter="30" label="Username" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="firstName"
              :rules="nameRules"
              :counter="30"
              label="First name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="lastName" :rules="nameRules" :counter="30" label="Last name" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              type="password"
              v-model="passwordConfirmation"
              label="Confirm Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn form="signup" type="submit" color="success">Sign Up</v-btn>
      </v-container>
    </v-form>
  </div> -->
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
      nameRules: [(v) => !!v || "Name is required", (v) => v.length <= 30 || "Name must be less than 30 characters"],
      emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],
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
