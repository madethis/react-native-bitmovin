import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  VFC,
} from "react";
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
import {
  BitmovinVideo,
  BitmovinVideoPlayerConfig,
  BitmovinVideoProps,
  BitmovinVideoRef,
} from "react-native-bitmovin";

// @ts-ignore
import { BITMOVIN_LICENSE_KEY } from "./bitmovin-license-key";

const videos: (BitmovinVideoProps["source"] & { title: string })[] = [
  {
    title: "Art of motion",
    dash: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
    hls: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  },
  {
    title: "Sintel",
    dash: "https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd",
    hls: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  },
  {
    title: "Bad video",
    dash: "https://www.google.com",
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

const config: BitmovinVideoPlayerConfig = {
  key: BITMOVIN_LICENSE_KEY,
};

const App = () => {
  const ref = useRef<BitmovinVideoRef>(null!);
  const [_, render] = useReducer((state) => state + 1, 0);
  const [autoplay, setAutoplay] = useState(true);
  const [show, setShow] = useState(true);
  const [source, setSource] = useState(videos[0]);
  const [ui, setUi] = useState<boolean>(true);

  const { width, height } = useScreenDimensions();
  const [logs, l] = useReducer(
    (state: [Date, string][], action: string): [Date, string][] => {
      return [[new Date(), action], ...state].slice(0, 1000) as [
        Date,
        string
      ][];
    },
    []
  );

  const log = useCallback((event: any) => {
    console.log("event", event);
    l(event.type);
  }, []);

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
              ref={ref}
              onReady={log}
              onSourceLoaded={log}
              onTimeChanged={log}
              onError={log}
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
        </View>
        <FlatList
          keyExtractor={(item) => item.title}
          style={{ flexShrink: 1, flexGrow: 0 }}
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
        <FlatList
          keyExtractor={([d, v]) => `${d.toISOString()}-${v}`}
          style={{ flex: 1, flexGrow: 1, borderWidth: 3, borderColor: "red" }}
          data={logs}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: "#ccc",
              }}
            />
          )}
          renderItem={({ item }) => {
            return <LogItem date={item[0]} message={item[1]} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const LogItem: VFC<{ date: Date; message: string }> = memo(
  ({ date, message }) => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={{ flex: 1, color: "black" }}>{date.toISOString()}</Text>
        <Text style={{ color: "#555" }}>{message}</Text>
      </View>
    );
  }
);
