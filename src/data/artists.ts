export interface Artist {
  id: number;
  name: string;
  day: "friday" | "saturday" | "sunday";
  stage: string;
  time: string;
  endTime: string;
}

// Official Lollapalooza Chile 2026 artist data
export const artists: Artist[] = [
  // VIERNES 13 DE MARZO
  // Cenco Malls Stage
  { id: 1, name: "The Warning", day: "friday", stage: "Cenco Malls Stage", time: "14:30", endTime: "15:15" },
  { id: 2, name: "Gepe", day: "friday", stage: "Cenco Malls Stage", time: "16:00", endTime: "17:00" },
  { id: 3, name: "Ruel", day: "friday", stage: "Cenco Malls Stage", time: "18:00", endTime: "19:00" },
  { id: 4, name: "Doechii", day: "friday", stage: "Cenco Malls Stage", time: "20:00", endTime: "21:00" },
  { id: 5, name: "Sabrina Carpenter", day: "friday", stage: "Cenco Malls Stage", time: "22:15", endTime: "23:35" },
  // Banco de Chile Stage
  { id: 7, name: "Dracma", day: "friday", stage: "Banco de Chile Stage", time: "13:45", endTime: "14:30" },
  { id: 8, name: "Bad Nerves", day: "friday", stage: "Banco de Chile Stage", time: "15:15", endTime: "16:00" },
  { id: 9, name: "Airbag", day: "friday", stage: "Banco de Chile Stage", time: "17:00", endTime: "18:00" },
  { id: 10, name: "Interpol", day: "friday", stage: "Banco de Chile Stage", time: "19:00", endTime: "20:00" },
  { id: 11, name: "Deftones", day: "friday", stage: "Banco de Chile Stage", time: "21:00", endTime: "22:15" },
  { id: 6, name: "Young Cister", day: "friday", stage: "Banco de Chile Stage", time: "23:35", endTime: "00:50" },
  // Alternative Stage
  { id: 12, name: "Cleaver", day: "friday", stage: "Alternative Stage", time: "14:15", endTime: "15:00" },
  { id: 13, name: "LANY", day: "friday", stage: "Alternative Stage", time: "16:00", endTime: "17:00" },
  { id: 14, name: "Viagra Boys", day: "friday", stage: "Alternative Stage", time: "18:00", endTime: "19:00" },
  { id: 15, name: "Men I Trust", day: "friday", stage: "Alternative Stage", time: "20:00", endTime: "21:00" },
  { id: 16, name: "Tom Morello", day: "friday", stage: "Alternative Stage", time: "22:30", endTime: "23:30" },
  // Perry's Stage
  { id: 17, name: "Benja Valencia", day: "friday", stage: "Perry's Stage", time: "14:00", endTime: "14:45" },
  { id: 18, name: "Bryartz", day: "friday", stage: "Perry's Stage", time: "15:00", endTime: "15:45" },
  { id: 19, name: "Saske", day: "friday", stage: "Perry's Stage", time: "16:00", endTime: "16:45" },
  { id: 20, name: "3BallMTY", day: "friday", stage: "Perry's Stage", time: "17:00", endTime: "17:45" },
  { id: 21, name: "Six Sex", day: "friday", stage: "Perry's Stage", time: "18:00", endTime: "18:45" },
  { id: 22, name: "Horsegiirl", day: "friday", stage: "Perry's Stage", time: "19:00", endTime: "20:00" },
  { id: 23, name: "BUNT.", day: "friday", stage: "Perry's Stage", time: "20:15", endTime: "21:15" },
  { id: 24, name: "Ben Böhmer", day: "friday", stage: "Perry's Stage", time: "21:30", endTime: "22:45" },
  { id: 25, name: "Kygo", day: "friday", stage: "Perry's Stage", time: "23:15", endTime: "00:30" },
  // Lotus Stage
  { id: 26, name: "Consequence of Energy", day: "friday", stage: "Lotus Stage", time: "16:15", endTime: "17:00" },
  { id: 27, name: "Drink the Sea", day: "friday", stage: "Lotus Stage", time: "18:00", endTime: "18:45" },
  { id: 28, name: "Amigo de Artistas", day: "friday", stage: "Lotus Stage", time: "19:30", endTime: "20:15" },
  { id: 29, name: "The La Planta", day: "friday", stage: "Lotus Stage", time: "21:00", endTime: "21:45" },
  { id: 30, name: "Gondwana", day: "friday", stage: "Lotus Stage", time: "22:45", endTime: "23:45" },
  // Kidzapalooza Stage
  { id: 31, name: "Los Machinga", day: "friday", stage: "Kidzapalooza Stage", time: "15:30", endTime: "16:00" },
  { id: 32, name: "Despertando las Neuronas", day: "friday", stage: "Kidzapalooza Stage", time: "16:45", endTime: "17:30" },
  { id: 33, name: "31 Minutos", day: "friday", stage: "Kidzapalooza Stage", time: "18:30", endTime: "19:50" },

  // SÁBADO 14 DE MARZO
  // Cenco Malls Stage
  { id: 34, name: "Zaturno", day: "saturday", stage: "Cenco Malls Stage", time: "14:45", endTime: "15:30" },
  { id: 35, name: "Candelabro", day: "saturday", stage: "Cenco Malls Stage", time: "16:15", endTime: "17:00" },
  { id: 36, name: "Djo", day: "saturday", stage: "Cenco Malls Stage", time: "18:00", endTime: "19:00" },
  { id: 37, name: "Turnstile", day: "saturday", stage: "Cenco Malls Stage", time: "20:00", endTime: "21:00" },
  { id: 38, name: "Tyler, The Creator", day: "saturday", stage: "Cenco Malls Stage", time: "22:15", endTime: "23:30" },
  // Banco de Chile Stage
  { id: 39, name: "Astronautiko", day: "saturday", stage: "Banco de Chile Stage", time: "14:00", endTime: "14:45" },
  { id: 40, name: "Yami Safdie", day: "saturday", stage: "Banco de Chile Stage", time: "15:30", endTime: "16:15" },
  { id: 41, name: "Royel Otis", day: "saturday", stage: "Banco de Chile Stage", time: "17:00", endTime: "18:00" },
  { id: 42, name: "Katseye", day: "saturday", stage: "Banco de Chile Stage", time: "19:00", endTime: "20:00" },
  { id: 43, name: "Lorde", day: "saturday", stage: "Banco de Chile Stage", time: "21:00", endTime: "22:15" },
  { id: 44, name: "Los Bunkers", day: "saturday", stage: "Banco de Chile Stage", time: "23:30", endTime: "01:00" },
  // Alternative Stage
  { id: 45, name: "Mano de Obra", day: "saturday", stage: "Alternative Stage", time: "14:45", endTime: "15:30" },
  { id: 46, name: "De Saloon", day: "saturday", stage: "Alternative Stage", time: "16:15", endTime: "17:00" },
  { id: 47, name: "Judeline", day: "saturday", stage: "Alternative Stage", time: "18:00", endTime: "18:45" },
  { id: 48, name: "Balu Brigada", day: "saturday", stage: "Alternative Stage", time: "20:00", endTime: "21:00" },
  { id: 49, name: "Orishas", day: "saturday", stage: "Alternative Stage", time: "22:30", endTime: "23:45" },
  // Perry's Stage
  { id: 50, name: "Bruno Borlone", day: "saturday", stage: "Perry's Stage", time: "14:30", endTime: "15:15" },
  { id: 51, name: "Marlon Breeze", day: "saturday", stage: "Perry's Stage", time: "15:30", endTime: "16:15" },
  { id: 52, name: "Aura Bae", day: "saturday", stage: "Perry's Stage", time: "16:30", endTime: "17:30" },
  { id: 53, name: "Katteyes", day: "saturday", stage: "Perry's Stage", time: "17:45", endTime: "18:30" },
  { id: 54, name: "Aerobica", day: "saturday", stage: "Perry's Stage", time: "18:45", endTime: "19:45" },
  { id: 55, name: "RöZ", day: "saturday", stage: "Perry's Stage", time: "20:00", endTime: "21:00" },
  { id: 56, name: "Yousuke Yukimatsu", day: "saturday", stage: "Perry's Stage", time: "21:15", endTime: "22:30" },
  { id: 57, name: "Peggy Gou", day: "saturday", stage: "Perry's Stage", time: "23:00", endTime: "00:30" },
  // Lotus Stage
  { id: 58, name: "Fonosida", day: "saturday", stage: "Lotus Stage", time: "14:00", endTime: "14:30" },
  { id: 59, name: "Como Asesinar a Felipes", day: "saturday", stage: "Lotus Stage", time: "15:15", endTime: "16:00" },
  { id: 60, name: "Chicarica", day: "saturday", stage: "Lotus Stage", time: "16:45", endTime: "17:30" },
  { id: 61, name: "Guitarricadelafuente", day: "saturday", stage: "Lotus Stage", time: "18:15", endTime: "19:00" },
  { id: 62, name: "Rubio", day: "saturday", stage: "Lotus Stage", time: "19:45", endTime: "20:45" },
  { id: 63, name: "Tomo Como Rey", day: "saturday", stage: "Lotus Stage", time: "21:30", endTime: "22:30" },
  // Kidzapalooza Stage
  { id: 64, name: "School of Rock", day: "saturday", stage: "Kidzapalooza Stage", time: "15:30", endTime: "16:15" },
  { id: 65, name: "Wassa Wassa Melodías de África", day: "saturday", stage: "Kidzapalooza Stage", time: "17:00", endTime: "17:45" },
  { id: 66, name: "31 Minutos", day: "saturday", stage: "Kidzapalooza Stage", time: "18:30", endTime: "19:50" },

  // DOMINGO 15 DE MARZO
  // Cenco Malls Stage
  { id: 67, name: "Cristobal Briceño y Grupo Crisis", day: "sunday", stage: "Cenco Malls Stage", time: "14:45", endTime: "15:30" },
  { id: 68, name: "Bandalos Chinos", day: "sunday", stage: "Cenco Malls Stage", time: "16:15", endTime: "17:00" },
  { id: 69, name: "Marina", day: "sunday", stage: "Cenco Malls Stage", time: "18:00", endTime: "19:00" },
  { id: 70, name: "Lewis Capaldi", day: "sunday", stage: "Cenco Malls Stage", time: "20:00", endTime: "21:00" },
  { id: 71, name: "Chappell Roan", day: "sunday", stage: "Cenco Malls Stage", time: "22:30", endTime: "00:00" },
  // Banco de Chile Stage
  { id: 72, name: "Santo Barrio", day: "sunday", stage: "Banco de Chile Stage", time: "14:00", endTime: "14:45" },
  { id: 73, name: "Joaquina", day: "sunday", stage: "Banco de Chile Stage", time: "15:30", endTime: "16:15" },
  { id: 74, name: "Danny Ocean", day: "sunday", stage: "Banco de Chile Stage", time: "17:00", endTime: "18:00" },
  { id: 75, name: "Addison Rae", day: "sunday", stage: "Banco de Chile Stage", time: "19:00", endTime: "20:00" },
  { id: 76, name: "Skrillex", day: "sunday", stage: "Banco de Chile Stage", time: "21:00", endTime: "22:15" },
  // Alternative Stage
  { id: 77, name: "Hesse Kassel", day: "sunday", stage: "Alternative Stage", time: "13:45", endTime: "14:15" },
  { id: 78, name: "Anttonias", day: "sunday", stage: "Alternative Stage", time: "14:45", endTime: "15:30" },
  { id: 79, name: "Manuel García", day: "sunday", stage: "Alternative Stage", time: "16:15", endTime: "17:15" },
  { id: 80, name: "TV Girl", day: "sunday", stage: "Alternative Stage", time: "18:00", endTime: "19:00" },
  { id: 81, name: "2 Minutos", day: "sunday", stage: "Alternative Stage", time: "20:00", endTime: "21:00" },
  { id: 82, name: "Riize", day: "sunday", stage: "Alternative Stage", time: "22:15", endTime: "23:15" },
  // Perry's Stage
  { id: 83, name: "Miss Javi", day: "sunday", stage: "Perry's Stage", time: "14:00", endTime: "14:45" },
  { id: 84, name: "Mauricio Hernandez", day: "sunday", stage: "Perry's Stage", time: "15:00", endTime: "15:45" },
  { id: 85, name: "Caleb Calloway", day: "sunday", stage: "Perry's Stage", time: "16:00", endTime: "16:45" },
  { id: 86, name: "Hamdi", day: "sunday", stage: "Perry's Stage", time: "17:00", endTime: "18:00" },
  { id: 87, name: "Facebooklyn", day: "sunday", stage: "Perry's Stage", time: "18:15", endTime: "19:15" },
  { id: 88, name: "2Hollis & Rommulas", day: "sunday", stage: "Perry's Stage", time: "19:30", endTime: "20:30" },
  { id: 89, name: "Akrilla", day: "sunday", stage: "Perry's Stage", time: "20:45", endTime: "22:00" },
  { id: 90, name: "Brutalismus 3000", day: "sunday", stage: "Perry's Stage", time: "22:30", endTime: "23:45" },
  // Lotus Stage
  { id: 91, name: "Los Borne", day: "sunday", stage: "Lotus Stage", time: "13:30", endTime: "14:00" },
  { id: 92, name: "La Caravana Magica", day: "sunday", stage: "Lotus Stage", time: "14:45", endTime: "15:30" },
  { id: 93, name: "Niebla Niebla", day: "sunday", stage: "Lotus Stage", time: "16:15", endTime: "17:00" },
  { id: 94, name: "Claudio Valenzuela Trio", day: "sunday", stage: "Lotus Stage", time: "17:45", endTime: "18:45" },
  { id: 95, name: "Mau & Ricky", day: "sunday", stage: "Lotus Stage", time: "19:30", endTime: "20:30" },
  { id: 96, name: "Quilapayún", day: "sunday", stage: "Lotus Stage", time: "21:15", endTime: "22:15" },
  // Kidzapalooza Stage
  { id: 97, name: "Caleuchistico", day: "sunday", stage: "Kidzapalooza Stage", time: "15:30", endTime: "16:15" },
  { id: 98, name: "Otroarte Música", day: "sunday", stage: "Kidzapalooza Stage", time: "17:00", endTime: "17:45" },
  { id: 99, name: "Tikitiklip", day: "sunday", stage: "Kidzapalooza Stage", time: "18:30", endTime: "19:30" },
];
