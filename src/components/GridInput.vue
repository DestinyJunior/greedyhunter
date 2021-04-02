<template>
  <!-- game grid -->
  <div
    class="w-4/6 mx-auto px-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3"
  >
    <div class="flex-shrink-0 w-full sm:w-3/5 text-pink-950 text-center">
      <h4 class="text-3xl">Game grid</h4>
    </div>
    <div class="w-full sm:w-2/5">
      <div class="input-group px-2 flex flex-row items-center justify-between">
        <input
          type="number"
          id="input"
          class="w-auto text-white bg-transparent py-1 focus:outline-none"
          name="gridnumber"
          :value="size"
          :min="minSize"
          :max="maxSize"
          autofocus
        />
        <div
          class="flex-shrink-0 flex flex-col items-center justify-center space-y-1 -ml-5 z-50"
        >
          <button @click="increment" class="focus:outline-none">
            <img src="/images/svg/arrowup.svg" class="w-5" alt="arrowUp" />
          </button>
          <button @click="decrement" class="focus:outline-none">
            <img src="/images/svg/arrowdn.svg" class="w-5" alt="arrowUp" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- start button -->
  <div>
    <button
      @click="setGridSize"
      type="button"
      class="bg-purple-850 text-white text-lg py-3 px-20 rounded-lg focus:outline-none"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import store from "../core/store/store.js";
import router from "../core/router";
import { ref, onMounted, defineProps } from "vue";

defineProps({
  buttonText: String,
});
const maxSize = ref(10);
const minSize = ref(5);
let size = ref(5);

// decrement size
const decrement = () => {
  if (size.value <= minSize.value) {
    return;
  } else {
    document.getElementById("input").stepDown();
    size.value = size.value - 1;
  }
};

// increment size
const increment = () => {
  if (size.value >= maxSize.value) {
    return;
  } else {
    size.value = size.value + 1;
    document.getElementById("input").stepUp();
  }
};

const setGridSize = () => {
  store.dispatch("addGridSize", size.value);
  router.replace({ name: "game.play" });
};

onMounted(() => {
  // window event
  const inputElement = document.getElementById("input");
  inputElement.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // do nothing if the event was already processed
    }

    switch (event.key) {
      case "Down":
      case "ArrowDown":
        decrement();
        break;
      case "Up":
      case "ArrowUp":
        increment();
        break;
      default:
        return;
    }

    // avoid being handled twice
    event.preventDefault();
  });
});
</script>

