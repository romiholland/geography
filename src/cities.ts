const cities = [
  // North America
  {
    city: "New York City",
    coordinates: [-74.01, 40.71],
  },
  {
    city: "Los Angeles",
    coordinates: [-118.24, 34.05],
  },
  {
    city: "Chicago",
    coordinates: [-87.63, 41.88],
  },
  {
    city: "Washington, D.C.",
    coordinates: [-77.04, 38.91],
  },
  {
    city: "Houston",
    coordinates: [-95.37, 29.76],
  },
  {
    city: "Phoenix",
    coordinates: [-112.08, 33.45],
  },
  {
    city: "Dallas",
    coordinates: [-96.8, 32.78],
  },
  {
    city: "Denver",
    coordinates: [-104.99, 39.74],
  },
  {
    city: "Minneapolis",
    coordinates: [-93.27, 44.98],
  },
  {
    city: "San Francisco",
    coordinates: [-122.42, 37.77],
  },
  {
    city: "Seattle",
    coordinates: [-122.33, 47.6],
  },
  {
    city: "Miami",
    coordinates: [-80.19, 25.76],
  },
  {
    city: "Atlanta",
    coordinates: [-84.39, 33.75],
  },
  {
    city: "Boston",
    coordinates: [-71.06, 42.36],
  },
  {
    city: "Toronto",
    coordinates: [-79.38, 43.65],
  },
  {
    city: "Montreal",
    coordinates: [-73.57, 45.5],
  },
  {
    city: "Vancouver",
    coordinates: [-123.12, 49.28],
  },
  {
    city: "Anchorage",
    coordinates: [-149.9, 61.22],
  },
  {
    city: "Honolulu",
    coordinates: [-157.86, 21.31],
  },

  // Latin America
  {
    city: "Mexico City",
    coordinates: [-99.13, 19.43],
  },
  {
    city: "São Paulo",
    coordinates: [-46.64, -23.55],
  },
  {
    city: "Buenos Aires",
    coordinates: [-58.38, -34.6],
  },
  {
    city: "Rio de Janeiro",
    coordinates: [-43.21, -22.91],
  },
  {
    city: "Lima",
    coordinates: [-77.03, -12.05],
  },
  {
    city: "Bogotá",
    coordinates: [-74.07, 4.71],
  },
  {
    city: "Santiago",
    coordinates: [-70.67, -33.45],
  },
  {
    city: "Caracas",
    coordinates: [-66.9, 10.48],
  },
  {
    city: "Havana",
    coordinates: [-82.38, 23.13],
  },
  {
    city: "Monterrey",
    coordinates: [-100.32, 25.68],
  },
  {
    city: "Brasília",
    coordinates: [-47.93, -15.78],
  },
  {
    city: "La Paz",
    coordinates: [-68.15, -16.5],
  },

  // Europe
  {
    city: "London",
    coordinates: [-0.13, 51.51],
  },
  {
    city: "Paris",
    coordinates: [2.35, 48.86],
  },
  {
    city: "Berlin",
    coordinates: [13.4, 52.52],
  },
  {
    city: "Rome",
    coordinates: [12.49, 41.9],
  },
  {
    city: "Madrid",
    coordinates: [-3.7, 40.42],
  },
  {
    city: "Moscow",
    coordinates: [37.62, 55.75],
  },
  {
    city: "Istanbul",
    coordinates: [28.98, 41.01],
  },
  {
    city: "Amsterdam",
    coordinates: [4.9, 52.37],
  },
  {
    city: "Vienna",
    coordinates: [16.37, 48.21],
  },
  {
    city: "Prague",
    coordinates: [14.42, 50.08],
  },
  {
    city: "Lisbon",
    coordinates: [-9.14, 38.72],
  },
  {
    city: "Oslo",
    coordinates: [10.75, 59.91],
  },
  {
    city: "Stockholm",
    coordinates: [18.07, 59.33],
  },
  {
    city: "Reykjavik",
    coordinates: [-21.89, 64.13],
  },
  {
    city: "Athens",
    coordinates: [23.73, 37.98],
  },
  {
    city: "Zurich",
    coordinates: [8.54, 47.37],
  },

  // Africa
  {
    city: "Cairo",
    coordinates: [31.23, 30.04],
  },
  {
    city: "Lagos",
    coordinates: [3.38, 6.52],
  },
  {
    city: "Johannesburg",
    coordinates: [28.04, -26.2],
  },
  {
    city: "Kinshasa",
    coordinates: [15.27, -4.32],
  },
  {
    city: "Nairobi",
    coordinates: [36.82, -1.29],
  },
  {
    city: "Casablanca",
    coordinates: [-7.6, 33.59],
  },
  {
    city: "Accra",
    coordinates: [-0.2, 5.61],
  },
  {
    city: "Addis Ababa",
    coordinates: [38.76, 9.01],
  },
  {
    city: "Algiers",
    coordinates: [3.06, 36.75],
  },
  {
    city: "Dakar",
    coordinates: [-17.47, 14.71],
  },
  {
    city: "Cape Town",
    coordinates: [18.42, -33.92],
  },

  // Middle East
  {
    city: "Riyadh",
    coordinates: [46.75, 24.71],
  },
  {
    city: "Dubai",
    coordinates: [55.27, 25.2],
  },
  {
    city: "Doha",
    coordinates: [51.53, 25.28],
  },
  {
    city: "Jerusalem",
    coordinates: [35.21, 31.77],
  },
  {
    city: "Baghdad",
    coordinates: [44.4, 33.32],
  },
  {
    city: "Tehran",
    coordinates: [51.39, 35.69],
  },
  {
    city: "Kuwait City",
    coordinates: [47.98, 29.37],
  },

  // Central and South Asia
  {
    city: "Tashkent",
    coordinates: [69.28, 41.31],
  },
  {
    city: "Nur-Sultan",
    coordinates: [71.47, 51.17],
  },
  {
    city: "New Delhi",
    coordinates: [77.21, 28.64],
  },
  {
    city: "Mumbai",
    coordinates: [72.88, 19.07],
  },
  {
    city: "Karachi",
    coordinates: [67.0, 24.86],
  },
  {
    city: "Dhaka",
    coordinates: [90.41, 23.81],
  },
  {
    city: "Bangalore",
    coordinates: [77.59, 12.97],
  },
  {
    city: "Lahore",
    coordinates: [74.35, 31.52],
  },
  {
    city: "Colombo",
    coordinates: [79.86, 6.93],
  },
  {
    city: "Kolkata",
    coordinates: [88.36, 22.57],
  },
  {
    city: "Kathmandu",
    coordinates: [85.32, 27.71],
  },

  // East and South East Asia
  {
    city: "Beijing",
    coordinates: [116.41, 39.9],
  },
  {
    city: "Shanghai",
    coordinates: [121.47, 31.23],
  },
  {
    city: "Tokyo",
    coordinates: [139.69, 35.69],
  },
  {
    city: "Seoul",
    coordinates: [126.98, 37.57],
  },
  {
    city: "Taipei",
    coordinates: [121.56, 25.04],
  },
  {
    city: "Singapore",
    coordinates: [103.85, 1.35],
  },
  {
    city: "Bangkok",
    coordinates: [100.5, 13.76],
  },
  {
    city: "Kuala Lumpur",
    coordinates: [101.69, 3.14],
  },
  {
    city: "Jakarta",
    coordinates: [106.82, -6.18],
  },
  {
    city: "Manila",
    coordinates: [120.98, 14.6],
  },
  {
    city: "Hanoi",
    coordinates: [105.85, 21.03],
  },
  {
    city: "Ho Chi Minh City",
    coordinates: [106.67, 10.78],
  },
  {
    city: "Hong Kong",
    coordinates: [114.17, 22.3],
  },

  // Oceania
  {
    city: "Sydney",
    coordinates: [151.21, -33.87],
  },
  {
    city: "Melbourne",
    coordinates: [144.96, -37.81],
  },
  {
    city: "Auckland",
    coordinates: [174.76, -36.85],
  },
  {
    city: "Wellington",
    coordinates: [174.77, -41.29],
  },
  {
    city: "Port Moresby",
    coordinates: [147.19, -9.44],
  },
  {
    city: "Suva",
    coordinates: [178.42, -18.12],
  },
  {
    city: "Perth",
    coordinates: [115.86, -31.95],
  },
  {
    city: "Brisbane",
    coordinates: [153.03, -27.47],
  },
] as const;

type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export default cities as DeepMutable<typeof cities>;
