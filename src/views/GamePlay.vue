<template>
  <div class="bg-img">
    <div class="z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-1 sm:px-4 pb-20 text-center sm:block sm:p-0"
      >
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-middle rounded-lg text-left overflow-hidden transform transition-all sm:my-8 w-full sm:max-w-lg sm:w-full"
        >
          <div class="px-1 sm:px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div
              class="w-full bg-white flex flex-col items-center justify-center space-y-5 rounded-lg px-7 py-4"
            >
              <div class="w-full flex items-center justify-between">
                <span class="text-purple-990 text-xs sm:text-sm"
                  >Grid:
                  <span class="font-bold">{{ rows + " x " + cols }}</span></span
                >
                <div>
                  <Progress
                    :timeLimit="timeSec"
                    v-on:timepassed="setTimePassed"
                  />
                </div>
                <span class="text-purple-990 text-xs sm:text-sm"
                  >Time spent:
                  <span class="font-bold"
                    ><Timer :endDate="endGameDate" v-on:gameover="gameOver" />
                    secs</span
                  ></span
                >
              </div>
              <div class="card">
                <div class="grids flex flex-col">
                  <div v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <div class="rows" :style="{ height: colSize.height }">
                      <div v-for="(col, colIndex) in rows" :key="colIndex">
                        <!-- insert player position -->

                        <span
                          @click="makeMove(`${rowIndex}${colIndex}`)"
                          :style="{
                            width: colSize.width,
                            height: colSize.height,
                          }"
                          class="cols flex items-center justify-center"
                          :id="'col-' + rowIndex + colIndex"
                        >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full flex items-center justify-between">
                <span class="text-purple-990 text-xs sm:text-sm"
                  >Maximum moves:
                  <span class="font-bold">{{ maxMoves }}</span></span
                >

                <span class="text-purple-990 text-xs sm:text-sm"
                  >Total moves:
                  <span class="font-bold">{{ totalMoves }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Timer from "../components/Timer.vue";
import Progress from "../components/Progress.vue";

import { onBeforeRouteLeave } from "vue-router";

import { ref, onMounted, watch, reactive } from "vue";
import router from "../core/router.js";
import store from "../core/store/store.js";

// intialise variables
const rows = ref(store.state.size);
const cols = ref(store.state.size);
let totalMoves = ref(0);
let totalFoodGenerated = ref(0);
let foodEaten = ref(0);
let playerPosition = ref(0);

// width and height variable
let colSize = reactive({ width: ref("40px"), height: ref("40px") });

let maxMoves = ref(0);

if (cols.value < 6) {
  maxMoves.value = cols.value * Math.floor(cols.value / 2) + cols.value - 1;
  store.commit("SET_MAX_MOVES", maxMoves.value);
} else {
  maxMoves.value = cols.value * Math.floor(cols.value / 2) + 1;
  store.commit("SET_MAX_MOVES", maxMoves.value);
}

const timePassed = ref(0);

const playerElement = `<img src="/images/svg/player.svg" class="w-6 z-50" alt="player" />`;

playerPosition = Math.floor(Math.random() * cols.value);

const foods = ref(cols.value * 3);

// console.log({ rows, cols, playerPosition });

let playerColId = ref("");
playerColId = `col-${playerPosition}${playerPosition}`;

let gridValues = ref([]);

// time
const timeSec = foods.value;

let now = new Date();
var end = now.setSeconds(now.getSeconds() + timeSec);
const endGameDate = new Date(end);

// values of the rows and cols for validation

const generateArrayValuesForGrid = () => {
  for (var row = 0; row < rows.value; ++row) {
    for (var col = 0; col < cols.value; ++col) {
      var index = `${row}${col}`;
      gridValues.value.push(index);
    }
  }

  // console.log(gridValues.value);
};

// let foodPosition = ref(0);
// foodPosition = Math.floor(Math.random * cols.value);

let foodPositions = ref([]);

const calculateFoodPosition = () => {
  // console.log(playerPosition);
  // insert food position  into an array
  for (var i = 0; i <= foods.value; ++i) {
    var foodPosR = Math.floor(Math.random() * rows.value);
    var foodPosC = Math.floor(Math.random() * cols.value);

    // console.log(foodPosR, foodPosC);
    let foodPos = `col-${foodPosR}${foodPosC}`;

    // insertion
    if (
      foodPositions.value.indexOf(foodPos) === -1 &&
      !foodPos.includes(playerPosition.toString())
    ) {
      foodPositions.value.push(foodPos);
    }
  }

  totalFoodGenerated.value = foodPositions.value.length;
  // totalFoodGenerated = foodPositions.value.length;
  // console.log();
};

// display food on grid
const insertFoodsOnGrid = () => {
  foodPositions.value.forEach((colId) => {
    // console.log(colId);
    document.getElementById(
      colId
    ).innerHTML = `<img src="/images/svg/food.svg" class="w-6" alt="food" />`;
  });
};

const insertPlayer = () => {
  // insert player id
  document.getElementById(playerColId).innerHTML = playerElement;
};

// make move
const makeMove = (step) => {
  var stepId = `col-${step}`;
  // check if current player position is clicked
  if (stepId === playerColId) {
    return;
  }

  //
  // console.log(step, playerColId);

  // calculate distance between player and food
  var distance = step - parseInt(playerColId.split("-")[1]);

  // check if movement is left, right, up or down
  if (
    distance === -1 ||
    distance === 1 ||
    distance === -10 ||
    distance === 10
  ) {
    // move left
    // console.log(distance);
    eatFood({ stepTo: step, stepFrom: playerColId });
  }
};

// eat food on array
const eatFood = ({ stepTo, stepFrom }) => {
  // console.log({ stepTo, stepFrom });

  // check if stepTo contains food
  var colId = `col-${stepTo}`;
  // console.log(colId);

  var isFood = checkFood(colId);

  // moveplayer to next div
  movePlayer({ stepToId: colId, stepFromId: stepFrom, isFood: isFood });
};

// move player to position
const movePlayer = ({ stepToId, stepFromId, isFood }) => {
  playerColId = stepToId;
  playerPosition = stepToId.split("-")[1][1];

  // console.log(playerPosition, playerColId);
  // insert player id
  document.getElementById(stepToId).innerHTML = playerElement;

  // remove player id from step from
  document.getElementById(stepFromId).innerHTML = null;

  // calculate total food eaten
  if (isFood) {
    //increment total food eaten and total moves
    foodEaten.value++;
    totalMoves.value++;
    store.commit("SET_TOTAL_MOVES", totalMoves.value);
    // calulate remaining food
    calcRemFood(stepFromId);
  } else {
    //increment total moves
    totalMoves.value++;
  }
};

// check if grid contains food
const checkFood = (colId) => {
  // console.log(colId, "check food");
  var childElements = document.getElementById(colId).childNodes[0];

  if (typeof childElements === "undefined") {
    return false;
  }

  return true;
};

// calculate remainging food
const calcRemFood = (currentFood) => {
  // console.log(currentFood);
  var colIndex = foodPositions.value.indexOf(currentFood);

  foodPositions.value.splice(colIndex, 1);

  // console.log(foodPositions.value);
};

// make keyboard event move
const makeKeyboardMove = (stepType) => {
  // console.log(playerColId, stepType);
  let numberPos = playerColId.split("-")[1];
  let nextStep = 0;
  // down, up, left, right
  if (stepType === "d") {
    nextStep = parseInt(numberPos) + 10;
    movePlayerKeyboard(nextStep);
  } else if (stepType === "u") {
    nextStep = parseInt(numberPos) - 10;
    movePlayerKeyboard(nextStep);
  } else if (stepType === "l") {
    nextStep = parseInt(numberPos) - 1;
    movePlayerKeyboard(nextStep);
  } else if (stepType === "r") {
    nextStep = parseInt(numberPos) + 1;
    movePlayerKeyboard(nextStep);
  }
};

const movePlayerKeyboard = (step) => {
  // next col might not be in the grid cols, then use grid valuesto verify
  var value = gridValues.value.indexOf(step.toString());

  if (step.toString().length == 1) {
    step = `0${step}`;
    makeMove(step);
  } else {
    // check value
    if (value !== -1) {
      makeMove(step);
    }
  }
};

const handleArrowListener = (event) => {
  if (event.defaultPrevented) {
    return; // do nothing if the event was already processed
  }

  switch (event.key) {
    case "Down":
    case "ArrowDown":
      makeKeyboardMove("d");
      break;
    case "Up":
    case "ArrowUp":
      makeKeyboardMove("u");
      break;
    case "Left":
    case "ArrowLeft":
      makeKeyboardMove("l");
      break;
    case "Right":
    case "ArrowRight":
      makeKeyboardMove("r");
      break;
    default:
      return;
  }

  //  avoid being handled twice
  event.preventDefault();
};

const addEventListener = () => {
  window.addEventListener("keydown", handleArrowListener, true);
};

// set time used when counting
const setTimePassed = (value) => {
  timePassed.value = value;
};

const gameFinished = () => {
  const data = {
    foodEaten: foodEaten.value,
    totalFood: totalFoodGenerated.value,
    timeSpent: timePassed.value,
  };
  store.dispatch("gameFinished", data);
  router.replace({ name: "game.finished" });
};

//
watch(foodPositions.value, (food) => {
  // console.log(food);
  if (food.length <= 0) {
    gameFinished();
  }
});

// watch max moves
watch(
  totalMoves,
  (moves) => {
    if (moves === maxMoves.value) {
      gameOver();
    }
  },
  { immediate: true }
);

const gameOver = () => {
  const data = {
    foodEaten: foodEaten.value,
    totalFood: totalFoodGenerated.value,
    timeSpent: timePassed.value,
  };
  store.dispatch("gameFinished", data);
  router.replace({ name: "game.over" });
};

// device with detection
const adaptsToSize = () => {
  if (window.screen.width <= 640) {
    if (cols.value > 6) {
      colSize.width = "30px";
      colSize.height = "30px";
    }
  } else {
    colSize.width = "40px";
    colSize.height = "40px";
  }
};

window.addEventListener("resize", adaptsToSize);

onMounted(() => {
  adaptsToSize();
  // insert player
  insertPlayer();
  // calculate food
  calculateFoodPosition();
  //pagead2.googlesyndication.com/pagead/js/adsbygoogle.js

  // insert foods
  https: insertFoodsOnGrid();

  // key events
  addEventListener();

  // grid  values
  generateArrayValuesForGrid();
});

onBeforeRouteLeave(() => {
  // remove event listener
  window.removeEventListener("keydown", handleArrowListener, true);
  window.removeEventListener("resize", adaptsToSize);
});
</script>

<style scoped>
.card {
  background-color: #fff;
  /* width: 100%; */
}

.card .grids {
  border: 2px solid #853594;
}

.rows {
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
}

.cols {
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

/* @media (min-width: 640px) {
  cols
   width: 25px;
  height: 25px;

   height: 25px;
} */
</style>