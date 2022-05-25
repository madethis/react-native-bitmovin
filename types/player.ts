import { SubtitleTrack } from "./media";

type String = string;
type Boolean = boolean;
type List<T> = Array<T>;
type Int = number;
type Double = number;
type Long = number;
type Float = number;

type ByteArray = Uint8Array;

// Android type!
// https://developer.android.com/reference/kotlin/android/view/ViewGroup.html
type ViewGroup = never;

type AdsManager = never;
type ImaSdkSettings = never;

export type PlayerConfig = {
  key?: string;
  styleConfig: StyleConfig;
  playbackConfig: PlaybackConfig;
  licensingConfig: LicensingConfig;
  advertisingConfig: AdvertisingConfig;
  remoteControlConfig: RemoteControlConfig;
  adaptationConfig: AdaptationConfig;
  networkConfig: NetworkConfig;
  liveConfig: LiveConfig;
  tweaksConfig: TweaksConfig;
  bufferConfig: BufferConfig;
};

export type BufferConfig = {
  audioAndVideo: BufferMediaTypeConfig;
  startupThreshold: Double;
  restartThreshold: Double;
};

export type BufferMediaTypeConfig = {
  forwardDuration: Double;
};

export type TweaksConfig = {
  timeChangedInterval: Double;
  bandwidthEstimateWeightLimit: Int;
  languagePropertyNormalization: Boolean;
  localDynamicDashWindowUpdateInterval?: Double;
  useFiletypeExtractorFallbackForHls: Boolean;
  useDrmSessionForClearPeriods: Boolean;
  useDrmSessionForClearSources: Boolean;
  shouldApplyTtmlRegionWorkaround: Boolean;
  devicesThatRequireSurfaceWorkaround: List<DeviceDescription>;
};

type DeviceName = {
  type: "DeviceName";
  name: string;
};

type ModelName = {
  type: "ModelName";
  name: string;
};

export type DeviceDescription = DeviceName | ModelName;

export type LiveConfig = {
  lowLatencyConfig?: LowLatencyConfig;
  synchronization: List<SynchronizationConfigEntry>;
  liveEdgeOffset: Double;
  minTimeShiftBufferDepth: Double;
};

export type SynchronizationConfigEntry = {
  source: String;
  method: LiveSynchronizationMethod;
};

export type LiveSynchronizationMethod = "Ntp";

export type LowLatencySynchronizationConfig = {
  playbackRateThreshold: Double;
  seekThreshold: Double;
  playbackRate: Float;
};

export type LowLatencyConfig = {
  targetLatency: Double;
  catchupConfig: LowLatencySynchronizationConfig;
  fallbackConfig: LowLatencySynchronizationConfig;
};

export type AdaptationConfig = {
  initialBandwidthEstimateOverride?: Long;
  maxSelectableVideoBitrate: Int;
  isRebufferingAllowed: Boolean;
  preload: Boolean;
};

export type NetworkConfig = {
  preprocessHttpRequestCallback?: PreprocessHttpRequestCallback;
  preprocessHttpResponseCallback?: PreprocessHttpResponseCallback;
};

export type PreprocessHttpRequestCallback = {
  preprocessHttpRequest(
    type: HttpRequestType,
    request: HttpRequest
  ): Promise<HttpRequest>;
};

export type PreprocessHttpResponseCallback = {
  preprocessHttpResponse(
    type: HttpRequestType,
    response: HttpResponse
  ): Promise<HttpResponse>;
};

export type HttpRequest = {
  body?: ByteArray;
  headers?: { [key: string]: string };
  url: string;
};

export type HttpResponse = {
  httpRequest: HttpRequest;
  url: String;
  status: Int;
  headers: Map<String, String>;
  body: ByteArray;
};

export type HttpRequestType =
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

export type RemoteControlConfig = {
  receiverStylesheetUrl?: String;
  customReceiverConfig?: { [key: string]: string | null };
  isCastEnabled: Boolean;
  sendManifestRequestsWithCredentials: Boolean;
  sendSegmentRequestsWithCredentials: Boolean;
  sendDrmLicenseRequestsWithCredentials: Boolean;
};

export type LicensingConfig = { delay: Int };

export type AdvertisingConfig = {
  schedule: List<AdItem>;
  companionAdContainers?: List<CompanionAdContainer>;
  adsManagerAvailableCallback?: AdsManagerAvailableCallback;
  beforeInitialization?: BeforeInitializationCallback;
};

export type AdsManagerAvailableCallback = {
  onAdsManagerAvailable(adsManager: AdsManager): void;
};

export type BeforeInitializationCallback = {
  beforeInitialization(settings: ImaSdkSettings): void;
};

export type CompanionAdContainer = {
  container: ViewGroup;
  width: Int;
  height: Int;
};

export type AdItem = {
  sources: Array<AdSource>;
  position: String;
  replaceContentDuration: Double;
  preloadOffset: Double;
};

export type AdSource = {
  type: AdSourceType;
  tag: String;
};

export type AdSourceType = "Progressive" | "Unknown" | "Ima";

export type StyleConfig = {
  isUiEnabled: Boolean;
  playerUiCss: String;
  supplementalPlayerUiCss?: string;
  playerUiJs: string;
  isHideFirstFrame: Boolean;
  scalingMode: ScalingMode;
};

export type PlaybackConfig = {
  isAutoplayEnabled: Boolean;
  isMuted: Boolean;
  isTimeShiftEnabled: Boolean;
  videoCodecPriority: List<String>;
  audioCodecPriority: List<String>;
  isTunneledPlaybackEnabled: Boolean;
  seekMode: SeekMode;
  forcedSubtitleCallback?: ForcedSubtitleCallback;
  audioFilter: MediaFilter;
  videoFilter: MediaFilter;
};

export type ScalingMode = "Zoom" | "Stretch" | "Fit";

export type SeekMode = "NextSync" | "PreviousSync" | "ClosestSync" | "Exact";

export type ForcedSubtitleCallback = {
  isForcedSubtitle(subtitleTrack: SubtitleTrack): boolean;
};

export type MediaFilter = "None" | "Loose" | "Strict";
