import React, { forwardRef, useRef, VFC } from "react";
import { View } from "react-native";
import { BitmovinVideoProps } from "./BitmovinVideoProps";
import { BitmovinVideoRef } from "./BitmovinVideoRef";
import { usePlayer } from "./player";
// @ts-ignore
// import("bitmovin-player-ui/dist/css/bitmovinplayer-ui.min.css");

export const BitmovinVideo = forwardRef<BitmovinVideoRef, BitmovinVideoProps>(
  ({ style, ...props }, ref) => {
    const container = useRef<View>(undefined!);

    usePlayer({ container, ...props, ref });

    return <View ref={container} style={style} />;
  }
);
