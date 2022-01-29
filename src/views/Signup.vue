<template>
  <div class="signup">
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
