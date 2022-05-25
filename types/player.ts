import { BitmovinSubtitleTrack } from "./media";

type String = string;

type ByteArray = Uint8Array;

// Android type!
// https://developer.android.com/reference/kotlin/android/view/ViewGroup.html
type AndroidViewGroup = never;

type BitmovinAdsManager = never;
type BitmovinImaSdkSettings = never;

export type BitmovinPlayerConfig = {
  key?: string;
  styleConfig: BitmovinStyleConfig;
  playbackConfig: BitmovinPlaybackConfig;
  licensingConfig: BitmovinLicensingConfig;
  advertisingConfig: BitmovinAdvertisingConfig;
  remoteControlConfig: BitmovinRemoteControlConfig;
  adaptationConfig: BitmovinAdaptationConfig;
  networkConfig: BitmovinNetworkConfig;
  liveConfig: BitmovinLiveConfig;
  tweaksConfig: BitmovinTweaksConfig;
  bufferConfig: BitmovinBufferConfig;
};

export type BitmovinBufferConfig = {
  audioAndVideo: BitmovinBufferMediaTypeConfig;
  startupThreshold: number;
  restartThreshold: number;
};

export type BitmovinBufferMediaTypeConfig = {
  forwardDuration: number;
};

export type BitmovinTweaksConfig = {
  timeChangedInterval: number;
  bandwidthEstimateWeightLimit: number;
  languagePropertyNormalization: boolean;
  localDynamicDashWindowUpdateInterval?: number;
  useFiletypeExtractorFallbackForHls: boolean;
  useDrmSessionForClearPeriods: boolean;
  useDrmSessionForClearSources: boolean;
  shouldApplyTtmlRegionWorkaround: boolean;
  devicesThatRequireSurfaceWorkaround: Array<BitmovinDeviceDescription>;
};

type DeviceName = {
  type: "DeviceName";
  name: string;
};

type ModelName = {
  type: "ModelName";
  name: string;
};

export type BitmovinDeviceDescription = DeviceName | ModelName;

export type BitmovinLiveConfig = {
  lowLatencyConfig?: BitmovinLowLatencyConfig;
  synchronization: Array<BitmovinSynchronizationConfigEntry>;
  liveEdgeOffset: number;
  minTimeShiftBufferDepth: number;
};

export type BitmovinSynchronizationConfigEntry = {
  source: string;
  method: BitmovinLiveSynchronizationMethod;
};

export type BitmovinLiveSynchronizationMethod = "Ntp";

export type BitmovinLowLatencySynchronizationConfig = {
  playbackRateThreshold: number;
  seekThreshold: number;
  playbackRate: number;
};

export type BitmovinLowLatencyConfig = {
  targetLatency: number;
  catchupConfig: BitmovinLowLatencySynchronizationConfig;
  fallbackConfig: BitmovinLowLatencySynchronizationConfig;
};

export type BitmovinAdaptationConfig = {
  initialBandwidthEstimateOverride?: number;
  maxSelectableVideoBitrate: number;
  isRebufferingAllowed: boolean;
  preload: boolean;
};

export type BitmovinNetworkConfig = {
  preprocessHttpRequestCallback?: BitmovinPreprocessHttpRequestCallback;
  preprocessHttpResponseCallback?: BitmovinPreprocessHttpResponseCallback;
};

export type BitmovinPreprocessHttpRequestCallback = {
  preprocessHttpRequest(
    type: BitmovinHttpRequestType,
    request: BitmovinHttpRequest
  ): Promise<BitmovinHttpRequest>;
};

export type BitmovinPreprocessHttpResponseCallback = {
  preprocessHttpResponse(
    type: BitmovinHttpRequestType,
    response: BitmovinHttpResponse
  ): Promise<BitmovinHttpResponse>;
};

export type BitmovinHttpRequest = {
  body?: ByteArray;
  headers?: { [key: string]: string };
  url: string;
};

export type BitmovinHttpResponse = {
  httpRequest: BitmovinHttpRequest;
  url: string;
  status: number;
  headers: { [key: string]: string };
  body: ByteArray;
};

export type BitmovinHttpRequestType =
  | "Unknown"
  | "KeyHlsAes"
  | "DrmLicenseWidevine"
  | "MediaThumbnails"
  | "MediaSubtitles"
  | "MediaVideo"
  | "MediaAudio"
  | "MediaProgressive"
  | "ManifestSmooth"
  | "ManifestHlsVariant"
  | "ManifestHlsMaster"
  | "ManifestDash";

export type BitmovinRemoteControlConfig = {
  receiverStylesheetUrl?: string;
  customReceiverConfig?: { [key: string]: string | null };
  isCastEnabled: boolean;
  sendManifestRequestsWithCredentials: boolean;
  sendSegmentRequestsWithCredentials: boolean;
  sendDrmLicenseRequestsWithCredentials: boolean;
};

export type BitmovinLicensingConfig = { delay: number };

export type BitmovinAdvertisingConfig = {
  schedule: Array<BitmovinAdItem>;
  companionAdContainers?: Array<BitmovinCompanionAdContainer>;
  adsManagerAvailableCallback?: BitmovinAdsManagerAvailableCallback;
  beforeInitialization?: BitmovinBeforeInitializationCallback;
};

export type BitmovinAdsManagerAvailableCallback = {
  onAdsManagerAvailable(adsManager: BitmovinAdsManager): void;
};

export type BitmovinBeforeInitializationCallback = {
  beforeInitialization(settings: BitmovinImaSdkSettings): void;
};

export type BitmovinCompanionAdContainer = {
  container: AndroidViewGroup;
  width: number;
  height: number;
};

export type BitmovinAdItem = {
  sources: Array<BitmovinAdSource>;
  position: string;
  replaceContentDuration: number;
  preloadOffset: number;
};

export type BitmovinAdSource = {
  type: BitmovinAdSourceType;
  tag: string;
};

export type BitmovinAdSourceType = "Progressive" | "Unknown" | "Ima";

export type BitmovinStyleConfig = {
  isUiEnabled: boolean;
  playerUiCss: string;
  supplementalPlayerUiCss?: string;
  playerUiJs: string;
  isHideFirstFrame: boolean;
  scalingMode: BitmovinScalingMode;
};

export type BitmovinPlaybackConfig = {
  isAutoplayEnabled: boolean;
  isMuted: boolean;
  isTimeShiftEnabled: boolean;
  videoCodecPriority: Array<String>;
  audioCodecPriority: Array<String>;
  isTunneledPlaybackEnabled: boolean;
  seekMode: BitmovinSeekMode;
  forcedSubtitleCallback?: BitmovinForcedSubtitleCallback;
  audioFilter: BitmovinMediaFilter;
  videoFilter: BitmovinMediaFilter;
};

export type BitmovinScalingMode = "Zoom" | "Stretch" | "Fit";

export type BitmovinSeekMode =
  | "NextSync"
  | "PreviousSync"
  | "ClosestSync"
  | "Exact";

export type BitmovinForcedSubtitleCallback = {
  isForcedSubtitle(subtitleTrack: BitmovinSubtitleTrack): boolean;
};

export type BitmovinMediaFilter = "None" | "Loose" | "Strict";
