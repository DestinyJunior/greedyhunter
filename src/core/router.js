import { createWebHistory, createRouter } from "vue-router";

// pages
const GameStart = () => import("../views/GameStart.vue");
const GamePlay = () => import("../views/GamePlay.vue");
const GameFinished = () => import("../views/GameFinished.vue");
const GameOver = () => import("../views/GameOver.vue");

const NotFoundPage = () => import("../views/NotFound.vue");

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
  },
  {
    path: "/finished",
    name: "game.finished",
    component: GameFinished,
  },
  {
    path: "/over",
    name: "game.over",
    component: GameOver,
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
