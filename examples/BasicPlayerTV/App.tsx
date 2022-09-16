import React, { useEffect, useRef } from "react";
import { Button, View } from "react-native";
import { TVEventHandler, useTVEventHandler } from "react-native";

import "react-native/tvos-types.d";

import {
  BitmovinVideo,
  BitmovinVideoProps,
  BitmovinVideoRef,
} from "react-native-bitmovin";

// @ts-ignore
import { BITMOVIN_LICENSE_KEY } from "./bitmovin-license-key";

const videos: (BitmovinVideoProps["source"] & { title: string })[] = [
  {
    title: "Sintel",
    hls: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    dash: "https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd",
  },
  {
    title: "Art of motion",
    hls: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    dash: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
  },
];

const App = () => {
  const ref = useRef<BitmovinVideoRef>(null);
  const toggleRef = useRef(false);

  useTVEventHandler((event) => {
    console.log("tv event", event);
    if (event.eventType === "select") {
      // Ok/primary button on android tv
      if (!toggleRef.current) {
        ref.current?.play();
      } else {
        ref.current?.pause();
      }
      toggleRef.current = !toggleRef.current;
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Button hasTVPreferredFocus title="" />
      <BitmovinVideo
        ref={ref}
        config={{
          key: BITMOVIN_LICENSE_KEY,
          ui: false,
          playback: { autoplay: true },
        }}
        source={videos[1]}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#000000",
        }}
      />
    </View>
  );
};

export default App;
