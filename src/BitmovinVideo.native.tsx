import React, {
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
  Ref,
} from "react";
import { UIManager, findNodeHandle, View } from "react-native";
import {
  BitmovinVideoEvent,
  BitmovinVideoPlayerConfig,
  BitmovinVideoProps,
  BitmovinVideoRef,
} from "./BitmovinVideoProps";
import { NativeBitmovinVideo } from "./NativeBitmovinVideo";

export type NativeProps = BitmovinVideoProps & {
  ref: Ref<View>;
  _events: Lowercase<BitmovinVideoEvent>[];
  config: Omit<BitmovinVideoPlayerConfig, "ui" | "style"> & {
    style?: {
      isUiEnabled?: boolean;
      playerUiJs?: string;
      playerUiCss?: string;
      supplementalPlayerUiCss?: string;
      userInterfaceType?: "system" | "bitmovin" | "subtitle";
    };
  };
};

export const BitmovinVideo = forwardRef<BitmovinVideoRef, BitmovinVideoProps>(
  ({ source, config, ...props }, ref) => {
    const nativeRef = useRef<any>(ref);

    usePlayerRefApi(ref, nativeRef);

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
      const styleConfig = buildStyleConfig(config.ui);
      return {
        ...config,
        style: styleConfig,
      };
    }, [config]);

    return (
      <NativeBitmovinVideo
        // Config as earliest prop
        ref={nativeRef}
        config={nativeConfig}
        _events={events as Lowercase<BitmovinVideoEvent>[]}
        {...childProps}
        // Source as last prop
        source={source}
      />
    );
  }
);

function usePlayerRefApi(
  ref: React.ForwardedRef<BitmovinVideoRef>,
  nativeRef: React.MutableRefObject<any>
) {
  useImperativeHandle(
    ref,
    () => {
      return {
        play: async (_issuer?: string) => {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(nativeRef.current),
            "play",
            []
          );
        },

        pause: async (_issuer?: string) => {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(nativeRef.current),
            "pause",
            []
          );
        },
      };
    },
    []
  );
}

function mapNativeEvent(handler: (event: any) => void) {
  return (event: { nativeEvent: any }) => {
    return handler(event.nativeEvent);
  };
}

function buildStyleConfig(
  ui: BitmovinVideoPlayerConfig["ui"]
): NativeProps["config"]["style"] {
  if (typeof ui === "boolean") {
    return { isUiEnabled: ui };
  }

  if (!ui) {
    return undefined;
  }

  return {
    isUiEnabled: true,
    userInterfaceType: ui.type,
    playerUiJs: ui.jsUri,
    playerUiCss: ui.cssUri,
    supplementalPlayerUiCss: ui.extraCssUri,
  };
}
