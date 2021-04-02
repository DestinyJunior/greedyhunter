import { createWebHistory, createRouter } from "vue-router";

// pages
const GameStart = () => import("../views/GameStart.vue");
const GamePlay = () => import("../views/GamePlay.vue");
const GameFinished = () => import("../views/GameFinished.vue");
const GameOver = () => import("../views/GameOver.vue");

const NotFoundPage = () => import("../views/NotFound.vue");

// import store
import store from "./store/store.js";

const routes = [
  {
    path: "/",
    name: "game.start",
    component: GameStart,
  },
  {
    path: "/play",
    name: "game.play",
    component: GamePlay,
    beforeEnter: () => {
      if (store.state.size === 0 || store.state.size === null) {
        router.push({ name: "game.start" });
      }
    },
  },
  {
    path: "/finished",
    name: "game.finished",
    component: GameFinished,
    beforeEnter: () => {
      if (store.state.timeSpent === null) {
        router.push({ name: "game.start" });
      }
    },
  },
  {
    path: "/over",
    name: "game.over",
    component: GameOver,
    beforeEnter: () => {
      if (
        store.state.foodEaten === null ||
        store.state.totalFood == null ||
        store.state.timeSpent === null
      ) {
        router.push({ name: "game.start" });
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
];

const history = createWebHistory();

// create router instance
const router = createRouter({ history, routes });

export default router;
