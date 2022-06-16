import {
  PlaybackConfig,
  PlayerConfig,
  PlayerEventMap,
  SourceConfig,
  StyleConfig,
} from "bitmovin-player";
import type { PlayerEvent as PlayerEventEnum } from "bitmovin-player";

import { Simplify } from "type-fest";

import { ViewStyle } from "react-native";

export type BitmovinVideoPlayerConfig = Simplify<
  Pick<PlayerConfig, "key"> & {
    style?: BitmovinVideoStyleConfig;
    playback?: BitmovinVideoPlaybackConfig;
  }
>;

export type BitmovinVideoStyleConfig = Simplify<StyleConfig>;

export type BitmovinVideoPlaybackConfig = Simplify<
  Pick<
    PlaybackConfig,
    "autoplay" | "muted" | "timeShift" | "seeking" | "audioLanguage"
  >
>;

type BitmovinVideoSourceConfig = Simplify<
  Pick<
    SourceConfig,
    | "dash"
    | "hls"
    | "smooth"
    | "progressive"
    | "title"
    | "description"
    | "drm"
    | "metadata"
    | "poster"
  >
>;

export type BitmovinVideoProps = Simplify<
  {
    source: BitmovinVideoSourceConfig;
    style?: ViewStyle;
    config: BitmovinVideoPlayerConfig;
  } & BitmovinVideoEventProps
>;

export type BitmovinVideoEventProps = {
  [key in BitmovinVideoEvent as `on${key}`]?: (
    event: key extends keyof typeof PlayerEventEnum
      ? PlayerEventMap[typeof PlayerEventEnum[key]]
      : any
  ) => void;
};

export type BitmovinVideoEvent =
  | "Ready"
  | "Play"
  | "Playing"
  | "Paused"
  | "Seek"
  | "Seeked"
  | "TimeShift"
  | "TimeShifted"
  // | "VolumeChanged"
  | "Muted"
  | "Unmuted"
  | "PlayerResized"
  | "PlaybackFinished"
  | "Error"
  | "Warning"
  | "StallStarted"
  | "StallEnded"
  // | "AudioChanged"
  // | "AudioAdded"
  // | "AudioRemoved"
  // | "VideoQualityChanged"
  // | "AudioQualityChanged"
  // | "VideoDownloadQualityChange"
  // | "AudioDownloadQualityChange"
  // | "VideoDownloadQualityChanged"
  // | "AudioDownloadQualityChanged"
  // | "VideoPlaybackQualityChanged"
  // | "AudioPlaybackQualityChanged"
  | "TimeChanged"
  // | "SegmentPlayback"
  // | "Metadata"
  // | "MetadataParsed"
  // | "MetadataChanged"
  // | "VideoAdaptation"
  // | "AudioAdaptation"
  // | "DownloadFinished"
  // | "SegmentRequestFinished"
  | "CastAvailable"
  | "CastStopped"
  | "CastStart"
  | "CastStarted"
  | "CastWaitingForDevice"
  | "SourceLoaded"
  | "SourceUnloaded"
  | "AirplayAvailable"
  | "AirplayChanged"
  | "Destroy"
  // | "PlaybackSpeedChanged"
  | "DurationChanged"
  // | "ViewModeChanged"
  // | "ModuleReady"
  // | "SubtitleEnable"
  // | "SubtitleEnabled"
  // | "SubtitleDisable"
  // | "SubtitleDisabled"
  // | "VideoQualityAdded"
  // | "VideoQualityRemoved"
  // | "AudioQualityAdded"
  // | "AudioQualityRemoved"
  // | "TargetLatencyChanged"
  // | "LatencyModeChanged"
  // | "LicenseValidated"
  // | "DrmLicenseAdded"
  // | "AspectRatioChanged"
  //
  // // Android
  // | "FullscreenEnabled"
  // | "FullscreenEnter"
  // | "FullscreenExit"
  | "PictureInPictureAvailabilityChanged"
  | "PictureInPictureEnter"
  | "PictureInPictureExit"

  // iOS: https://bitmovin.com/docs/player/api-reference/ios/ios-sdk-api-reference-v3#/player/ios/3/docs/index.html
  | "ControlsHide"
  | "ControlsShow"
  | "SourceError";
