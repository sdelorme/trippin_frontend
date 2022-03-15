import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

// #trying to redirect user to login page when 401 error occurs
// axios.interceptors.response.use(
//   (response) => {
//     console.log("response status", response.status);
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log("error status is".error.response.status);
//       router.push("/login");
//     }
//     return Promise.reject(error);
//   }
// );

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
