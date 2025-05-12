import { createApp } from 'vue'
import './normalize.css' // Added Normalize.css
import './main.scss' // Main styles
import App from './App.vue'
import router from './router' // Import the router

createApp(App).use(router).mount('#app') // Use the router
