// types.ts
export interface Disaster {
  name: string;
  preventive_measures: string[];
}

export interface DisastersData {
  disasters: Disaster[];
}
