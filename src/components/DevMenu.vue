<template>
  <div class="dev-menu-container" v-if="isDevMode">
    <button @click="toggleMenuContent" class="menu-toggle-button" :title="isContentVisible ? 'Hide Menu' : 'Show Menu'">
      <span v-if="!isContentVisible">🎨</span>
      <span v-else>&times;</span>
    </button>
    <div class="dev-menu-content" v-if="isContentVisible">
      <div class="menu-header">
        <h4>ფერების მენიუ</h4>
      </div>
      
      <div class="menu-section">
        <h5>ინდივიდუალური ფერები</h5>
        <div class="color-picker-group">
          <label for="white-color-picker">White Color:</label>
          <div class="quick-colors full-width-quick-colors">
            <span v-for="color in quickWhiteColors" :key="color" class="quick-color-swatch" :style="{ backgroundColor: color }" @click="setWhiteColor(color)"></span>
          </div>
          <input type="color" id="white-color-picker" v-model="selectedWhiteColor" @input="updateWhiteColor" />
        </div>
        <div class="color-picker-group">
          <label for="bg-color-picker">Auth Background:</label>
          <div class="quick-colors full-width-quick-colors">
            <span v-for="color in quickBgColors" :key="color" class="quick-color-swatch" :style="{ backgroundColor: color }" @click="setBgColor(color)"></span>
          </div>
          <input type="color" id="bg-color-picker" v-model="selectedBackgroundColor" @input="updateBackgroundColor" />
        </div>
      </div>

      <div class="menu-section presets-section">
        <h5>ფერთა გამები</h5>
        <div class="preset-buttons">
          <button v-for="preset in colorPresets" :key="preset.name" @click="applyPreset(preset)" class="preset-button">
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
import { ref, onMounted, computed } from 'vue';

const isDevMode = import.meta.env.DEV;
const selectedWhiteColor = ref('#FFFFFF'); 
const selectedBackgroundColor = ref('#000000'); 
const isContentVisible = ref(false); 

const quickWhiteColors = ref(['#FFFFFF', '#E0E0E0', '#BDBDBD', '#FFEB3B', '#81D4FA', '#C8E6C9', '#FFCDD2', '#E1BEE7']); 
const quickBgColors = ref(['#000000', '#121212', '#212121', '#303030', '#0D47A1', '#1B5E20', '#B71C1C', '#4A148C']);    

const setWhiteColor = (color: string) => {
  selectedWhiteColor.value = color;
  updateWhiteColor();
};

const setBgColor = (color: string) => {
  selectedBackgroundColor.value = color;
  updateBackgroundColor();
};

interface ColorPreset {
  name: string;
  white: string;
  background: string;
}

const colorPresets = ref<ColorPreset[]>([
  { name: 'Default', white: '#FFFFFF', background: '#000000' },
  { name: 'Dark Gray', white: '#E0E0E0', background: '#1A1A1A' },
  { name: 'Light Blue', white: '#E3F2FD', background: '#0D47A1' },
  { name: 'Forest Green', white: '#E8F5E9', background: '#1B5E20' },
  { name: 'Purple Haze', white: '#E1BEE7', background: '#4A148C' },
  { name: 'Sunset Orange', white: '#FFECB3', background: '#E65100' },
  { name: 'Ocean Deep', white: '#B2EBF2', background: '#006064' },  
  { name: 'Matrix Green', white: '#A5D6A7', background: '#003300' },
  { name: 'Crimson Night', white: '#FFCDD2', background: '#B71C1C' },
  { name: 'Peanut', white: '#F5DEB3', background: '#A0522D' },
]);

interface HorrorScenario {
  id: string;
  name: string;
}

