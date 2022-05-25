import {
  Platform,
  UIManager,
  requireNativeComponent,
  ViewStyle,
} from "react-native";

const LINKING_ERROR =
  `The package 'react-native-bitmovin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

type SourceConfig = {
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

type ThumbnailTrack = Track & {
  type: "Thumbnail";
  url: string;
};

type AudioTrack = Track & {
  type: "Thumbnail";
  language?: string;
};

type SubtitleTrack = Track & {
  language?: string;
  mimeType?: string;
  isForced?: boolean;
};

type Track = {
  url?: string;
  label?: string;
  id?: string;
  isDefault?: boolean;
  roles?: Array<MediaTrackRole>;
};

type LabelingConfig = {
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

type VideoQuality = Quality & {
  frameRate: number;
  width: number;
  height: number;
};

type AudioQuality = Quality;

type Quality = {
  id: string;
  label?: string;
  bitrate: number;
  codec?: string;
};

type VrConfig = {
  vrContentType?: VrContentType;
  isStereo: boolean;
  startPosition: number;
  viewingDirectionChangeEventInterval: number;
  viewingDirectionChangeThreshold: number;
  viewingWindow: VrViewingWindowConfig;
};

type VrContentType = "None" | "Sbs" | "Single" | "Tab";

type UUID = string;

type DrmConfig = {
  licenseUrl?: string;
  uuid: UUID;
};

type MediaTrackRole = {
  schemeIdUri: string;
  value?: string;
  id?: string;
};

type SourceOptions = {
  startOffset?: number;
  startOffsetTimelineReference?: TimelineReferencePoint;
};

type TimelineReferencePoint = "End" | "Start";

type SourceType = "Progressive" | "Smooth" | "Hls" | "Dash";

type BitmovinProps = {
  source: string;
  style?: ViewStyle;
  licenseKey?: string;
};

const ComponentName = "RNTBitmovinVideo";

export const NativeBitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BitmovinProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
