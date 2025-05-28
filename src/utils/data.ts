export interface Car {
  id: string;
  name: string;
  model: string;
  category: string;
  price: number;
  year: number;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    fuelType: string;
    fuelConsumption: string;
  };
  images: {
    main: string;
    gallery: string[];
  };
  colors: {
    name: string;
    code: string;
  }[];
}

export const carCategories = [
  { id: 'sedan', name: 'Sedans', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'suv', name: 'SUVs', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'coupe', name: 'Coupes', image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'convertible', name: 'Convertibles', image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'electric', name: 'Electric', image: 'https://images.pexels.com/photos/7567560/pexels-photo-7567560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'amg', name: 'Performance', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
];

export const carsData: Car[] = [
  {
    id: 'sclass-2023',
    name: 'S-Class',
    model: 'S 500',
    category: 'sedan',
    price: 110000,
    year: 2023,
    description: 'The epitome of luxury and innovation. The S-Class combines cutting-edge technology with exceptional comfort to create an unparalleled driving experience.',
    features: [
      'MBUX Infotainment System',
      'Burmester® 4D Surround Sound',
      'Active Ambient Lighting',
      'Augmented Reality Navigation',
      'Rear-seat Entertainment',
      'Executive Rear Seats',
      'Air Balance Package'
    ],
    specifications: {
      engine: '3.0L Inline-6 Turbo with EQ Boost',
      power: '429 hp',
      acceleration: '0-60 mph in 4.8 seconds',
      topSpeed: '130 mph (electronically limited)',
      transmission: '9G-TRONIC automatic',
      fuelType: 'Premium Gasoline',
      fuelConsumption: '22 mpg combined'
    },
    images: {
      main: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    colors: [
      { name: 'Obsidian Black', code: '#000000' },
      { name: 'Selenite Grey', code: '#7B7B7B' },
      { name: 'Designo Diamond White', code: '#F2F3F3' },
      { name: 'Emerald Green', code: '#1A4D3B' }
    ]
  },
  {
    id: 'gls-2023',
    name: 'GLS',
    model: 'GLS 450',
    category: 'suv',
    price: 95000,
    year: 2023,
    description: 'The pinnacle of SUV luxury with spacious seven-passenger seating and commanding performance. The GLS delivers exceptional comfort for all passengers.',
    features: [
      'E-ACTIVE BODY CONTROL',
      'MBUX Infotainment System',
      'Heated and Ventilated Seats',
      'Panoramic Sunroof',
      'Driver Assistance Package',
      'Burmester® Surround Sound',
      'Five-zone Climate Control'
    ],
    specifications: {
      engine: '3.0L Inline-6 Turbo with EQ Boost',
      power: '362 hp',
      acceleration: '0-60 mph in 5.9 seconds',
      topSpeed: '130 mph (electronically limited)',
      transmission: '9G-TRONIC automatic',
      fuelType: 'Premium Gasoline',
      fuelConsumption: '20 mpg combined'
    },
    images: {
      main: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/2536607/pexels-photo-2536607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3786235/pexels-photo-3786235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3762442/pexels-photo-3762442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    colors: [
      { name: 'Lunar Blue', code: '#374C6F' },
      { name: 'Obsidian Black', code: '#000000' },
      { name: 'Mojave Silver', code: '#C0C0C0' },
      { name: 'Cardinal Red', code: '#B22222' }
    ]
  },
  {
    id: 'amg-gt-2023',
    name: 'AMG GT',
    model: 'GT 63',
    category: 'coupe',
    price: 140000,
    year: 2023,
    description: 'A true performance machine with the heart and soul of a racecar. The AMG GT combines breathtaking design with exhilarating performance.',
    features: [
      'AMG Performance 4MATIC+',
      'AMG SPEEDSHIFT MCT 9-speed',
      'AMG RIDE CONTROL+',
      'AMG Performance Steering Wheel',
      'AMG Track Pace',
      'Burmester® High-End Surround Sound',
      'AMG Carbon Fiber Trim'
    ],
    specifications: {
      engine: '4.0L V8 Biturbo',
      power: '577 hp',
      acceleration: '0-60 mph in 3.1 seconds',
      topSpeed: '195 mph',
      transmission: 'AMG SPEEDSHIFT MCT 9-speed',
      fuelType: 'Premium Gasoline',
      fuelConsumption: '17 mpg combined'
    },
    images: {
      main: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/93652/pexels-photo-93652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2127740/pexels-photo-2127740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    colors: [
      { name: 'AMG Green Hell Magno', code: '#384B33' },
      { name: 'Designo Brilliant Blue Magno', code: '#1E365C' },
      { name: 'Designo Graphite Grey Magno', code: '#606060' },
      { name: 'Designo Cardinal Red', code: '#B22222' }
    ]
  },
  {
    id: 'eqs-2023',
    name: 'EQS',
    model: 'EQS 450+',
    category: 'electric',
    price: 125000,
    year: 2023,
    description: 'The all-electric luxury sedan that represents the future of mobility. The EQS combines sustainable performance with innovative technology.',
    features: [
      'MBUX Hyperscreen',
      'Digital Light with Projection Function',
      'Active Ambient Lighting',
      'Energizing Comfort',
      'Driving Sound Experience',
      'Heat Pump',
      'Mercedes me Charge'
    ],
    specifications: {
      engine: 'Electric Motor',
      power: '329 hp',
      acceleration: '0-60 mph in 5.9 seconds',
      topSpeed: '130 mph (electronically limited)',
      transmission: 'Single-speed direct drive',
      fuelType: 'Electric',
      fuelConsumption: '350 miles range'
    },
    images: {
      main: 'https://images.pexels.com/photos/7567560/pexels-photo-7567560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/13316293/pexels-photo-13316293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/13316294/pexels-photo-13316294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/13316296/pexels-photo-13316296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    colors: [
      { name: 'High-Tech Silver', code: '#C0C0C0' },
      { name: 'Nautic Blue', code: '#1E3F66' },
      { name: 'Onyx Black', code: '#0A0A0A' },
      { name: 'Alpine White', code: '#FFFFFF' }
    ]
  },
  {
    id: 'c-class-2023',
    name: 'C-Class',
    model: 'C 300',
    category: 'sedan',
    price: 65000,
    year: 2023,
    description: 'The perfect blend of elegance and sportiness. The C-Class delivers agile handling with innovative technology and refined comfort.',
    features: [
      'MBUX Infotainment System',
      'Wireless Charging',
      'Heated Front Seats',
      'Panoramic Sunroof',
      'Driver Assistance Package',
      'Bicolor Leather Upholstery',
      'Burmester® 3D Surround Sound'
    ],
    specifications: {
      engine: '2.0L Inline-4 Turbo with EQ Boost',
      power: '255 hp',
      acceleration: '0-60 mph in 5.9 seconds',
      topSpeed: '130 mph (electronically limited)',
      transmission: '9G-TRONIC automatic',
      fuelType: 'Premium Gasoline',
      fuelConsumption: '27 mpg combined'
    },
    images: {
      main: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    colors: [
      { name: 'Polar White', code: '#F9F9F9' },
      { name: 'Obsidian Black', code: '#000000' },
      { name: 'Spectral Blue', code: '#1F3A5F' },
      { name: 'Selenite Grey', code: '#7B7B7B' }
    ]
  },
  {
    id: 'slc-2023',
    name: 'SL',
    model: 'SL 55 AMG',
    category: 'convertible',
    price: 135000,
    year: 2023,
    description: 'The iconic roadster reimagined. The SL combines open-top luxury with exhilarating performance and timeless design.',
    features: [
      'AMG DYNAMIC SELECT',
      'AMG RIDE CONTROL',
      'AIRSCARF neck-level heating',
      'Burmester® Surround Sound',
      'Multicontour Seats with Massage',
      'Active Lane Keeping Assist',
      'Head-Up Display'
    ],
    specifications: {
      engine: '4.0L V8 Biturbo',
      power: '469 hp',
      acceleration: '0-60 mph in 3.8 seconds',
      topSpeed: '183 mph',
      transmission: 'AMG SPEEDSHIFT MCT 9-speed',
      fuelType: 'Premium Gasoline',
      fuelConsumption: '19 mpg combined'
    },
    images: {
      main: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/5086489/pexels-photo-5086489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    colors: [
      { name: 'Hyper Blue', code: '#0039A6' },
      { name: 'Patagonia Red', code: '#A91B0D' },
      { name: 'Obsidian Black', code: '#000000' },
      { name: 'MANUFAKTUR Cashmere White', code: '#F5F5F5' }
    ]
  }
];

// Standardized vehicle data to be used across all components
export const vehiclesData = [
  {
    id: '1',
    name: 'GT Turismo',
    category: 'sports',
    price: 175000,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    features: ['580 HP', '0-60 in 3.2s', '205 mph'],
    fuelType: 'gas',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Porsche-logo-2008-1920x1080.png'
  },
  {
    id: '2',
    name: 'E-Motion',
    category: 'electric',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&w=800&q=80',
    features: ['450 HP', '0-60 in 3.8s', '175 mph'],
    fuelType: 'electric',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Tesla-logo-2003-2500x2500.png'
  },
  {
    id: '3',
    name: 'Classica 65',
    category: 'sports',
    price: 195000,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80',
    features: ['410 HP', '0-60 in 4.5s', '160 mph'],
    fuelType: 'gas',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Ferrari-logo-2500x2500.png'
  },
  {
    id: '4',
    name: 'Terrain X9',
    category: 'suv',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    features: ['520 HP', '0-60 in 4.0s', '155 mph'],
    fuelType: 'hybrid',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Land-Rover-logo-2011-1920x1080.png'
  },
  {
    id: '5',
    name: 'Spyder RS',
    category: 'sports',
    price: 165000,
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
    features: ['610 HP', '0-60 in 2.9s', '210 mph'],
    fuelType: 'gas',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Lamborghini-logo-1920x1080.png'
  },
  {
    id: '6',
    name: 'Track Demon',
    category: 'sports',
    price: 245000,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80',
    features: ['720 HP', '0-60 in 2.7s', '215 mph'],
    fuelType: 'gas',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Bugatti-logo-1024x768.png'
  },
  {
    id: '7',
    name: 'S-Class Elite',
    category: 'sedan',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    features: ['490 HP', '0-60 in 4.1s', '180 mph'],
    fuelType: 'hybrid',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png'
  },
  {
    id: '8',
    name: 'Vision Concept',
    category: 'concept',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800&q=80',
    features: ['800 HP', '0-60 in 2.4s', '220 mph'],
    fuelType: 'electric',
    year: 2024,
    logo: 'https://www.carlogos.org/logo/BMW-logo-2000-2048x2048.png'
  },
  {
    id: '9',
    name: 'Urban EV',
    category: 'electric',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    features: ['250 HP', '0-60 in 5.8s', '130 mph'],
    fuelType: 'electric',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Nissan-logo-2012-2560x1440.png'
  },
  {
    id: '10',
    name: 'G-Force Pro',
    category: 'suv',
    price: 135000,
    image: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=800&q=80',
    features: ['550 HP', '0-60 in 4.3s', '150 mph'],
    fuelType: 'gas',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Range-Rover-logo-2010-1920x1080.png'
  },
  {
    id: '11',
    name: 'Luxury Sedan',
    category: 'sedan',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['400 HP', '0-60 in 4.7s', '155 mph'],
    fuelType: 'hybrid',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Lexus-logo-1988-1920x1080.png'
  },
  {
    id: '12',
    name: 'Executive Plus',
    category: 'sedan',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    features: ['450 HP', '0-60 in 4.3s', '165 mph'],
    fuelType: 'gas',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Audi-logo-2009-1920x1080.png'
  },
  {
    id: '13',
    name: 'i-Concept X',
    category: 'concept',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80',
    features: ['700 HP', '0-60 in 2.8s', '200 mph'],
    fuelType: 'electric',
    year: 2024,
    logo: 'https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png'
  },
  {
    id: '14',
    name: 'Futura GT',
    category: 'concept',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    features: ['750 HP', '0-60 in 2.5s', '210 mph'],
    fuelType: 'hydrogen',
    year: 2024,
    logo: 'https://www.carlogos.org/logo/Audi-logo-2009-1920x1080.png'
  },
  {
    id: '15',
    name: 'SUV Hybrid X7',
    category: 'suv',
    price: 105000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['480 HP', '0-60 in 4.5s', '145 mph'],
    fuelType: 'hybrid',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/BMW-logo-2000-2048x2048.png'
  },
  {
    id: '16',
    name: 'EV Crossover',
    category: 'electric',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['350 HP', '0-60 in 4.8s', '140 mph'],
    fuelType: 'electric',
    year: 2023,
    logo: 'https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png'
  }
];

// Standard categories used across the application
export const standardCategories = ['All', 'suv', 'sedan', 'sports', 'electric', 'concept'];