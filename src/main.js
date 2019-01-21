// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import store from "./store";
import App from "./components/App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faSave,
  faTrash,
  faCheck,
  faCheckSquare,
  faThumbsUp,
  faThumbsDown,
  faMeh
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faEdit,
  faSave,
  faTrash,
  faCheck,
  faCheckSquare,
  faThumbsUp,
  faThumbsDown,
  faMeh
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
