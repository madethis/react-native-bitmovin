export type BitmovinThumbnailTrack = BitmovinTrack & {
  type: "Thumbnail";
  url: string;
};

export type BitmovinAudioTrack = BitmovinTrack & {
  type: "Thumbnail";
  language?: string;
};

export type BitmovinSubtitleTrack = BitmovinTrack & {
  language?: string;
  mimeType?: string;
  isForced?: boolean;
};

export type BitmovinTrack = {
  url?: string;
  label?: string;
  id?: string;
  isDefault?: boolean;
  roles?: Array<BitmovinMediaTrackRole>;
};

export type BitmovinMediaTrackRole = {
  schemeIdUri: string;
  value?: string;
  id?: string;
};
