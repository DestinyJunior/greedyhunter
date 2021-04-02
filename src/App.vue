<template>
  <router-view v-slot="{ Component }">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
console.log(`
  ||||||||||||||||||||||||||||||||

      WELCOME TO GREEDY HUNTER

  ||||||||||||||||||||||||||||||||
  `);
</script>