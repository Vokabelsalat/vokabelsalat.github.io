export interface Position {
  title: string;
  institution: string;
  location: string;
  period: string;
  details?: string[];
  link?: string;
}

export interface Workshop {
  title: string;
  institution: string;
  authors?: string;
  location: string;
  date: string;
  details?: string[];
  link?: string;
}

export interface Publication {
  title: string;
  year: string;
  authors: string;
  reference: string;
  doi?: string;
}

export interface TableEntry {
  text: string;
}