const allHorrorScenarios = ref<HorrorScenario[]>([ 
  { id: 'flicker', name: 'მოციმციმე შუქი' },
  { id: 'bloodMoon', name: 'სისხლიანი მთვარე' },
  { id: 'lightning', name: 'ჭექა-ქუხილი' },
  { id: 'windowFlip', name: 'Flip ეკრანი' }, 
  { id: 'screenShake', name: 'ეკრანის რყევა' },
  { id: 'textBleed', name: 'ტექსტის გაწითლება' },
  { id: 'ghostText', name: 'მოჩვენებითი ტექსტი' },
  { id: 'heartbeat', name: 'გულისცემა' },
  { id: 'invertedColors', name: 'ინვერს. ფერები' },
  { id: 'improvedScreenShake', name: 'გაუმჯ. რყევა' },
  { id: 'staticNoise', name: 'სტატ. ხმაური' },
  { id: 'elementBlink', name: 'ლოგოს ციმციმი' },
  { id: 'psychedelicNightmare', name: 'ფსიქო-კოშმარი' },
  { id: 'ghostlyAssault', name: 'მოჩვენების თავდასხმა' },
  { id: 'distortedReality', name: 'დამახინჯ. რეალობა' },
  { id: 'apparitionSilhouette', name: 'მოჩვ. სილუეტი' },
  { id: 'bloodRain', name: 'სისხლ. წვიმა' },
  { id: 'hellPortal', name: 'ჯოჯოხ. პორტალი' },
  { id: 'brokenMirror', name: 'გატეხ. სარკე' },
  { id: 'paranormalInterference', name: 'პარანორმ. ჩარევა' },
  { id: 'rainbowNightmare', name: 'რეინბოუ კოშმარი' },
  { id: 'gooeyDrips', name: 'Gooey Drips' },
  { id: 'flyingBats', name: 'მფრ. ღამურები' },
  { id: 'crawlingSpiders', name: 'მცოც. ობობები' },
]);

const horrorScenarioPage = ref(0);
const horrorScenariosPerPage = 6; 

const paginatedHorrorScenarios = computed(() => {
  const start = horrorScenarioPage.value * horrorScenariosPerPage;
  const end = start + horrorScenariosPerPage;
  return allHorrorScenarios.value.slice(start, end); 
});

