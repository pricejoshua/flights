import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Seed Airports
  console.log('Seeding airports...');
  const airports = [
    // United States
    { iataCode: 'ATL', icaoCode: 'KATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States', timezone: 'America/New_York', latitude: 33.6407, longitude: -84.4277 },
    { iataCode: 'LAX', icaoCode: 'KLAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', latitude: 33.9416, longitude: -118.4085 },
    { iataCode: 'ORD', icaoCode: 'KORD', name: "Chicago O'Hare International Airport", city: 'Chicago', country: 'United States', timezone: 'America/Chicago', latitude: 41.9742, longitude: -87.9073 },
    { iataCode: 'DFW', icaoCode: 'KDFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States', timezone: 'America/Chicago', latitude: 32.8998, longitude: -97.0403 },
    { iataCode: 'DEN', icaoCode: 'KDEN', name: 'Denver International Airport', city: 'Denver', country: 'United States', timezone: 'America/Denver', latitude: 39.8561, longitude: -104.6737 },
    { iataCode: 'JFK', icaoCode: 'KJFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States', timezone: 'America/New_York', latitude: 40.6413, longitude: -73.7781 },
    { iataCode: 'SFO', icaoCode: 'KSFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States', timezone: 'America/Los_Angeles', latitude: 37.6213, longitude: -122.3790 },
    { iataCode: 'SEA', icaoCode: 'KSEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States', timezone: 'America/Los_Angeles', latitude: 47.4502, longitude: -122.3088 },
    { iataCode: 'LAS', icaoCode: 'KLAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'United States', timezone: 'America/Los_Angeles', latitude: 36.0840, longitude: -115.1537 },
    { iataCode: 'MCO', icaoCode: 'KMCO', name: 'Orlando International Airport', city: 'Orlando', country: 'United States', timezone: 'America/New_York', latitude: 28.4312, longitude: -81.3081 },
    { iataCode: 'MIA', icaoCode: 'KMIA', name: 'Miami International Airport', city: 'Miami', country: 'United States', timezone: 'America/New_York', latitude: 25.7959, longitude: -80.2870 },
    { iataCode: 'PHX', icaoCode: 'KPHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', country: 'United States', timezone: 'America/Phoenix', latitude: 33.4352, longitude: -112.0101 },
    { iataCode: 'IAH', icaoCode: 'KIAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States', timezone: 'America/Chicago', latitude: 29.9902, longitude: -95.3368 },
    { iataCode: 'EWR', icaoCode: 'KEWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States', timezone: 'America/New_York', latitude: 40.6895, longitude: -74.1745 },
    { iataCode: 'BOS', icaoCode: 'KBOS', name: 'Boston Logan International Airport', city: 'Boston', country: 'United States', timezone: 'America/New_York', latitude: 42.3656, longitude: -71.0096 },
    { iataCode: 'MSP', icaoCode: 'KMSP', name: 'Minneapolis-St Paul International Airport', city: 'Minneapolis', country: 'United States', timezone: 'America/Chicago', latitude: 44.8848, longitude: -93.2223 },
    { iataCode: 'DTW', icaoCode: 'KDTW', name: 'Detroit Metropolitan Wayne County Airport', city: 'Detroit', country: 'United States', timezone: 'America/Detroit', latitude: 42.2162, longitude: -83.3554 },
    { iataCode: 'PHL', icaoCode: 'KPHL', name: 'Philadelphia International Airport', city: 'Philadelphia', country: 'United States', timezone: 'America/New_York', latitude: 39.8744, longitude: -75.2424 },
    { iataCode: 'LGA', icaoCode: 'KLGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States', timezone: 'America/New_York', latitude: 40.7769, longitude: -73.8740 },
    { iataCode: 'BWI', icaoCode: 'KBWI', name: 'Baltimore/Washington International Airport', city: 'Baltimore', country: 'United States', timezone: 'America/New_York', latitude: 39.1774, longitude: -76.6684 },
    { iataCode: 'SAN', icaoCode: 'KSAN', name: 'San Diego International Airport', city: 'San Diego', country: 'United States', timezone: 'America/Los_Angeles', latitude: 32.7338, longitude: -117.1933 },
    { iataCode: 'PDX', icaoCode: 'KPDX', name: 'Portland International Airport', city: 'Portland', country: 'United States', timezone: 'America/Los_Angeles', latitude: 45.5898, longitude: -122.5951 },
    { iataCode: 'AUS', icaoCode: 'KAUS', name: 'Austin-Bergstrom International Airport', city: 'Austin', country: 'United States', timezone: 'America/Chicago', latitude: 30.1945, longitude: -97.6699 },
    { iataCode: 'CLT', icaoCode: 'KCLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', country: 'United States', timezone: 'America/New_York', latitude: 35.2144, longitude: -80.9473 },
    
    // International - Europe
    { iataCode: 'LHR', icaoCode: 'EGLL', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', timezone: 'Europe/London', latitude: 51.4700, longitude: -0.4543 },
    { iataCode: 'CDG', icaoCode: 'LFPG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', timezone: 'Europe/Paris', latitude: 49.0097, longitude: 2.5479 },
    { iataCode: 'FRA', icaoCode: 'EDDF', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', timezone: 'Europe/Berlin', latitude: 50.0379, longitude: 8.5622 },
    { iataCode: 'AMS', icaoCode: 'EHAM', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', latitude: 52.3105, longitude: 4.7683 },
    { iataCode: 'MAD', icaoCode: 'LEMD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', latitude: 40.4983, longitude: -3.5676 },
    { iataCode: 'BCN', icaoCode: 'LEBL', name: 'Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain', timezone: 'Europe/Madrid', latitude: 41.2974, longitude: 2.0833 },
    { iataCode: 'FCO', icaoCode: 'LIRF', name: 'Leonardo da Vinci-Fiumicino Airport', city: 'Rome', country: 'Italy', timezone: 'Europe/Rome', latitude: 41.8003, longitude: 12.2389 },
    { iataCode: 'MUC', icaoCode: 'EDDM', name: 'Munich Airport', city: 'Munich', country: 'Germany', timezone: 'Europe/Berlin', latitude: 48.3538, longitude: 11.7750 },
    { iataCode: 'ZRH', icaoCode: 'LSZH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', latitude: 47.4582, longitude: 8.5556 },
    { iataCode: 'VIE', icaoCode: 'LOWW', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', latitude: 48.1103, longitude: 16.5697 },
    
    // International - Asia/Pacific
    { iataCode: 'NRT', icaoCode: 'RJAA', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', latitude: 35.7647, longitude: 140.3864 },
    { iataCode: 'HND', icaoCode: 'RJTT', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', latitude: 35.5494, longitude: 139.7798 },
    { iataCode: 'SIN', icaoCode: 'WSSS', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', latitude: 1.3644, longitude: 103.9915 },
    { iataCode: 'ICN', icaoCode: 'RKSI', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', latitude: 37.4602, longitude: 126.4407 },
    { iataCode: 'HKG', icaoCode: 'VHHH', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong', timezone: 'Asia/Hong_Kong', latitude: 22.3080, longitude: 113.9185 },
    { iataCode: 'BKK', icaoCode: 'VTBS', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', latitude: 13.6900, longitude: 100.7501 },
    { iataCode: 'SYD', icaoCode: 'YSSY', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', latitude: -33.9399, longitude: 151.1753 },
    { iataCode: 'MEL', icaoCode: 'YMML', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', latitude: -37.6690, longitude: 144.8410 },
    { iataCode: 'PEK', icaoCode: 'ZBAA', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', latitude: 40.0799, longitude: 116.6031 },
    { iataCode: 'PVG', icaoCode: 'ZSPD', name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', latitude: 31.1443, longitude: 121.8083 },
    { iataCode: 'DEL', icaoCode: 'VIDP', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', timezone: 'Asia/Kolkata', latitude: 28.5665, longitude: 77.1031 },
    { iataCode: 'BOM', icaoCode: 'VABB', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', latitude: 19.0896, longitude: 72.8656 },
    
    // International - Middle East
    { iataCode: 'DXB', icaoCode: 'OMDB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', timezone: 'Asia/Dubai', latitude: 25.2532, longitude: 55.3657 },
    { iataCode: 'DOH', icaoCode: 'OTHH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', timezone: 'Asia/Qatar', latitude: 25.2731, longitude: 51.6080 },
    { iataCode: 'IST', icaoCode: 'LTFM', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', latitude: 41.2753, longitude: 28.7519 },
    
    // International - Latin America
    { iataCode: 'GRU', icaoCode: 'SBGR', name: 'São Paulo/Guarulhos International Airport', city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', latitude: -23.4356, longitude: -46.4731 },
    { iataCode: 'MEX', icaoCode: 'MMMX', name: 'Mexico City International Airport', city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', latitude: 19.4363, longitude: -99.0721 },
    { iataCode: 'YYZ', icaoCode: 'CYYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', latitude: 43.6777, longitude: -79.6248 },
    { iataCode: 'YVR', icaoCode: 'CYVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', latitude: 49.1939, longitude: -123.1844 },
  ];

  for (const airport of airports) {
    await prisma.airport.upsert({
      where: { iataCode: airport.iataCode },
      update: {},
      create: airport,
    });
  }

  console.log(`✅ Seeded ${airports.length} airports`);

  // Seed Airlines
  console.log('Seeding airlines...');
  const airlines = [
    // United States
    { iataCode: 'AA', icaoCode: 'AAL', name: 'American Airlines', country: 'United States' },
    { iataCode: 'DL', icaoCode: 'DAL', name: 'Delta Air Lines', country: 'United States' },
    { iataCode: 'UA', icaoCode: 'UAL', name: 'United Airlines', country: 'United States' },
    { iataCode: 'WN', icaoCode: 'SWA', name: 'Southwest Airlines', country: 'United States' },
    { iataCode: 'AS', icaoCode: 'ASA', name: 'Alaska Airlines', country: 'United States' },
    { iataCode: 'B6', icaoCode: 'JBU', name: 'JetBlue Airways', country: 'United States' },
    { iataCode: 'NK', icaoCode: 'NKS', name: 'Spirit Airlines', country: 'United States' },
    { iataCode: 'F9', icaoCode: 'FFT', name: 'Frontier Airlines', country: 'United States' },
    { iataCode: 'G4', icaoCode: 'AAY', name: 'Allegiant Air', country: 'United States' },
    { iataCode: 'HA', icaoCode: 'HAL', name: 'Hawaiian Airlines', country: 'United States' },
    
    // Europe
    { iataCode: 'BA', icaoCode: 'BAW', name: 'British Airways', country: 'United Kingdom' },
    { iataCode: 'LH', icaoCode: 'DLH', name: 'Lufthansa', country: 'Germany' },
    { iataCode: 'AF', icaoCode: 'AFR', name: 'Air France', country: 'France' },
    { iataCode: 'KL', icaoCode: 'KLM', name: 'KLM Royal Dutch Airlines', country: 'Netherlands' },
    { iataCode: 'IB', icaoCode: 'IBE', name: 'Iberia', country: 'Spain' },
    { iataCode: 'AZ', icaoCode: 'AZA', name: 'Alitalia', country: 'Italy' },
    { iataCode: 'LX', icaoCode: 'SWR', name: 'Swiss International Air Lines', country: 'Switzerland' },
    { iataCode: 'OS', icaoCode: 'AUA', name: 'Austrian Airlines', country: 'Austria' },
    { iataCode: 'SK', icaoCode: 'SAS', name: 'Scandinavian Airlines', country: 'Sweden' },
    { iataCode: 'AY', icaoCode: 'FIN', name: 'Finnair', country: 'Finland' },
    { iataCode: 'FR', icaoCode: 'RYR', name: 'Ryanair', country: 'Ireland' },
    { iataCode: 'U2', icaoCode: 'EZY', name: 'easyJet', country: 'United Kingdom' },
    
    // Asia/Pacific
    { iataCode: 'JL', icaoCode: 'JAL', name: 'Japan Airlines', country: 'Japan' },
    { iataCode: 'NH', icaoCode: 'ANA', name: 'All Nippon Airways', country: 'Japan' },
    { iataCode: 'SQ', icaoCode: 'SIA', name: 'Singapore Airlines', country: 'Singapore' },
    { iataCode: 'KE', icaoCode: 'KAL', name: 'Korean Air', country: 'South Korea' },
    { iataCode: 'OZ', icaoCode: 'AAR', name: 'Asiana Airlines', country: 'South Korea' },
    { iataCode: 'CX', icaoCode: 'CPA', name: 'Cathay Pacific', country: 'Hong Kong' },
    { iataCode: 'TG', icaoCode: 'THA', name: 'Thai Airways', country: 'Thailand' },
    { iataCode: 'QF', icaoCode: 'QFA', name: 'Qantas', country: 'Australia' },
    { iataCode: 'VA', icaoCode: 'VOZ', name: 'Virgin Australia', country: 'Australia' },
    { iataCode: 'CA', icaoCode: 'CCA', name: 'Air China', country: 'China' },
    { iataCode: 'MU', icaoCode: 'CES', name: 'China Eastern Airlines', country: 'China' },
    { iataCode: 'CZ', icaoCode: 'CSN', name: 'China Southern Airlines', country: 'China' },
    { iataCode: 'AI', icaoCode: 'AIC', name: 'Air India', country: 'India' },
    { iataCode: '6E', icaoCode: 'IGO', name: 'IndiGo', country: 'India' },
    
    // Middle East
    { iataCode: 'EK', icaoCode: 'UAE', name: 'Emirates', country: 'United Arab Emirates' },
    { iataCode: 'EY', icaoCode: 'ETD', name: 'Etihad Airways', country: 'United Arab Emirates' },
    { iataCode: 'QR', icaoCode: 'QTR', name: 'Qatar Airways', country: 'Qatar' },
    { iataCode: 'TK', icaoCode: 'THY', name: 'Turkish Airlines', country: 'Turkey' },
    
    // Latin America
    { iataCode: 'LA', icaoCode: 'LAN', name: 'LATAM Airlines', country: 'Chile' },
    { iataCode: 'AM', icaoCode: 'AMX', name: 'Aeroméxico', country: 'Mexico' },
    { iataCode: 'AC', icaoCode: 'ACA', name: 'Air Canada', country: 'Canada' },
    { iataCode: 'WS', icaoCode: 'WJA', name: 'WestJet', country: 'Canada' },
  ];

  for (const airline of airlines) {
    await prisma.airline.upsert({
      where: { iataCode: airline.iataCode },
      update: {},
      create: airline,
    });
  }

  console.log(`✅ Seeded ${airlines.length} airlines`);
  console.log('✨ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
