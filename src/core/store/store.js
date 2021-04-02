import { createStore } from "vuex";

// store instance.
const gameStore = createStore({
  state() {
    return {
      size: 0,
      foodEaten: null,
      totalFood: null,
      timeSpent: null,
    };
  },
  // getters: {
  //   size(state) {
  //     return state.size;
  //   },
  //   foodEaten(state) {
  //     return state.foodEaten;
  //   },
  //   totalFood(state) {
  //     return state.totalFood;
  //   },
  //   timeSpent(state) {
  //     return state.timeSpent;
  //   },
  // },
  actions: {
    addGridSize(context, size) {
      context.commit("SET_GRID", size);
    },
    gameFinished(context, data) {
      context.commit("SET_GAME_FINISHED_DATA", data);
    },
  },
  mutations: {
    SET_GRID(state, size) {
      state.size = size;
    },
    SET_GAME_FINISHED_DATA(state, data) {
      state.foodEaten = data.foodEaten;
      state.totalFood = data.totalFood;
      state.timeSpent = data.timeSpent;
    },
  },
});

export default gameStore;
