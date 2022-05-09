import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScaledSize,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { BitmovinVideo } from "react-native-bitmovin";

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("screen"));

  useEffect(() => {
    const onChange = (result: { window: ScaledSize; screen: ScaledSize }) => {
      setScreenData(result.screen);
    };

    const sub = Dimensions.addEventListener("change", onChange);

    return () => {
      sub.remove();
    };
  });

  return screenData;
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const { width, height } = useScreenDimensions();

  const orientation = width > height ? "landscape" : "portrait";
  const ratio = width / height;

  let w = width;
  let h = (w * 9) / 16;

  if (width > height) {
    w = (height * 16) / 9;
    h = height;
  }

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? "black" : "#eee",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View
        style={{
          backgroundColor: isDarkMode ? "black" : "white",
          justifyContent: "flex-start",
          alignItems: "center",
          flex: 1,
        }}
      >
        <BitmovinVideo
          source="https://proxy.glenten.tv/60c1bfac679606c871f6772f/index.m3u8?drm=clear"
          style={{
            width: w,
            height: h,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
