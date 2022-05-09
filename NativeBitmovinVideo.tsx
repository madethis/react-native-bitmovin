import {
  Platform,
  ViewStyle,
  UIManager,
  requireNativeComponent,
} from "react-native";

const LINKING_ERROR =
  `The package 'react-native-bitmovin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

type BitmovinProps = {
  source: string;
  style?: ViewStyle;
};

const ComponentName = "RNTBitmovinVideo";

export const NativeBitmovinVideo =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BitmovinProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
