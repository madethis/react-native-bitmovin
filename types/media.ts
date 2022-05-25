export type ThumbnailTrack = Track & {
  type: "Thumbnail";
  url: string;
};

export type AudioTrack = Track & {
  type: "Thumbnail";
  language?: string;
};

export type SubtitleTrack = Track & {
  language?: string;
  mimeType?: string;
  isForced?: boolean;
};

export type Track = {
  url?: string;
  label?: string;
  id?: string;
  isDefault?: boolean;
  roles?: Array<MediaTrackRole>;
};

export type MediaTrackRole = {
  schemeIdUri: string;
  value?: string;
  id?: string;
};
