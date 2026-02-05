export enum AppStage {
  ASKING = 'ASKING',
  SUCCESS = 'SUCCESS',
}

export interface PoemResponse {
  poem: string;
}

export interface ImageResponse {
  imageUrl: string;
}
