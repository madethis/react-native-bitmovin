import { PlayerConfig, SourceConfig } from "bitmovin-player";
import { ViewStyle } from "react-native";

export type BitmovinVideoProps = {
  source: Pick<
    SourceConfig,
    "dash" | "hls" | "smooth" | "progressive" | "title" | "description"
  >;
  style?: ViewStyle;
  config: Pick<PlayerConfig, "key" | "playback" | "ui">;
};
