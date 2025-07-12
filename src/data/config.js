// Game Configuration
export const gameSettings = {
  defaultVolume: 0.7,
  controlType: 'keyboard',
  difficultyLevels: ['easy', 'medium', 'hard'],
  scoreMultipliers: {
    easy: 1,
    medium: 1.5,
    hard: 2
  },
  physics: {
    gravity: 0.5,
    friction: 0.98,
    acceleration: 0.8,
    maxSpeed: 10,
    turnSpeed: 0.05
  }
};

// Avatar Configurations
export const avatars = [
  {
    id: 'male',
    name: 'Male Racer',
    image: './assets/avatars/male.svg',
    stats: { handling: 8, acceleration: 7 }
  },
  {
    id: 'female',
    name: 'Female Racer',
    image: './assets/avatars/female.svg',
    stats: { handling: 9, acceleration: 6 }
  },
  {
    id: 'others',
    name: 'Mystery Racer',
    image: './assets/avatars/others.svg',
    stats: { handling: 7, acceleration: 8 }
  }
];

export const cars = [
  {
    id: 'red',
    name: 'Red Thunder',
    image: './assets/cars/red.svg',
    stats: {
      speed: 9,
      acceleration: 8,
      handling: 7,
      durability: 6
    },
    description: 'High-speed performance car with excellent acceleration'
  },
  {
    id: 'blue',
    name: 'Blue Lightning',
    image: './assets/cars/blue.svg',
    stats: {
      speed: 7,
      acceleration: 7,
      handling: 9,
      durability: 7
    },
    description: 'Well-balanced car with superior handling'
  },
  {
    id: 'green',
    name: 'Green Machine',
    image: './assets/cars/green.svg',
    stats: {
      speed: 6,
      acceleration: 6,
      handling: 8,
      durability: 9
    },
    description: 'Durable car perfect for rough terrain'
  }
];

export const tracks = [
  {
    id: 'offroad',
    name: 'Dusty Trails',
    image: './assets/tracks/offroad.svg',
    difficulty: 'hard',
    length: 5000,
    obstacles: [
      { type: 'rock', frequency: 'high' },
      { type: 'mud', frequency: 'medium' },
      { type: 'jump', frequency: 'low' }
    ],
    description: 'Challenging off-road track with various natural obstacles'
  },
  {
    id: 'hill',
    name: 'Mountain Pass',
    image: './assets/tracks/hill.svg',
    difficulty: 'medium',
    length: 4000,
    obstacles: [
      { type: 'curve', frequency: 'high' },
      { type: 'slope', frequency: 'high' },
      { type: 'barrier', frequency: 'low' }
    ],
    description: 'Winding mountain track with steep climbs and descents'
  },
  {
    id: 'highway',
    name: 'Speed Lane',
    image: './assets/tracks/highway.svg',
    difficulty: 'easy',
    length: 6000,
    obstacles: [
      { type: 'traffic', frequency: 'medium' },
      { type: 'barrier', frequency: 'medium' },
      { type: 'oil', frequency: 'low' }
    ],
    description: 'Straight highway track focused on pure speed'
  }
];

// Sound Configurations
export const sounds = {
  engine: './assets/sounds/engine.mp3',
  crash: './assets/sounds/crash.mp3',
  victory: './assets/sounds/victory.mp3',
  background: './assets/sounds/bg-music.mp3'
};

// Control Configurations
export const controls = {
  keyboard: {
    accelerate: 'ArrowUp',
    brake: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    nitro: 'Space',
    pause: 'Escape'
  },
  touch: {
    enabled: true,
    sensitivity: 0.8
  }
};