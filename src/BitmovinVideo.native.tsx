import { Platform, UIManager, requireNativeComponent } from "react-native";
import { BitmovinVideoProps } from "./BitmovinVideoProps";

const LINKING_ERROR =
  `The package 'react-native-bitmovin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

const ComponentName = "RNTBitmovinVideo";

export const BitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BitmovinVideoProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
