import { PlayerConfig, PlayerEventMap, SourceConfig } from "bitmovin-player";
import type { PlayerEvent as PlayerEventEnum } from "bitmovin-player";

import { ViewStyle } from "react-native";

export type BitmovinVideoProps = {
  source: Pick<
    SourceConfig,
    "dash" | "hls" | "smooth" | "progressive" | "title" | "description"
  >;
  style?: ViewStyle;
  config: Pick<PlayerConfig, "key" | "playback" | "ui" | "style">;
} & BitmovinVideoEventProps;

export type BitmovinVideoEventProps = {
  [key in BitmovinEvent as `on${key}`]?: (
    event: key extends keyof typeof PlayerEventEnum
      ? PlayerEventMap[typeof PlayerEventEnum[key]]
      : any
  ) => void;
};

export type BitmovinEvent =
  | "Ready"
  | "Play"
  | "Playing"
  | "Paused"
  | "Seek"
  | "Seeked"
  | "TimeShift"
  | "TimeShifted"
  | "VolumeChanged"
  | "Muted"
  | "Unmuted"
  | "PlayerResized"
  | "PlaybackFinished"
  | "Error"
  | "Warning"
  | "StallStarted"
  | "StallEnded"
  | "AudioChanged"
  | "AudioAdded"
  | "AudioRemoved"
  | "VideoQualityChanged"
  | "AudioQualityChanged"
  | "VideoDownloadQualityChange"
  | "AudioDownloadQualityChange"
  | "VideoDownloadQualityChanged"
  | "AudioDownloadQualityChanged"
  | "VideoPlaybackQualityChanged"
  | "AudioPlaybackQualityChanged"
  | "TimeChanged"
  | "CueParsed"
  | "CueEnter"
  | "SegmentPlayback"
  | "Metadata"
  | "MetadataParsed"
  | "MetadataChanged"
  | "VideoAdaptation"
  | "AudioAdaptation"
  | "DownloadFinished"
  | "SegmentRequestFinished"
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
  | "PlaybackSpeedChanged"
  | "DurationChanged"
  | "ViewModeChanged"
  | "ModuleReady"
  | "SubtitleEnable"
  | "SubtitleEnabled"
  | "SubtitleDisable"
  | "SubtitleDisabled"
  | "VideoQualityAdded"
  | "VideoQualityRemoved"
  | "AudioQualityAdded"
  | "AudioQualityRemoved"
  | "TargetLatencyChanged"
  | "LatencyModeChanged"
  | "LicenseValidated"
  | "DrmLicenseAdded"
  | "AspectRatioChanged"

  // Android
  | "FullscreenEnabled"
  | "FullscreenEnter"
  | "FullscreenExit"
  | "PictureInPictureAvailabilityChanged"
  | "PictureInPictureEnter"
  | "PictureInPictureExit"

  // iOS: https://bitmovin.com/docs/player/api-reference/ios/ios-sdk-api-reference-v3#/player/ios/3/docs/index.html
  | "ControlsHide"
  | "ControlsShow"
  | "SourceError";

export type BitmovinVideoPlayerConfig = Omit<PlayerConfig, "events">;
