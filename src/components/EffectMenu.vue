<template>
  <div class="dev-menu-container" v-if="isDevMode">
    <button @click="toggleMenuContent" class="menu-toggle-button" :title="isContentVisible ? 'Hide Menu' : 'Show Menu'">
      <span v-if="!isContentVisible">🎨</span>
      <span v-else>&times;</span>
    </button>
    <div class="dev-menu-content" v-if="isContentVisible">
      <div class="menu-header">
        <h4>Effects Menu</h4>
      </div>
      
      <div class="menu-section">
        <h5>ინდივიდუალური ფერები</h5>
        <div class="color-picker-group">
          <label for="white-color-picker">White Color:</label>
          <div class="quick-colors full-width-quick-colors">
            <span v-for="color in quickWhiteColors" :key="color" class="quick-color-swatch" :style="{ backgroundColor: color }" @click="setWhiteColor(color)"></span>
          </div>
          <input type="color" id="white-color-picker" v-model="sWhiteColor" @input="handleWhiteColorInput" />
        </div>
        <div class="color-picker-group">
          <label for="bg-color-picker">Auth Background:</label>
          <div class="quick-colors full-width-quick-colors">
            <span v-for="color in quickBgColors" :key="color" class="quick-color-swatch" :style="{ backgroundColor: color }" @click="setBgColor(color)"></span>
          </div>
          <input type="color" id="bg-color-picker" v-model="sBackgroundColor" @input="handleBgColorInput" />
        </div>
      </div>

      <div class="menu-section presets-section">
        <h5>ფერთა გამები</h5>
        <div class="preset-buttons">
          <button v-for="preset in localColorPresets" :key="preset.id" @click="applyColorPreset(preset.id)" class="preset-button">
            <div class="preset-color-indicators">
              <span class="color-indicator" :style="{ backgroundColor: preset.white }"></span>
              <span class="color-indicator" :style="{ backgroundColor: preset.background }"></span>
            </div>
            {{ preset.name }}
          </button>
        </div>
      </div>

      <div class="menu-section horror-scenarios-section">
        <h5>საშიში სცენარები (გვერდი {{ horrorScenarioPage + 1 }})</h5>
        <div class="preset-buttons horror-preset-buttons">
          <button v-for="scenario in paginatedHorrorScenarios" :key="scenario.id" @click="applyHorrorScenario(scenario.id)" class="preset-button horror-button">
            {{ scenario.name }}
          </button>
        </div>
        <div class="pagination-controls">
          <button @click="prevHorrorPage" :disabled="horrorScenarioPage === 0" title="წინა">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span>{{ horrorScenarioPage + 1 }} / {{ totalHorrorScenarioPages }}</span>
          <button @click="applyHorrorScenario('none')" class="preset-button clear-horror-button" title="გასუფთავება">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </button>
          <button @click="nextHorrorPage" :disabled="horrorScenarioPage === totalHorrorScenarioPages - 1" title="შემდეგი">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { 
  selectedWhiteColor as sWhiteColor, 
  selectedBackgroundColor as sBackgroundColor, 
  colorPresets as serviceColorPresets,
  allHorrorScenarios as serviceHorrorScenarios,
  applyColorPreset,
  applyHorrorScenario,
  // updateDocumentColors, // This is internal to service now
} from '@/services/effectsService';

const isDevMode = import.meta.env.DEV;
const isContentVisible = ref(false); 

// Local refs for quick colors, as they are UI specific for this menu
const quickWhiteColors = ref(['#FFFFFF', '#E0E0E0', '#BDBDBD', '#FFEB3B', '#81D4FA', '#C8E6C9', '#FFCDD2', '#E1BEE7']);
const quickBgColors = ref(['#000000', '#121212', '#212121', '#303030', '#0D47A1', '#1B5E20', '#B71C1C', '#4A148C']);    

// Use computed properties or direct refs from service for presets and scenarios
const localColorPresets = computed(() => serviceColorPresets.value);
const localAllHorrorScenarios = computed(() => serviceHorrorScenarios.value);


const setWhiteColor = (color: string) => {
  sWhiteColor.value = color; // This will trigger the watch in service if it's set up, or call update directly
  // updateDocumentColors(); // Call service function if needed, or let service handle it via watch
};

const setBgColor = (color: string) => {
  sBackgroundColor.value = color;
  // updateDocumentColors();
};

const handleWhiteColorInput = (event: Event) => {
  sWhiteColor.value = (event.target as HTMLInputElement).value;
  // updateDocumentColors();
};

const handleBgColorInput = (event: Event) => {
  sBackgroundColor.value = (event.target as HTMLInputElement).value;
  // updateDocumentColors();
};


const horrorScenarioPage = ref(0);
const horrorScenariosPerPage = 6; 

