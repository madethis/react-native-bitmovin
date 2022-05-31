import {
  Platform,
  UIManager,
  requireNativeComponent,
  ViewStyle,
} from "react-native";
import { BitmovinPlayerConfig } from "./types/player";
import { BitmovinSourceConfig } from "./types/source";

const LINKING_ERROR =
  `The package 'react-native-bitmovin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

export type NativeBitmovinVideoProps = {
  source: BitmovinSourceConfig;
  style?: ViewStyle;
  config: BitmovinPlayerConfig;
};

const ComponentName = "RNTBitmovinVideo";

export const NativeBitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeBitmovinVideoProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