const totalHorrorScenarioPages = computed(() => {
  return Math.ceil(allHorrorScenarios.value.length / horrorScenariosPerPage); 
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


const applyPreset = (preset: ColorPreset) => {
  selectedWhiteColor.value = preset.white;
  selectedBackgroundColor.value = preset.background;
  updateWhiteColor();
  updateBackgroundColor();
  clearHorrorEffects(); 
};

const toggleMenuContent = () => {
  isContentVisible.value = !isContentVisible.value;
};

const applyHorrorScenario = (scenarioId: string) => {
  console.log('Applying horror scenario:', scenarioId);
  clearHorrorEffects(); 

  if (scenarioId === 'flicker') {
    document.documentElement.classList.add('horror-flicker');
  } else if (scenarioId === 'bloodMoon') {
    document.documentElement.classList.add('horror-blood-moon');
    selectedWhiteColor.value = '#FF4500'; 
    selectedBackgroundColor.value = '#3D0000'; 
  } else if (scenarioId === 'lightning') {
    document.documentElement.classList.add('horror-lightning');
  } else if (scenarioId === 'windowFlip') {
    const authViewElement = document.querySelector('.auth-view') as HTMLElement;
    if (authViewElement) {
      authViewElement.style.animation = 'none'; 
      authViewElement.style.transform = ''; 
      void authViewElement.offsetWidth;
      document.documentElement.classList.add('horror-window-flip');
      authViewElement.style.animation = 'window-flip 0.7s ease-in-out';
    } else {
      document.documentElement.classList.add('horror-window-flip'); 
    }
  } else if (scenarioId === 'screenShake') {
    document.documentElement.classList.add('horror-screen-shake');
  } else if (scenarioId === 'textBleed') {
    document.documentElement.classList.add('horror-text-bleed');
  } else if (scenarioId === 'ghostText') {
    document.documentElement.classList.add('horror-ghost-text');
  } else if (scenarioId === 'heartbeat') {
    document.documentElement.classList.add('horror-heartbeat');
  } else if (scenarioId === 'invertedColors') {
    document.documentElement.classList.add('horror-inverted-colors');
  } else if (scenarioId === 'improvedScreenShake') {
    const authViewElement = document.querySelector('.auth-view') as HTMLElement;
    if (authViewElement) {
      authViewElement.style.animation = 'none';
      void authViewElement.offsetWidth; 
      document.documentElement.classList.add('horror-improved-screen-shake');
      authViewElement.style.animation = 'improved-screen-shake 0.5s linear infinite';
    } else {
      document.documentElement.classList.add('horror-improved-screen-shake'); 
    }
  } else if (scenarioId === 'staticNoise') {
    document.documentElement.classList.add('horror-static-noise');
  } else if (scenarioId === 'elementBlink') {
    const logoElement = document.querySelector('.title') as HTMLElement;
    if (logoElement) {
      logoElement.style.animation = 'none'; 
      requestAnimationFrame(() => { 
        requestAnimationFrame(() => { 
          logoElement.style.animation = 'element-true-blink-effect 2s infinite steps(1, end)'; 
        });
      });
    }
  } else if (scenarioId === 'psychedelicNightmare') {
    document.documentElement.classList.add('horror-psychedelic-nightmare');
  } else if (scenarioId === 'ghostlyAssault') {
    document.documentElement.classList.add('horror-ghostly-assault');
  } else if (scenarioId === 'distortedReality') {
    document.documentElement.classList.add('horror-distorted-reality');
  } else if (scenarioId === 'apparitionSilhouette') {
    document.documentElement.classList.add('horror-apparition-silhouette');
  } else if (scenarioId === 'bloodRain') {
    document.documentElement.classList.add('horror-blood-rain');
  } else if (scenarioId === 'hellPortal') {
    document.documentElement.classList.add('horror-hell-portal');
  } else if (scenarioId === 'brokenMirror') {
    document.documentElement.classList.add('horror-broken-mirror');
  } else if (scenarioId === 'paranormalInterference') {
    document.documentElement.classList.add('horror-paranormal-interference');
  } else if (scenarioId === 'rainbowNightmare') {
    document.documentElement.classList.add('horror-rainbow-nightmare');
  } else if (scenarioId === 'gooeyDrips') {
    document.documentElement.classList.add('horror-gooey-drips'); 
  } else if (scenarioId === 'flyingBats') {
    document.documentElement.classList.add('horror-flying-bats');
  } else if (scenarioId === 'crawlingSpiders') {
    document.documentElement.classList.add('horror-crawling-spiders');
  } else if (scenarioId === 'none') { 
    document.documentElement.classList.remove('horror-gooey-drips'); 
    const defaultPreset = colorPresets.value.find(p => p.name === 'Default');
    if (defaultPreset) {
      applyPreset(defaultPreset);
    }
  }
  updateWhiteColor();
  updateBackgroundColor();
};

const clearHorrorEffects = () => {
  document.documentElement.classList.remove(
    'horror-flicker', 
    'horror-blood-moon', 
    'horror-lightning', 
    'horror-window-flip',
    'horror-screen-shake',
    'horror-text-bleed',
    'horror-ghost-text',
    'horror-heartbeat',
    'horror-inverted-colors',
    'horror-improved-screen-shake',
    'horror-static-noise',
    'horror-psychedelic-nightmare',
    'horror-ghostly-assault',
    'horror-distorted-reality',
    'horror-apparition-silhouette',
    'horror-blood-rain',
    'horror-hell-portal',
    'horror-broken-mirror',
    'horror-paranormal-interference',
    'horror-rainbow-nightmare',
    'horror-gooey-drips',
    'horror-flying-bats',
    'horror-crawling-spiders'
  );
  const authViewElement = document.querySelector('.auth-view') as HTMLElement;
  if (authViewElement) {
    authViewElement.style.animation = 'none'; 
    authViewElement.style.transform = ''; 
  }
  const logoElement = document.querySelector('.title') as HTMLElement; 
  if (logoElement) {
    logoElement.style.animation = 'none'; 
  }
};

const updateWhiteColor = () => {
  const newColor = selectedWhiteColor.value;
  document.documentElement.style.setProperty('--color-white', newColor);
  const hex = newColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  document.documentElement.style.setProperty('--color-white-rgb', `${r}, ${g}, ${b}`);
};

const updateBackgroundColor = () => {
  document.documentElement.style.setProperty('--auth-background-color', selectedBackgroundColor.value);
};

onMounted(() => {
  const rootStyle = getComputedStyle(document.documentElement);
  const currentWhiteHex = rootStyle.getPropertyValue('--color-white').trim();
  if (currentWhiteHex) {
    selectedWhiteColor.value = currentWhiteHex;
    const currentWhiteRgb = rootStyle.getPropertyValue('--color-white-rgb').trim();
    if (!currentWhiteRgb) {
      const hex = currentWhiteHex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      document.documentElement.style.setProperty('--color-white-rgb', `${r}, ${g}, ${b}`);
    }
  } else {
    updateWhiteColor();
  }

  const currentAuthBg = rootStyle.getPropertyValue('--auth-background-color').trim();
  if (currentAuthBg) {
    selectedBackgroundColor.value = currentAuthBg;
  } else {
    updateBackgroundColor();
  }
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
