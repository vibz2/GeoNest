// Disasters
export interface Disaster {
  name: string;
  preventive_measures: string[];
}

export interface DisastersData {
  disasters: Disaster[];
}

// houses
export interface House {
  streetAddress: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
}

export interface HousesData {
  houses: House[];
}
