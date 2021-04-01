import { createStore } from "vuex";

// store instance.
const gameStore = createStore({
  state() {
    return {
      count: 0,
      gridSize: 5,
    };
  },
  actions: {
    addGridSize(context, size) {
      context.commit("addGridCount", size);
    },
  },
  mutations: {
    addGridCount(state, size) {
      state.gridSize = size <= 20 ? size : 5;
    },
  },
});

export default gameStore;
