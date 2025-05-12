import { ref } from 'vue';

// Interfaces
export interface ColorPreset {
  id: string; // Added id for unique key
  name: string;
  white: string;
  background: string;
}

export interface HorrorScenario {
  id: string;
  name: string;
  // Potentially add a function here to handle JS-based effects if needed
  // action?: () => void; 
  // clearAction?: () => void;
}

// Reactive State
export const selectedWhiteColor = ref('#FFFFFF');
export const selectedBackgroundColor = ref('#000000');
let gooeyDripsSVGElement: SVGElement | null = null; // For Gooey Drips

// Data
export const colorPresets = ref<ColorPreset[]>([
  { id: 'default', name: 'Default', white: '#FFFFFF', background: '#000000' },
  { id: 'darkGray', name: 'Dark Gray', white: '#E0E0E0', background: '#1A1A1A' },
  { id: 'lightBlue', name: 'Light Blue', white: '#E3F2FD', background: '#0D47A1' },
  { id: 'forestGreen', name: 'Forest Green', white: '#E8F5E9', background: '#1B5E20' },
  { id: 'purpleHaze', name: 'Purple Haze', white: '#E1BEE7', background: '#4A148C' },
  { id: 'sunsetOrange', name: 'Sunset Orange', white: '#FFECB3', background: '#E65100' },
  { id: 'oceanDeep', name: 'Ocean Deep', white: '#B2EBF2', background: '#006064' },
  { id: 'matrixGreen', name: 'Matrix Green', white: '#A5D6A7', background: '#003300' },
  { id: 'crimsonNight', name: 'Crimson Night', white: '#FFCDD2', background: '#B71C1C' },
  { id: 'peanut', name: 'Peanut', white: '#F5DEB3', background: '#A0522D' },
]);

