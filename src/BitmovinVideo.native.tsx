import React, { VoidFunctionComponent, useMemo } from "react";
import { Platform, UIManager, requireNativeComponent } from "react-native";
import {
  BitmovinVideoEvent,
  BitmovinVideoPlayerConfig,
  BitmovinVideoProps,
} from "./BitmovinVideoProps";

type NativeProps = BitmovinVideoProps & {
  _events: Lowercase<BitmovinVideoEvent>[];
  config: Omit<BitmovinVideoPlayerConfig, "ui" | "style"> & {
    style: {
      isUiEnabled?: boolean;
      playerUiJs?: string;
      playerUiCss?: string;
      supplementalPlayerUiCss?: string;
    };
  };
};

const LINKING_ERROR =
  `The package 'react-native-bitmovin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

const ComponentName = "RNTBitmovinVideo";

function mapNativeEvent(handler: (event: any) => void) {
  return (event: { nativeEvent: any }) => {
    return handler(event.nativeEvent);
  };
}

const NativeBitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeProps>(ComponentName)
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

  const nativeConfig = useMemo(() => {
    const styleConfig = buildStyleConfig(config);
    return {
      ...config,
      style: styleConfig,
    };
  }, [config]);

  return (
    <NativeBitmovinVideo
      // Config as earliest prop
      config={nativeConfig}
      _events={events as Lowercase<BitmovinVideoEvent>[]}
      {...childProps}
      // Source as last prop
      source={source}
    />
  );
};

function buildStyleConfig(
  config: BitmovinVideoPlayerConfig
): NativeProps["config"]["style"] {
  if (config.ui === false) {
    return { isUiEnabled: false };
  }

  return {
    isUiEnabled: true,
    playerUiJs: config.ui?.jsUri,
    playerUiCss: config.ui?.cssUri,
    supplementalPlayerUiCss: config.ui?.extraCssUri,
  };
}
