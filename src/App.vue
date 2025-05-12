<script setup lang="ts">
import { ref } from 'vue';
import EffectMenu from './components/EffectMenu.vue'; // Changed from MyDevMenu to EffectMenu

const showUserDevMenu = ref(false); // Renamed to avoid confusion with EffectMenu

const toggleUserDevMenu = () => {
  showUserDevMenu.value = !showUserDevMenu.value;
};

// Determine if EffectMenu (the one for horror effects) should be shown
// This is usually based on import.meta.env.DEV, which is handled inside EffectMenu.vue
// So, we just need to include EffectMenu in the template.
</script>

<template>
  <div id="app-container">
    <!-- User's original Dev Menu for navigation -->
    <button @click="toggleUserDevMenu" class="dev-menu-toggle-button">
      {{ showUserDevMenu ? 'Hide Nav' : 'Show Nav' }}
    </button>
    <nav class="dev-menu" v-if="showUserDevMenu">
      <h3>Navigation Menu</h3>
      <ul>
        <li>
          <router-link to="/auth">Authentication View</router-link>
        </li>
        <!-- More links can be added here as new views/components are created -->
      </ul>
    </nav>
    
    <!-- Main content area -->
    <main class="content-area">
      <router-view />
    </main>
    
    <!-- Our new EffectMenu for horror effects -->
    <EffectMenu /> 
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #f0f0f0; 
  color: #333; 
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dev-menu-toggle-button {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1002; /* Above EffectMenu's toggle button */
  padding: 8px 12px;
  background-color: #42b983; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.dev-menu-toggle-button:hover {
  background-color: #36a476;
}

.dev-menu { /* This is the user's navigation dev menu */
  position: fixed; 
  top: 45px;      
  right: 10px;
  background-color: #333;
  color: white;
  padding: 15px; 
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25); 
  z-index: 1001; /* Above EffectMenu, below its own toggle */
  min-width: 200px; 
  text-align: left;
}

.dev-menu h3 {
  margin: 0 0 12px 0; 
  font-size: 1.1em; 
  border-bottom: 1px solid #444; 
  padding-bottom: 8px;
}

.dev-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; 
  gap: 8px; 
}

.dev-menu li {
  display: block; 
}

.dev-menu a {
  color: #42b983; 
  text-decoration: none;
  font-weight: bold;
}

.dev-menu a:hover,
.dev-menu a.router-link-exact-active {
  color: #50dd9a;
  text-decoration: underline;
}

.content-area {
  flex-grow: 1;
}
</style>
