<template>
  <div class="bg-img">
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
              <div class="card">
                <div class="card-top"></div>
                <div class="grids">
                  <div v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <div class="rows">
                      <div v-for="(col, colIndex) in rows" :key="colIndex">
                        <!-- insert player position -->

                        <div
                          class="cols flex items-center justify-center"
                          :id="'col-' + rowIndex + colIndex"
                        >
                          <!-- {{ rowIndex + " " + colIndex }} -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// intialise variables
const rows = ref(10);
const cols = ref(10);

let playerPosition = ref(0);

playerPosition = Math.floor(Math.random() * cols.value);

console.log({ rows, cols, playerPosition });

let playerColId = ref("");
playerColId = `col-${playerPosition}${playerPosition}`;

let foodPosition = ref(0);
foodPosition = Math.floor(Math.random * cols.value);

let foodPositions = ref([]);

// insert food position  into an array
for (var i = 0; i <= 10; i++) {
  if (foodPosition != playerPosition) {
    console.log(foodPosition.value);
    foodPositions.value.push(foodPosition.value);
  }
}

console.log(foodPositions.value);

onMounted(
  () =>
    (document.getElementById(
      playerColId
    ).innerHTML = `<img src="/images/svg/player.svg" class="w-9" alt="player" />`)
);
</script>

<style scoped>
.card {
  background-color: #fff;
  width: max-content;
}

.card .grids {
  border: 2px solid #853594;
}

.grids {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.rows {
  widows: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.cols {
  width: 50px;
  height: 50px;
  border: 1px solid #853594;
}

.bg-img {
  width: 100%;
  height: 100%;
  background-image: url("/images/png/playbg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>