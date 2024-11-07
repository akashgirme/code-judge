export interface InfoData {
  heading: string;
  intro?: string;
  sections: {
    header: string;
    paragraphs: string[];
  }[];
}
