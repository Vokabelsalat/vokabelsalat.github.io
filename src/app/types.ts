export type EventType = "Position" | "Presentation" | "Publication" | "Teaching";

export interface MyEvent {
  title: string;
  coordinates: { lat: number, lon: number }
  location: string;
  type: EventType;
}

export const EventTypeColors : Record<EventType, string> = {
  'Position': '#33a02c',  
  'Presentation': '#e31a1c', 
  'Publication': '#ff7f00', 
  'Teaching': '#1f78b4'  
}

export interface Event {
  type?: 'point' | 'range';
  start?: Date;
  end?: Date;
}

export interface Position extends Event {
  title: string;
  institution: string;
  location: string;
  period: string;
  details?: string[];
  link?: string;
}

export interface Workshop extends Event {
  title: string;
  institution: string;
  authors?: string;
  location: string;
  date: string;
  details?: string[];
  link?: string;
}

export interface Publication extends Event {
  title: string;
  year: string;
  authors: string;
  reference: string;
  doi?: string;
}

export interface TableEntry {
  text: string;
}
