<template>
  <span>{{ min + ":" + sec }}</span>
</template>

<script>
export default {
  emits: ["gameover"],
  props: {
    endDate: {
      // pass date object till when you want to run the timer
      type: Date,
      default() {
        return new Date();
      },
    },
    negative: {
      // optional, should countdown after 0 to negative
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      now: new Date(),
      timer: null,
    };
  },
  computed: {
    min() {
      var distance = this.endDate - this.now;
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      return m > 9 ? m : "0" + m;
    },
    sec() {
      var distance = this.endDate - this.now;
      let s = Math.floor((distance % (1000 * 60)) / 1000);
      return s > 9 ? s : "0" + s;
    },
  },
  watch: {
    endDate: {
      immediate: true,
      handler(newVal) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
          this.now = new Date();
          if (this.negative) return;
          if (this.now > newVal) {
            this.now = newVal;
            this.$emit("gameover");
            clearInterval(this.timer);
          }
        }, 1000);
      },
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>