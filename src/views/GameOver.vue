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
                  Total Food: <span class="font-bold">7/10</span>
                </p>
                <p class="text-base">
                  Time Spent: <span class="font-bold">98 seconds</span>
                </p>
              </div>

              <!-- game grid -->
              <div
                class="w-4/6 mx-auto px-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3"
              >
                <div
                  class="flex-shrink-0 w-full sm:w-3/5 text-pink-950 text-center"
                >
                  <h4 class="text-3xl">Game grid</h4>
                </div>
                <div class="w-full sm:w-2/5">
                  <div
                    class="input-group px-2 flex flex-row items-center justify-between"
                  >
                    <input
                      type="number"
                      id="input"
                      class="w-auto text-white bg-transparent py-1 focus:outline-none"
                      name="gridnumber"
                      min="5"
                      max="20"
                      value="5"
                      autofocus
                    />
                    <div
                      class="flex-shrink-0 flex flex-col items-center justify-center space-y-1 -ml-5 z-50"
                    >
                      <button
                        onclick="document.getElementById('input').stepUp()"
                        class="focus:outline-none"
                      >
                        <img
                          src="/images/svg/arrowup.svg"
                          class="w-5"
                          alt="arrowUp"
                        />
                      </button>
                      <button
                        onclick="document.getElementById('input').stepDown()"
                        class="focus:outline-none"
                      >
                        <img
                          src="/images/svg/arrowdn.svg"
                          class="w-5"
                          alt="arrowUp"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- start button -->
              <div>
                <button
                  type="button"
                  class="bg-purple-850 text-white text-lg py-3 px-20 rounded-lg focus:outline-none"
                >
                  Start Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
