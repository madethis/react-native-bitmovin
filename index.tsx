import React, { VFC } from "react";
import {
  NativeBitmovinVideo,
  NativeBitmovinVideoProps,
} from "./NativeBitmovinVideo";

export const BitmovinVideo: VFC<NativeBitmovinVideoProps> = ({
  source,
  style,
  config,
}) => {
  return <NativeBitmovinVideo source={source} style={style} config={config} />;
};
