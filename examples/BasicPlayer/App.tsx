import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScaledSize,
  StatusBar,
  Text,
  View,
} from "react-native";
import { BitmovinVideo, BitmovinVideoProvider } from "react-native-bitmovin";

import { BITMOVIN_LICENSE_KEY } from "./bitmovin-license-key";

const videos: { title: string; url: string }[] = [
  {
    title: "Sintel",
    url: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  },
  {
    title: "Art of motion",
    url: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  },
];

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
  const [source, setSource] = useState(videos[0].url);
  const { width, height } = useScreenDimensions();

  let w = width;
  let h = (w * 9) / 16;

  if (width > height) {
    w = (height * 16) / 9;
    h = height;
  }

  const backgroundStyle = {
    flex: 1,
    backgroundColor: "#eee",
  };

  return (
    <BitmovinVideoProvider licenseKey={BITMOVIN_LICENSE_KEY}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            backgroundColor: "#eee",
            flex: 1,
          }}
        >
          <BitmovinVideo
            source={source}
            style={{
              width: w,
              height: h,
            }}
          />
          <FlatList
            data={videos}
            extraData={source}
            style={{ flex: 1, flexGrow: 1 }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#ccc",
                }}
              />
            )}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={{ padding: 16 }}
                  onPress={() => setSource(item.url)}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 1 }}>{item.title}</Text>
                    <Text style={{ color: "#555" }}>&gt;</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </BitmovinVideoProvider>
  );
};

export default App;
