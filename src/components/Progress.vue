<template>
  <div class="w-full flex items-center">
    <img src="/images/svg/life.svg" class="w-9 z-50" alt="Life" />
    <div class="progress w-16 h-3 -ml-2 flex">
      <div id="indicator" class="h-100 indicator"></div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["gameover", "timepassed"],
  props: {
    timeLimit: {
      type: Number,
    },
    negative: {
      // optional, should countdown after 0 to negative
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timer: null,
      width: "",
      timePassed: 0,
      timeLeft: 0,
    };
  },
  computed: {
    calculateTimeFraction() {
      return (this.timeLeft / this.timeLimit) * 100;
    },
  },
  watch: {
    timeLimit: {
      immediate: true,
      handler() {
        if (this.timer) {
          clearInterval(this.timer);
        }
        const timeLim = this.timeLimit;
        this.timer = setInterval(() => {
          this.timePassed = this.timePassed + 1;
          this.timeLeft = timeLim - this.timePassed;
          this.updateProgressColor();
          this.$emit("timepassed", this.timePassed);
          if (this.negative) return;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      },
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    updateProgressColor() {
      this.width = `${100 - this.calculateTimeFraction}%`;
      var element = document.getElementById("indicator");
      element.style.width = this.width;
    },
  },
};
</script>

<style scoped>
.progress {
  background: linear-gradient(180deg, #853594 47.39%, #692789 47.4%);
  border: 1px solid #532461;
  box-sizing: border-box;
  border-radius: 12px;
}

.progress .indicator {
  background: linear-gradient(180deg, #f07cc3 44.27%, #c5418e 44.28%);
  border: 1px solid #fffffd;
  box-sizing: border-box;
  border-radius: 11px;
  width: 0%;
  -webkit-transition: width 0.1s ease-in-out;
  -moz-transition: width 0.1s ease-in-out;
  -o-transition: width 0.1s ease-in-out;
  transition: width 0.1s ease-in-out;
}
</style>