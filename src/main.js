import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

//globally intercept 401 unauthorized error, logs user out by removing JWT, and reroutes to login page, hoping this is most efficient way, requires authenticating user on back end as well
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      router.push("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
