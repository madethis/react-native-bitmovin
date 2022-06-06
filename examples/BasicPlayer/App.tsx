import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScaledSize,
  StatusBar,
  Text,
  View,
} from "react-native";
import { BitmovinVideo, BitmovinVideoProps } from "react-native-bitmovin";

// @ts-ignore
import { BITMOVIN_LICENSE_KEY } from "./bitmovin-license-key";

const videos: (BitmovinVideoProps["source"] & { title: string })[] = [
  {
    title: "Art of motion",
    dash: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
  },
  {
    title: "Sintel",
    dash: "https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd",
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

const config = { key: BITMOVIN_LICENSE_KEY };

const App = () => {
  const [show, setShow] = useState(true);
  const [source, setSource] = useState(videos[0]);
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          backgroundColor: "#eee",
          flex: 1,
        }}
      >
        <View
          style={{
            width: w,
            height: h,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {show ? (
            <BitmovinVideo
              config={config}
              source={source}
              style={{
                width: w,
                height: h,
              }}
            />
          ) : (
            <Text style={{ color: "black" }}>No player</Text>
          )}
        </View>
        <Button
          title={show ? "Deactivate player" : "Activate player"}
          onPress={() => {
            setShow((v) => !v);
          }}
        />
        <FlatList
          keyExtractor={(item) => item.title}
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
                onPress={() => setSource(item)}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ flex: 1, color: "black" }}>{item.title}</Text>
                  <Text style={{ color: "#555" }}>&gt;</Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