const paginatedHorrorScenarios = computed(() => {
  const start = horrorScenarioPage.value * horrorScenariosPerPage;
  const end = start + horrorScenariosPerPage;
  return localAllHorrorScenarios.value.slice(start, end); 
});

const totalHorrorScenarioPages = computed(() => {
  return Math.ceil(localAllHorrorScenarios.value.length / horrorScenariosPerPage); 
});

const prevHorrorPage = () => {
  if (horrorScenarioPage.value > 0) {
    horrorScenarioPage.value--;
  }
};

const nextHorrorPage = () => {
  if (horrorScenarioPage.value < totalHorrorScenarioPages.value - 1) {
    horrorScenarioPage.value++;
  }
};

const toggleMenuContent = () => {
  isContentVisible.value = !isContentVisible.value;
};

// Watch for changes in service's selected colors to update local input pickers if needed
// This might not be necessary if v-model on input directly uses service refs
watch(sWhiteColor, (_) => {
  // If local ref for input was different, update it: localSelectedWhite.value = newValue;
});
watch(sBackgroundColor, (_) => {
  // localSelectedBackground.value = newValue;
});


onMounted(() => {
  // Initial color setup is now handled by the service or App.vue
  // updateDocumentColors(); 
});
</script>

<style scoped>
.dev-menu-container {
  position: fixed;
  bottom: 20px;
  right: 20px; 
  z-index: 1000;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column; 
  align-items: flex-end; 
}

.menu-toggle-button {
  background-color: #333;
  color: white;
  border: 1px solid #555;
  width: 40px;
  height: 40px;
  border-radius: 50%; 
  cursor: pointer;
  font-size: 20px; 
  line-height: 1;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}
.menu-toggle-button:hover {
  background-color: #444;
}

.dev-menu-content {
  width: 320px; 
  background-color: rgba(30, 30, 30, 0.98); 
  color: white;
  padding: 15px;
  border-radius: 8px; 
  box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 15px; 
  margin-top: 10px; 
  border: 1px solid #444; 
}

.menu-section + .menu-section { 
  border-top: 1px solid #484848; 
  padding-top: 12px; 
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
}

.menu-header h4 {
  margin: 0;
  font-size: 18px;
}

.menu-section h5 {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px; 
  color: #eee; 
  text-transform: uppercase;
  letter-spacing: 0.8px; 
  font-weight: bold;
}

.color-picker-group {
  display: flex;
  align-items: center;
  gap: 8px; 
  margin-bottom: 10px; 
  flex-wrap: nowrap; 
}

.color-picker-group label {
  font-size: 13px;
  white-space: nowrap; 
}

.quick-colors {
  display: flex;
  flex-wrap: wrap; 
  gap: 4px; 
  margin-left: 8px; 
  margin-right: 8px; 
  flex-grow: 1; 
  justify-content: flex-start;
}
.full-width-quick-colors {
  width: calc(100% - 80px); 
}


.quick-color-swatch {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid #777;
  cursor: pointer;
  transition: transform 0.1s ease;
}
.quick-color-swatch:hover {
  transform: scale(1.1);
}

.color-picker-group input[type="color"] {
  width: 35px; 
  height: 25px; 
  border: 1px solid #555;
  border-radius: 4px;
  cursor: pointer;
  background: none; 
  margin-left: auto; 
}
.presets-section {
}
.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px; 
}
.preset-button {
  background-color: #4a4a4a; 
  color: white;
  border: 1px solid #666;
  padding: 6px 8px; 
  border-radius: 5px; 
  cursor: pointer;
  font-size: 11px; 
  transition: background-color 0.2s ease, transform 0.1s ease;
  text-align: center;
  flex-basis: calc(48% - 4px); 
  box-sizing: border-box;
  min-height: 38px; 
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 4px; 
}
.horror-preset-buttons .preset-button { 
 flex-basis: calc(33.333% - 4px);
}


.preset-color-indicators {
  display: flex;
  gap: 3px;
}
.color-indicator {
  width: 10px;
  height: 10px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 2px;
}

.preset-button:hover {
  background-color: #5a5a5a;
  transform: translateY(-1px); 
}
.preset-button:active {
  transform: translateY(0px); 
}

.horror-button {
  background-color: #6d2b2b; 
  border-color: #8d4b4b;
  font-size: 10px; 
}
.horror-button:hover {
  background-color: #7f3333;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px; 
  padding-top: 10px;
  border-top: 1px solid #484848;
}
.pagination-controls button {
  background-color: transparent; 
  color: #ccc;
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination-controls button:hover {
  color: white;
  background-color: #4a4a4a;
}
.pagination-controls button:disabled {
  color: #555;
  cursor: not-allowed;
  background-color: transparent;
}
.pagination-controls button svg {
  width: 18px; 
  height: 18px;
}
.pagination-controls span {
  font-size: 13px;
  color: #aaa;
}
.clear-horror-button {
}
</style>
