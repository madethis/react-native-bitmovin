import { useReducer, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { BitmovinVideo, BitmovinVideoProps } from "react-native-bitmovin";

import { BITMOVIN_LICENSE_KEY } from "./bitmovin-license-key";

const videos: (BitmovinVideoProps["source"] & { title: string })[] = [
  {
    title: "Art of motion",
    hls: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  },
  {
    title: "Sintel",
    hls: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  },
];

const App = () => {
  const [_, render] = useReducer((state) => state + 1, 0);
  const [autoplay, setAutoplay] = useState(true);
  const [show, setShow] = useState(true);
  const [source, setSource] = useState(videos[0]);

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
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={{ width: "80%" }}>
          {show && (
            <BitmovinVideo
              config={{
                key: BITMOVIN_LICENSE_KEY,
                ui: false,
                playback: { autoplay },
              }}
              source={source}
            />
          )}
        </View>
        <View style={{ flex: 1, flexGrow: 1 }}>
          <Button
            title={show ? "Deactivate player" : "Activate player"}
            onPress={() => {
              setShow((v) => !v);
            }}
          />
          <Button
            title={autoplay ? "Disable autoplay" : "Enable autoplay"}
            onPress={() => {
              setAutoplay((v) => !v);
            }}
          />
          <Button
            title="Render"
            onPress={() => {
              render();
            }}
          />
          <FlatList
            keyExtractor={(item) => item.title}
            data={videos}
            extraData={source}
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
                  key={item.title}
                  style={{ padding: 16 }}
                  onPress={() => setSource(item)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ flex: 1, color: "black" }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: "#555" }}>&gt;</Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
