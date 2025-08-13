import React, { createContext, useContext } from 'react';

export interface CityData {
  id: string;
  name: string;
  region: string;
  population: string;
  elevation: string;
  description: string;
  keyIndustries: string[];
  attractions: string[];
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  jobsAvailable: number;
  culturalSites: number;
  historicalSites: number;
}

interface CitiesContextType {
  cities: CityData[];
  getCityByName: (name: string) => CityData | undefined;
  getCitiesByRegion: (region: string) => CityData[];
  getTopCities: (limit?: number) => CityData[];
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
};

const ethiopianCitiesData: CityData[] = [
  {
    id: 'addis-ababa',
    name: 'Addis Ababa',
    region: 'Addis Ababa City Administration',
    population: '5.2 million',
    elevation: '2,355 m',
    description: 'The capital and largest city of Ethiopia, serving as the political, commercial, and cultural hub of the country. Home to the African Union headquarters and numerous international organizations.',
    keyIndustries: ['Government', 'Banking & Finance', 'Manufacturing', 'Technology', 'Education', 'Healthcare'],
    attractions: ['National Museum', 'Holy Trinity Cathedral', 'Merkato Market', 'Red Terror Martyrs Memorial', 'Mount Entoto'],
    image: '/placeholder.svg',
    coordinates: { lat: 9.0320, lng: 38.7469 },
    jobsAvailable: 1250,
    culturalSites: 45,
    historicalSites: 32
  },
  {
    id: 'dire-dawa',
    name: 'Dire Dawa',
    region: 'Dire Dawa Administration',
    population: '506,000',
    elevation: '1,079 m',
    description: 'A major commercial and industrial center in eastern Ethiopia, known for its strategic railway connection and diverse cultural heritage.',
    keyIndustries: ['Railway Transport', 'Manufacturing', 'Trade & Commerce', 'Agriculture Processing'],
    attractions: ['Dire Dawa Railway Station', 'Kafira Market', 'Harar Brewery', 'Sabian Cultural Center'],
    image: '/placeholder.svg',
    coordinates: { lat: 9.5926, lng: 41.8661 },
    jobsAvailable: 320,
    culturalSites: 18,
    historicalSites: 12
  },
  {
    id: 'mekelle',
    name: 'Mekelle',
    region: 'Tigray',
    population: '545,000',
    elevation: '2,254 m',
    description: 'The capital of Tigray region, known for its ancient rock-hewn churches and as a gateway to the Danakil Depression.',
    keyIndustries: ['Mining', 'Agriculture', 'Education', 'Tourism', 'Government'],
    attractions: ['Abreha we Atsbeha Church', 'Wukro Chirkos', 'Tigray Rock Churches', 'Mekelle University'],
    image: '/placeholder.svg',
    coordinates: { lat: 13.4967, lng: 39.4753 },
    jobsAvailable: 280,
    culturalSites: 35,
    historicalSites: 28
  },
  {
    id: 'gondar',
    name: 'Gondar',
    region: 'Amhara',
    population: '390,000',
    elevation: '2,133 m',
    description: 'Former imperial capital known for its medieval castles and churches, often called the "Camelot of Africa".',
    keyIndustries: ['Tourism', 'Agriculture', 'Education', 'Handicrafts', 'Government'],
    attractions: ['Fasil Ghebbi', 'Debre Berhan Selassie Church', 'Fasilides Bath', 'Simien Mountains'],
    image: '/placeholder.svg',
    coordinates: { lat: 12.6115, lng: 37.4663 },
    jobsAvailable: 195,
    culturalSites: 42,
    historicalSites: 38
  },
  {
    id: 'awassa',
    name: 'Awassa',
    region: 'SNNP',
    population: '450,000',
    elevation: '1,708 m',
    description: 'A resort city on the shores of Lake Awassa, known for its pleasant climate and vibrant fish market.',
    keyIndustries: ['Tourism', 'Fishing', 'Agriculture', 'Manufacturing', 'Education'],
    attractions: ['Lake Awassa', 'Awassa Fish Market', 'Senkelle Wildlife Sanctuary', 'Wondo Genet Hot Springs'],
    image: '/placeholder.svg',
    coordinates: { lat: 7.0469, lng: 38.4739 },
    jobsAvailable: 240,
    culturalSites: 22,
    historicalSites: 15
  },
  {
    id: 'bahir-dar',
    name: 'Bahir Dar',
    region: 'Amhara',
    population: '410,000',
    elevation: '1,840 m',
    description: 'A beautiful lakeside city on Lake Tana, known for its Blue Nile Falls and island monasteries.',
    keyIndustries: ['Tourism', 'Fishing', 'Agriculture', 'Education', 'Manufacturing'],
    attractions: ['Blue Nile Falls', 'Lake Tana Monasteries', 'Blue Nile Bridge', 'Bahir Dar University'],
    image: '/placeholder.svg',
    coordinates: { lat: 11.5942, lng: 37.3895 },
    jobsAvailable: 210,
    culturalSites: 28,
    historicalSites: 24
  },
  {
    id: 'jimma',
    name: 'Jimma',
    region: 'Oromia',
    population: '207,000',
    elevation: '1,780 m',
    description: 'A major coffee-producing center in southwestern Ethiopia, known for its rich coffee culture and history.',
    keyIndustries: ['Coffee Production', 'Agriculture', 'Education', 'Manufacturing', 'Trade'],
    attractions: ['Jimma Aba Jifar Palace', 'Jimma University', 'Coffee Plantations', 'Jimma Museum'],
    image: '/placeholder.svg',
    coordinates: { lat: 7.6773, lng: 36.8344 },
    jobsAvailable: 165,
    culturalSites: 19,
    historicalSites: 16
  },
  {
    id: 'dessie',
    name: 'Dessie',
    region: 'Amhara',
    population: '200,000',
    elevation: '2,470 m',
    description: 'An important commercial center in northern Ethiopia, known for its strategic location and trading heritage.',
    keyIndustries: ['Trade & Commerce', 'Agriculture', 'Manufacturing', 'Transportation'],
    attractions: ['Dessie Market', 'Boru Meda', 'Tossa Suci Hill', 'Dessie-Kombolcha Industrial Park'],
    image: '/placeholder.svg',
    coordinates: { lat: 11.1342, lng: 39.6328 },
    jobsAvailable: 145,
    culturalSites: 16,
    historicalSites: 12
  }
];

export const CitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getCityByName = (name: string): CityData | undefined => {
    return ethiopianCitiesData.find(city => 
      city.name.toLowerCase() === name.toLowerCase()
    );
  };

  const getCitiesByRegion = (region: string): CityData[] => {
    return ethiopianCitiesData.filter(city => 
      city.region.toLowerCase().includes(region.toLowerCase())
    );
  };

  const getTopCities = (limit: number = 8): CityData[] => {
    return ethiopianCitiesData
      .sort((a, b) => b.jobsAvailable - a.jobsAvailable)
      .slice(0, limit);
  };

  const value = {
    cities: ethiopianCitiesData,
    getCityByName,
    getCitiesByRegion,
    getTopCities
  };

  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
};
