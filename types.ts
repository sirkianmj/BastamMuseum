export enum CameraMode {
  ORBIT = 'ORBIT',
  CINEMATIC = 'CINEMATIC'
}

export enum ViewMode {
  ARTICLE = 'ARTICLE',
  ARCHIVE = 'ARCHIVE',
  CINEMA = 'CINEMA'
}

export interface Artifact {
  id: string;
  name: string;
  url: string | null; // null implies default placeholder
  description: string;
  fileName?: string;
  chapter?: string; // Optional linkage to article chapters
}