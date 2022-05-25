import { SubtitleTrack, ThumbnailTrack, AudioTrack } from "./media";

export type SourceConfig = {
  url: string;
  type: SourceType;
  title?: string;
  description?: string;
  posterSource?: string;
  isPosterPersistent: boolean;
  subtitleTracks: Array<SubtitleTrack>;
  thumbnailTrack?: ThumbnailTrack;
  drmConfig?: DrmConfig;
  labelingConfig: LabelingConfig;
  vrConfig: VrConfig;
  videoCodecPriority: Array<string>;
  audioCodecPriority: Array<string>;
  options: SourceOptions;
  metadata: { [key: string]: string };
};

export type LabelingConfig = {
  subtitleLabeler?: SubtitleLabeler;
  audioLabeler?: AudioLabeler;
  videoQualityLabeler?: VideoQualityLabeler;
  audioQualityLabeler?: AudioQualityLabeler;
};

export type SubtitleLabeler = {
  getSubtitleLabel(subtitleTrack: SubtitleTrack): string;
};

export type AudioLabeler = {
  getAudioLabel(subtitleTrack: AudioTrack): string;
};

export type VideoQualityLabeler = {
  getVideoQualityLabel(videoQuality: VideoQuality): string;
};

export type AudioQualityLabeler = {
  getAudioQualityLabel(audioQuality: AudioQuality): string;
};

export type VideoQuality = Quality & {
  frameRate: number;
  width: number;
  height: number;
};

export type AudioQuality = Quality;

export type Quality = {
  id: string;
  label?: string;
  bitrate: number;
  codec?: string;
};

export type VrConfig = {
  vrContentType?: VrContentType;
  isStereo: boolean;
  startPosition: number;
  viewingDirectionChangeEventInterval: number;
  viewingDirectionChangeThreshold: number;
  viewingWindow: VrViewingWindowConfig;
};

export type VrViewingWindowConfig = {
  maxPitch: number;
  maxYaw: number;
  minPitch: number;
  minYaw: number;
};

export type VrContentType = "None" | "Sbs" | "Single" | "Tab";

export type UUID = string;

export type DrmConfig = {
  licenseUrl?: string;
  uuid: UUID;
};

export type SourceOptions = {
  startOffset?: number;
  startOffsetTimelineReference?: TimelineReferencePoint;
};

export type TimelineReferencePoint = "End" | "Start";

export type SourceType = "Progressive" | "Smooth" | "Hls" | "Dash";

export type NativeProps = {};
