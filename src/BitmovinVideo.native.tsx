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

function mapNativeEvent(handler: (event: any) => void) {
  return (event: { nativeEvent: any }) => {
    return handler(event.nativeEvent);
  };
}

const NativeBitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeBitmovinVideoProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const BitmovinVideo: VoidFunctionComponent<BitmovinVideoProps> = ({
  source,
  config,
  ...props
}) => {
  const events = [];
  const childProps: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(props)) {
    childProps[key] = value;

    if (key.startsWith("on")) {
      events.push(key.substring(2).toLowerCase());
      if (typeof value === "function") {
        childProps[key] = mapNativeEvent(value);
      }
    }
  }

  return (
    <NativeBitmovinVideo
      // Config as earliest prop
      config={config}
      _events={events as Lowercase<BitmovinEvent>[]}
      {...childProps}
      // Source as last prop
      source={source}
    />
  );
};
