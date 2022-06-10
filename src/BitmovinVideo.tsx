import React, { useRef, VFC } from "react";
import { View } from "react-native";
import { BitmovinVideoProps } from "./BitmovinVideoProps";
import { usePlayer } from "./player";
// @ts-ignore
import("bitmovin-player-ui/dist/css/bitmovinplayer-ui.min.css");

export const BitmovinVideo: VFC<BitmovinVideoProps> = ({ style, ...props }) => {
  const container = useRef<View>(undefined!);

  usePlayer({ container, ...props });

  return <View ref={container} style={style} />;
};
