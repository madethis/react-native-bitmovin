import {
  BitmovinSubtitleTrack,
  BitmovinThumbnailTrack,
  BitmovinAudioTrack,
} from "./media";

export type BitmovinSourceConfig = {
  dash: string; // Android
  hls: string; // iOS
  smooth: string; // Windows
  progressive: string; // Fallback w/o manifest
  type?: BitmovinSourceType;
  title?: string;
  description?: string;
  posterSource?: string;
  isPosterPersistent?: boolean;
  subtitleTracks?: Array<BitmovinSubtitleTrack>;
  thumbnailTrack?: BitmovinThumbnailTrack;
  drmConfig?: BitmovinDrmConfig;
  labelingConfig?: BitmovinLabelingConfig;
  vrConfig?: BitmovinVrConfig;
  videoCodecPriority?: Array<string>;
  audioCodecPriority?: Array<string>;
  options?: BitmovinSourceOptions;
  metadata?: { [key: string]: string };
};

export type BitmovinLabelingConfig = {
  subtitleLabeler?: BitmovinSubtitleLabeler;
  audioLabeler?: BitmovinAudioLabeler;
  videoQualityLabeler?: BitmovinVideoQualityLabeler;
  audioQualityLabeler?: BitmovinAudioQualityLabeler;
};

export type BitmovinSubtitleLabeler = {
  getSubtitleLabel(subtitleTrack: BitmovinSubtitleTrack): string;
};

export type BitmovinAudioLabeler = {
  getAudioLabel(subtitleTrack: BitmovinAudioTrack): string;
};

export type BitmovinVideoQualityLabeler = {
  getVideoQualityLabel(videoQuality: BitmovinVideoQuality): string;
};

export type BitmovinAudioQualityLabeler = {
  getAudioQualityLabel(audioQuality: BitmovinAudioQuality): string;
};

export type BitmovinVideoQuality = BitmovinQuality & {
  frameRate: number;
  width: number;
  height: number;
};

export type BitmovinAudioQuality = BitmovinQuality;

export type BitmovinQuality = {
  id: string;
  label?: string;
  bitrate: number;
  codec?: string;
};

export type BitmovinVrConfig = {
  vrContentType?: BitmovinVrContentType;
  isStereo: boolean;
  startPosition: number;
  viewingDirectionChangeEventInterval: number;
  viewingDirectionChangeThreshold: number;
  viewingWindow: BitmovinVrViewingWindowConfig;
};

export type BitmovinVrViewingWindowConfig = {
  maxPitch: number;
  maxYaw: number;
  minPitch: number;
  minYaw: number;
};

export type BitmovinVrContentType = "None" | "Sbs" | "Single" | "Tab";

export type BitmovinUUID = string;

export type BitmovinDrmConfig = {
  licenseUrl?: string;
  uuid: BitmovinUUID;
};

export type BitmovinSourceOptions = {
  startOffset?: number;
  startOffsetTimelineReference?: BitmovinTimelineReferencePoint;
};

export type BitmovinTimelineReferencePoint = "End" | "Start";

export type BitmovinSourceType = "Progressive" | "Smooth" | "Hls" | "Dash";
