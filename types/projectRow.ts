export interface ProjectRow {
  id: string;
  title: string;
  published: boolean;
  path: string;
  description: string;
  images: {
    name: string;
    url: string;
  }[];
  labels: string[];
  date: number;
}