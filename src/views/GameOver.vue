<template>
  <div class="bg-dots">
    <div class="z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-middle rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
        >
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div
              class="w-full flex flex-col items-center justify-center space-y-5"
            >
              <img
                src="/images/svg/player.svg"
                class="sm:w-40"
                alt="PlayerAvatar"
              />
              <h2 class="text-4xl sm:text-6xl text-yellow-950">Game over!</h2>

              <div class="text-center text-blue-450 space-y-2">
                <p class="text-base">
                  Total Food:
                  <span class="font-bold">{{ foodEaten }}/{{ totalFood }}</span>
                </p>
                <p class="text-base">
                  Time Spent:
                  <span class="font-bold">{{ timeSpent }} seconds</span>
                </p>
              </div>

              <!--input game grid -->
              <GridInput buttonText="Start again" />
              <!-- end grid game -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GridInput from "../components/GridInput.vue";

import store from "../core/store/store.js";

const foodEaten = store.state.foodEaten;
const totalFood = store.state.totalFood;
const timeSpent = store.state.timeSpent;
</script>
