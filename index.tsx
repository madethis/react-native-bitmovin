import React, { VFC } from "react";
import { ViewStyle } from "react-native";
import { NativeBitmovinVideo } from "./NativeBitmovinVideo";

export const BitmovinVideo: VFC<{ source: string; style?: ViewStyle }> = ({
  source,
  style,
}) => {
  return <NativeBitmovinVideo source={source} style={style} />;
};
