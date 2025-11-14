// Pokémon data with names and types
const pokemonData = {
  q: { name: 'Pikachu', type: 'electric' },
  w: { name: 'Charizard', type: 'fire' },
  e: { name: 'Blastoise', type: 'water' },
  r: { name: 'Venusaur', type: 'grass' },
  t: { name: 'Gyarados', type: 'water' },
  y: { name: 'Dragonite', type: 'dragon' },
  u: { name: 'Articuno', type: 'ice' },
  i: { name: 'Zapdos', type: 'electric' },
  o: { name: 'Moltres', type: 'fire' },
  p: { name: 'Mewtwo', type: 'psychic' },
  a: { name: 'Bulbasaur', type: 'grass' },
  s: { name: 'Squirtle', type: 'water' },
  d: { name: 'Charmander', type: 'fire' },
  f: { name: 'Psyduck', type: 'psychic' },
  g: { name: 'Golduck', type: 'water' },
  h: { name: 'Mankey', type: 'fighting' },
  j: { name: 'Primeape', type: 'fighting' },
  k: { name: 'Growlithe', type: 'fire' },
  l: { name: 'Arcanine', type: 'fire' },
  z: { name: 'Lapras', type: 'water' },
  x: { name: 'Shellder', type: 'water' },
  c: { name: 'Cloyster', type: 'water' },
  v: { name: 'Slowbro', type: 'psychic' },
  b: { name: 'Seel', type: 'water' },
  n: { name: 'Dewgong', type: 'ice' },
  m: { name: 'Snorlax', type: 'normal' }
};

// Get all keyboard keys
const keys = document.querySelectorAll('.key');
const enableAudioBtn = document.getElementById('enable-audio');

// Shared AudioContext
let audioContext = null;
function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log('AudioContext created, state:', audioContext.state);
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('AudioContext resumed successfully');
    }).catch(err => {
      console.error('Failed to resume AudioContext:', err);
    });
  }
  return audioContext;
}

if (enableAudioBtn) {
  enableAudioBtn.addEventListener('click', () => {
    const ctx = ensureAudioContext();
    console.log('Enable Audio clicked, context state:', ctx.state);
    enableAudioBtn.textContent = 'Audio Enabled ✓';
  });
}

// Pokémon cry URLs from PokeAPI
const pokemonCries = {
  q: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg', // Pikachu
  w: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/6.ogg', // Charizard
  e: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/9.ogg', // Blastoise
  r: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/3.ogg', // Venusaur
  t: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/130.ogg', // Gyarados
  y: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/149.ogg', // Dragonite
  u: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/144.ogg', // Articuno
  i: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/145.ogg', // Zapdos
  o: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/146.ogg', // Moltres
  p: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/150.ogg', // Mewtwo
  a: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg', // Bulbasaur
  s: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/7.ogg', // Squirtle
  d: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/4.ogg', // Charmander
  f: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/54.ogg', // Psyduck
  g: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/55.ogg', // Golduck
  h: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/56.ogg', // Mankey
  j: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/57.ogg', // Primeape
  k: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/58.ogg', // Growlithe
  l: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/59.ogg', // Arcanine
  z: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/131.ogg', // Lapras
  x: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/90.ogg', // Shellder
  c: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/91.ogg', // Cloyster
  v: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/80.ogg', // Slowbro
  b: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/86.ogg', // Seel
  n: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/87.ogg', // Dewgong
  m: 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/143.ogg' // Snorlax
};

// Cache for loaded audio
const audioCache = {};

async function playSound(key) {
  const ctx = ensureAudioContext();

  if (ctx.state === 'suspended') {
    ctx.resume().catch(e => console.error('Failed to resume:', e));
  }

  const cryUrl = pokemonCries[key];
  if (!cryUrl) return;

  try {
    let audio = audioCache[key];
    if (!audio) {
      audio = new Audio(cryUrl);
      audioCache[key] = audio;
    }

    // Reset and play
    audio.currentTime = 0;
    audio.volume = 0.6;
    await audio.play();

    // For Pikachu, add lightning sound effect
    if (key === 'q') {
      playLightningSound(ctx);
    }
  } catch (error) {
    console.error('Failed to play Pokémon cry:', error);
    // Fallback to synthetic sound if cry fails to load
    playSyntheticSound(key, ctx);
  }
}

// Fallback synthetic sound function
function playSyntheticSound(key, ctx) {
  const pattern = {
    q: [{ freq: 350, endFreq: 900, duration: 0.15, volume: 0.5 }, { freq: 900, endFreq: 500, duration: 0.15, volume: 0.4 }],
    w: [{ freq: 180, endFreq: 150, duration: 0.3, volume: 0.5 }, { freq: 280, endFreq: 220, duration: 0.25, volume: 0.35 }],
    // Add other patterns as needed...
  }[key];

  if (!pattern) return;

  const now = ctx.currentTime;
  let timeOffset = 0;

  pattern.forEach((note) => {
    const startTime = now + timeOffset;
    const { freq, endFreq, duration, volume } = note;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration * 0.85);

    const gain = ctx.createGain();
    const eps = 0.00001;
    gain.gain.setValueAtTime(eps, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + duration * 0.08);
    gain.gain.setValueAtTime(volume, startTime + duration * 0.75);
    gain.gain.linearRampToValueAtTime(eps, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);

    timeOffset += duration + 0.06;
  });
}

