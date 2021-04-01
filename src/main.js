import { createApp } from "vue";
import App from "./App.vue";

import router from "./core/router.js";
import gameStore from "./core/store/store.js";

// import index css
import "./assets/css/index.css";

// vue app instance
const GameApp = createApp(App);

GameApp.use(gameStore);
GameApp.use(router);

// mount app
GameApp.mount("#app");
