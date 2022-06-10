import React, { VoidFunctionComponent } from "react";
import { Platform, UIManager, requireNativeComponent } from "react-native";
import { BitmovinEvent, BitmovinVideoProps } from "./BitmovinVideoProps";

const LINKING_ERROR =
  `The package 'react-native-bitmovin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

const ComponentName = "RNTBitmovinVideo";

type NativeBitmovinVideoProps = BitmovinVideoProps & {
  _events: Lowercase<BitmovinEvent>[];
};

const NativeBitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeBitmovinVideoProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const BitmovinVideo: VoidFunctionComponent<BitmovinVideoProps> = (
  props
) => {
  const events = Object.entries(props).flatMap(([key]) => {
    if (key.startsWith("on")) {
      return [key.substring(2).toLowerCase()];
    }

    return [];
  });

  console.log("Subscribing to events:", events);

  return (
    <NativeBitmovinVideo
      {...props}
      _events={events as Lowercase<BitmovinEvent>[]}
    />
  );
};
