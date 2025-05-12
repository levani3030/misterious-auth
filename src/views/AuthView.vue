<template>
  <div class="auth-view">
    <div class="hero"> 
      <!-- SVG drips will be injected here by effectsService.ts -->
    </div>
    <div class="auth-card-wrapper"> 
        <MainAuthForm 
          v-if="currentView === 'main'"
          @showForgotPasswordView="showForgotPasswordView"
        />
        <ForgotPasswordForm 
          v-if="currentView === 'forgot'"
        @showMainAuthView="showMainAuthView" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Removed onMounted, watchEffect, onUnmounted as GooeyDrips logic is now in service
import MainAuthForm from '../components/auth/MainAuthForm.vue';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm.vue';

const currentView = ref<'main' | 'forgot'>('main');

const showForgotPasswordView = () => {
  currentView.value = 'forgot';
};

const showMainAuthView = () => {
  currentView.value = 'main';
};

// All GooeyDrips related JavaScript (supportsES6, svgElements, createGooeyDripsSVG, manageGooeyDrips, observer)
// has been moved to effectsService.ts
</script>

<style scoped>
@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 5px) rotate(-1deg); }
  20%, 40%, 60%, 80% { transform: translate(5px, -5px) rotate(1deg); }
}

:global(html.horror-screen-shake .auth-card-wrapper) {
  animation: screen-shake 0.3s linear infinite !important;
  will-change: transform;
  perspective: 1000px; /* For better 3D effect */
}

.auth-view {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--auth-background-color); 
  padding: 20px; 
  box-sizing: border-box;
  position: relative; 
}

.hero { 
  width: 100%;
  height: 100px; 
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 5; 
  pointer-events: none; 
  display: none; /* Hidden by default, shown by horror-gooey-drips class */
}

/* effectsService will add 'horror-gooey-drips' to html and 'active' to .hero */
:global(html.horror-gooey-drips .auth-view .hero.active) {
  display: block !important;
}


.auth-card-wrapper {
  width: 100%;
  max-width: 560px; 
  display: flex;
  justify-content: center;
  z-index: 10; 
  position: relative; 
}

</style>
