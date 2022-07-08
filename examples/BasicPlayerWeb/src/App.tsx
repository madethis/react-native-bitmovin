import { useCallback, useReducer, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  Slider,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  BitmovinVideo,
  BitmovinVideoProps,
  BitmovinVideoRef,
} from "react-native-bitmovin";

// @ts-ignore
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
  const ref = useRef<BitmovinVideoRef>(null!);
  const [_, render] = useReducer((state) => state + 1, 0);
  const [autoplay, setAutoplay] = useState(true);
  const [show, setShow] = useState(true);
  const [source, setSource] = useState(videos[0]);
  const [ui, setUi] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(100);

  const log = useCallback((event: any) => {
    console.debug("event", event);
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: "#222",
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
              ref={ref}
              config={{
                key: BITMOVIN_LICENSE_KEY,
                ui: ui ? undefined : false,
                playback: { autoplay, muted: true },
              }}
              onReady={log}
              onSourceLoaded={log}
              onVolumeChanged={(e) => {
                setVolume(Math.round(e.targetVolume));
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
            title={ui ? "Deactivate UI" : "Activate UI"}
            onPress={() => {
              setUi((v) => !v);
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                title="Play"
                onPress={() => {
                  ref.current?.play();
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Pause"
                onPress={() => {
                  ref.current?.pause();
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Button
                title="Mute"
                onPress={() => {
                  ref.current?.mute();
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Unmute"
                onPress={() => {
                  ref.current?.unmute();
                }}
              />
            </View>
          </View>
          <Button
            title={autoplay ? "Disable autoplay" : "Enable autoplay"}
            onPress={() => {
              setAutoplay((v) => !v);
            }}
          />
          <View style={{ flexDirection: "row", padding: ".5em" }}>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              Volume
            </Text>
            <TextInput
              style={{ textAlign: "center" }}
              value={String(volume)}
              keyboardType="numeric"
              onChangeText={(value) => {
                const n = Number(value);
                if (!isNaN(n) && n >= 0 && n <= 100) {
                  ref.current?.setVolume(n);
                  setVolume(n);
                }
              }}
            />
          </View>
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
