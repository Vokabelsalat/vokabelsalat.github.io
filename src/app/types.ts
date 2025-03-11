export interface Position {
  title: string;
  institution: string;
  location: string;
  period: string;
  details?: string[];
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