export const allHorrorScenarios = ref<HorrorScenario[]>([
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

// Helper Functions (mostly for internal use by the service)
const updateDocumentColors = () => {
  document.documentElement.style.setProperty('--color-white', selectedWhiteColor.value);
  const hex = selectedWhiteColor.value.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  document.documentElement.style.setProperty('--color-white-rgb', `${r}, ${g}, ${b}`);
  document.documentElement.style.setProperty('--auth-background-color', selectedBackgroundColor.value);
};

// Gooey Drips JavaScript logic
const supportsES6 = () => {
  try {
    new Function('(a=0)=>a')();
    return true;
  } catch (n) { return false; }
};

const svgElements = [
  { ellipse: { id: 'drp13', fill: '#20923A', cx: '30.25%', cy: '-6%' }, animate: { rx: { values: '1.35%; 0.15%; 1.35%', dur: '6s' }, ry: { values: '-6%; 55%; -6%', dur: '6s' } } },
  { ellipse: { id: 'drp14', fill: '#8CBF40', cx: '30.7%', cy: '-6%' }, animate: { rx: { values: '1.125%; 0.2%; 1.125%;', dur: '5.5s' }, ry: { values: '-5%; 53%; -5%', dur: '5.5s' } } },
  { ellipse: { id: 'drp30', fill: '#084', cx: '45%', cy: '2%', rx: '13.25%' }, animate: { ry: { values: '-6%; 5%; -6%', dur: '5s' } } },
  { ellipse: { id: 'drp31', fill: '#294', cx: '34%', cy: '-6%' }, animate: { rx: { values: '1%; 4%; 1%', dur: '5s' }, ry: { values: '40%; 24%; 40%', dur: '5s' } } },
  { ellipse: { id: 'drp32', fill: '#3a3', cx: '39.15%', cy: '-6%' }, animate: { rx: { values: '1.5%; 4%; 1.5%', dur: '6s' }, ry: { values: '42%; 20%; 42%', dur: '6s' } } },
  { ellipse: { id: 'drp33', fill: '#084', cx: '42.8%', cy: '-6%' }, animate: { rx: { values: '1%; 3%; 1%', dur: '7s' }, ry: { values: '40%; 10%; 40%', dur: '7s' } } },
  { ellipse: { id: 'drp34', fill: '#294', cx: '48%', cy: '-6%' }, animate: { rx: { values: '5%; 1%; 5%;', dur: '5s' }, ry: { values: '0%; 19%; 0%', dur: '5s' } } },
  { ellipse: { id: 'drp34a', fill: '#393', cx: '51%', cy: '0%' }, animate: { rx: { values: '7%; 1.5%; 7%;', dur: '6s' }, ry: { values: '0%; 14%; 0%', dur: '6s' } } },
  { ellipse: { id: 'drp35', fill: '#494', cx: '56%', cy: '-6%' }, animate: { rx: { values: '5%; 1%; 5%', dur: '4s' }, ry: { values: '5%; 32%; 5%;', dur: '4s' } } },
  { ellipse: { id: 'drp36', fill: '#5a5', cx: '56.9%', cy: '-6%' }, animate: { rx: { values: '1.5%; .6%; 1.5%', dur: '6s' }, ry: { values: '15%; 35%; 15%;', dur: '6s' } } },
  { ellipse: { id: 'drp40', fill: '#084', cx: '63.4%', cy: '3%' }, animate: { rx: { values: '3%; 2.6%; 3%', dur: '5s' }, ry: { values: '5%; 10%; 5%;', dur: '5s' } } },
  { ellipse: { id: 'drp41', fill: '#494', cx: '62.5%', cy: '-6%' }, animate: { rx: { values: '0.5%; 1%; 0.5%;', dur: '6s' }, ry: { values: '60%; 16%; 60%', dur: '6s' } } },
  { ellipse: { id: 'drp42', fill: '#283', cx: '65.25%', cy: '0%' }, animate: { rx: { values: '0.5%; 1%; 0.5%;', dur: '5s' }, ry: { values: '40%; 10%; 40%', dur: '5s' } } }
];

const createGooeyDripsSVG = (): SVGElement | null => {
  if (!supportsES6() || document.documentElement.classList.contains('mobile')) {
    return null;
  }
  const svgClass = 'svg-drips';
  const groupId = 'gooeyDrips';

  const getNode = (nodeName: string, values: Record<string, string>): SVGElement | false => {
    if (!values || values === null) { return false; }
    const node = document.createElementNS('http://www.w3.org/2000/svg', nodeName);
    for (const property in values) {
      if (values[property] && values[property] !== '') {
        node.setAttributeNS(null, property, values[property]);
      }
    }
    return node as SVGElement;
  };

  const addAnimates = (element: SVGElement, el: any): SVGElement => {
    if (el.animate) {
      const animateNames = Object.keys(el.animate);
      for (const name of animateNames) {
        el.animate[name].attributeName = name;
        el.animate[name].repeatCount = 'indefinite';
        const animateNode = getNode('animate', el.animate[name]) as SVGElement;
        if (animateNode) element.appendChild(animateNode);
      }
    }
    return element;
  };

  const addElements = (svg: SVGElement, elementData: any[]): SVGElement => {
    const g = getNode('g', { id: groupId }) as SVGGElement;
    if (!g) return svg;

    for (const el of elementData) {
      const elName = Object.keys(el)[0];
      if (!elName) { continue; }
      let elementNode = getNode(elName, el[elName]) as SVGElement;
      if (!elementNode) continue;

      elementNode = addAnimates(elementNode, el);
      g.appendChild(elementNode);
    }
    svg.appendChild(g);
    return svg;
  };
  
  let svg = getNode('svg', { class: svgClass, focusable: 'false', role: 'presentational' }) as SVGElement;
  if (svg) {
    svg = addElements(svg, svgElements);
    return svg;
  }
  return null;
};

const manageGooeyDrips = (isActive: boolean) => {
  const heroContainer = document.querySelector('.auth-view .hero'); // Assuming .hero is inside .auth-view
  if (!heroContainer) return;

  if (isActive) {
    if (!gooeyDripsSVGElement) {
      gooeyDripsSVGElement = createGooeyDripsSVG();
    }
    if (gooeyDripsSVGElement && !heroContainer.contains(gooeyDripsSVGElement)) {
      heroContainer.appendChild(gooeyDripsSVGElement);
    }
    heroContainer.classList.add('active');
  } else {
    heroContainer.classList.remove('active');
    // Optionally remove the SVG element to save memory, or just hide via CSS
    // if (gooeyDripsSVGElement && heroContainer.contains(gooeyDripsSVGElement)) {
    //   heroContainer.removeChild(gooeyDripsSVGElement);
    //   gooeyDripsSVGElement = null;
    // }
  }
};


// Exported Functions
export const applyColorPreset = (presetId: string) => {
  const preset = colorPresets.value.find(p => p.id === presetId);
  if (preset) {
    selectedWhiteColor.value = preset.white;
    selectedBackgroundColor.value = preset.background;
    updateDocumentColors();
    clearAllEffects(); // Clear horror effects when a color preset is applied
  }
};

export const clearAllEffects = () => {
  const classesToRemove = allHorrorScenarios.value.map(s => `horror-${s.id}`);
  document.documentElement.classList.remove(...classesToRemove);
  
  // Removing direct style manipulation for animation and transform.
  // CSS classes should handle this.
  const authViewElement = document.querySelector('.auth-view') as HTMLElement;
  if (authViewElement) {
    authViewElement.style.animation = null as any; // Reset inline animation
    authViewElement.style.transform = null as any; // Reset inline transform
  }
  const logoElement = document.querySelector('.title') as HTMLElement; 
  if (logoElement) {
    logoElement.style.animation = null as any; // Reset inline animation
  }
  manageGooeyDrips(false); // Ensure Gooey Drips are cleared
  clearCrawlingSpiders(); // Clear any existing spiders
  // Add logic here to remove dynamically created elements for bats if any

  // Reset colors to default if they were changed by a horror scenario (e.g., bloodMoon)
  // This ensures that CSS-defined colors for other scenarios are not overridden
  // by previously JS-set colors.
  const defaultPreset = colorPresets.value.find(p => p.id === 'default');
  if (defaultPreset) {
    if (selectedWhiteColor.value !== defaultPreset.white || selectedBackgroundColor.value !== defaultPreset.background) {
      selectedWhiteColor.value = defaultPreset.white;
      selectedBackgroundColor.value = defaultPreset.background;
      updateDocumentColors();
    }
  }
};

export const applyHorrorScenario = (scenarioId: string) => {
  clearAllEffects(); 

  if (scenarioId === 'none') {
    const defaultPreset = colorPresets.value.find(p => p.id === 'default');
    if (defaultPreset) {
      applyColorPreset(defaultPreset.id);
    }
    return;
  }

  const scenario = allHorrorScenarios.value.find(s => s.id === scenarioId);
  if (!scenario) return;

  document.documentElement.classList.add(`horror-${scenario.id}`);

  // Special JS-based logic for specific scenarios
  if (scenarioId === 'bloodMoon') {
    selectedWhiteColor.value = '#FF4500'; 
    selectedBackgroundColor.value = '#3D0000'; 
    updateDocumentColors();
  } else if (scenarioId === 'gooeyDrips') {
    manageGooeyDrips(true);
  } else if (scenarioId === 'flyingBats') {
    // For flyingBats, CSS pseudo-elements are used for now.
    // JS logic could be added here to create multiple bat elements.
  } else if (scenarioId === 'crawlingSpiders') {
    createCrawlingSpiders(5); // Create 5 spiders
  }
  // Add JS logic for flyingBats if needed for dynamic element creation
};

const spiderElements: HTMLElement[] = [];

const createCrawlingSpiders = (count: number) => {
  const container = document.querySelector('.auth-card') || document.querySelector('.auth-view');
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const spider = document.createElement('div');
    spider.classList.add('crawling-spider');
    // Randomize animation duration and delay for variety
    spider.style.animationDuration = `${Math.random() * 5 + 10}s`; // 10-15 seconds
    spider.style.animationDelay = `${Math.random() * 5}s`; // 0-5 seconds delay
    // Randomize starting position slightly (left offset)
    spider.style.left = `${Math.random() * 80 + 10}%`; // 10% to 90%
    container.appendChild(spider);
  spiderElements.push(spider);
  }
};

const clearCrawlingSpiders = () => {
  spiderElements.forEach(spider => spider.remove());
  spiderElements.length = 0; // Clear the array
};


// Initialize colors on load (e.g., in App.vue or when this service is first imported)
// updateDocumentColors(); // Or call this from App.vue's onMounted