// Lightning sound effect for Pikachu
function playLightningSound(ctx) {
  const now = ctx.currentTime;

  // Thunder crack
  const crackOsc = ctx.createOscillator();
  crackOsc.type = 'sawtooth';
  crackOsc.frequency.setValueAtTime(200, now);
  crackOsc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(0.3, now);
  crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  crackOsc.connect(crackGain);
  crackGain.connect(ctx.destination);
  crackOsc.start(now);
  crackOsc.stop(now + 0.1);

  // Electric buzz
  setTimeout(() => {
    const buzzOsc = ctx.createOscillator();
    buzzOsc.type = 'square';
    buzzOsc.frequency.setValueAtTime(800, now + 0.1);

    const buzzGain = ctx.createGain();
    buzzGain.gain.setValueAtTime(0.2, now + 0.1);
    buzzGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    buzzOsc.connect(buzzGain);
    buzzGain.connect(ctx.destination);
    buzzOsc.start(now + 0.1);
    buzzOsc.stop(now + 0.3);
  }, 100);
}

// Elemental animation
function createElementalAnimation(element, type) {
  if (type === 'electric') {
    // Enhanced lightning animation for Pikachu
    const cloud = document.createElement('div');
    cloud.className = 'thunder-cloud';
    element.appendChild(cloud);

    // More bolts for spectacular effect
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const bolt = document.createElement('div');
        bolt.className = 'thunder-bolt';
        bolt.style.left = (20 + i * 15) + '%';
        element.appendChild(bolt);
        setTimeout(() => bolt.remove(), 600);
      }, i * 80);
    }

    // Multiple flashes
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const flash = document.createElement('div');
        flash.className = 'light-flash';
        element.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
      }, i * 150);
    }

    // Electric sparks
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const spark = document.createElement('div');
        spark.className = 'electric-spark';
        spark.style.left = (10 + Math.random() * 80) + '%';
        spark.style.top = (10 + Math.random() * 80) + '%';
        element.appendChild(spark);
        setTimeout(() => spark.remove(), 400);
      }, i * 50);
    }

    setTimeout(() => {
      cloud.remove();
    }, 1200);
  } else {
    const emojis = {
      fire: '🔥',
      water: '💧',
      grass: '🌿',
      ice: '❄️',
      dragon: '🐉',
      psychic: '✨',
      fighting: '💪',
      normal: '⭐'
    };

    const emoji = emojis[type] || '⭐';
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let idx = 0; idx < 4; idx++) {
      const div = document.createElement('div');
      div.className = 'particle';
      div.textContent = emoji;
      div.style.left = x + 'px';
      div.style.top = y + 'px';
      div.style.fontSize = '20px';
      div.style.pointerEvents = 'none';

      const angle = (idx / 4) * Math.PI * 2;
      const distance = 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 80;

      div.style.animation = `particle-burst 0.8s ease-out forwards`;
      div.style.setProperty('--tx', tx + 'px');
      div.style.setProperty('--ty', ty + 'px');

      document.body.appendChild(div);
      setTimeout(() => div.remove(), 800);
    }
  }
}

// Key press handler
function handleKeyPress(key) {
  const keyElement = document.querySelector(`[data-key="${key.toLowerCase()}"]`);
  if (!keyElement) return;

  keyElement.classList.add('active');
  setTimeout(() => keyElement.classList.remove('active'), 100);

  const pokemon = pokemonData[key.toLowerCase()];
  if (pokemon) {
    createElementalAnimation(keyElement, pokemon.type);
    playSound(key.toLowerCase());
  }
}

// Click listeners
keys.forEach(key => {
  key.addEventListener('click', () => {
    handleKeyPress(key.dataset.key);
  });
});

// Keyboard listeners
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (pokemonData[key]) {
    handleKeyPress(key);
  }
});

// Load Pokémon images
function loadPokemonImages() {
  keys.forEach(key => {
    const pokemonName = key.dataset.pokemon;
    if (pokemonName) {
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(pokemonName)}.png`;

      // Create image element for better loading handling
      const img = new Image();
      img.onload = () => {
        key.style.backgroundImage = `url('${spriteUrl}')`;
        key.style.backgroundSize = 'contain';
        key.style.backgroundRepeat = 'no-repeat';
        key.style.backgroundPosition = 'center';
        key.classList.add('pokemon-loaded');
      };
      img.onerror = () => {
        // Fallback to text if image fails to load
        key.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        key.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      };
      img.src = spriteUrl;
    }
  });
}

// Pokémon ID lookup
function getPokemonId(name) {
  const ids = {
    'pikachu': 25, 'charizard': 6, 'blastoise': 9, 'venusaur': 3,
    'gyarados': 130, 'dragonite': 149, 'articuno': 144, 'zapdos': 145,
    'moltres': 146, 'mewtwo': 150, 'bulbasaur': 1, 'squirtle': 7,
    'charmander': 4, 'psyduck': 54, 'golduck': 55, 'mankey': 56,
    'primeape': 57, 'growlithe': 58, 'arcanine': 59, 'lapras': 131,
    'shellder': 90, 'cloyster': 91, 'slowbro': 80, 'seel': 86,
    'dewgong': 87, 'snorlax': 143
  };
  return ids[name.toLowerCase()] || 25;
}

window.addEventListener('load', loadPokemonImages);
