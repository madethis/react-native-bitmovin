import { Player, PlayerAPI } from "bitmovin-player/modules/bitmovinplayer-core";
import { UIFactory } from "bitmovin-player-ui";
import { useRef, useEffect, MutableRefObject } from "react";
import { View } from "react-native";
import { BitmovinVideoProps } from "./BitmovinVideoProps";

import PolyfillModule from "bitmovin-player/modules/bitmovinplayer-polyfill";
import EngineBitmovinModule from "bitmovin-player/modules/bitmovinplayer-engine-bitmovin";
import MseRendererModule from "bitmovin-player/modules/bitmovinplayer-mserenderer";
import HlsModule from "bitmovin-player/modules/bitmovinplayer-hls";
import XmlModule from "bitmovin-player/modules/bitmovinplayer-xml";
import DashModule from "bitmovin-player/modules/bitmovinplayer-dash";
import AbrModule from "bitmovin-player/modules/bitmovinplayer-abr";
import ContainerTSModule from "bitmovin-player/modules/bitmovinplayer-container-ts";
import ContainerMp4Module from "bitmovin-player/modules/bitmovinplayer-container-mp4";
import SubtitlesModule from "bitmovin-player/modules/bitmovinplayer-subtitles";
import SubtitlesCEA608Module from "bitmovin-player/modules/bitmovinplayer-subtitles-cea608";
import StyleModule from "bitmovin-player/modules/bitmovinplayer-style";

Player.addModule(EngineBitmovinModule);
Player.addModule(PolyfillModule);
Player.addModule(MseRendererModule);
Player.addModule(HlsModule);
Player.addModule(XmlModule);
Player.addModule(DashModule);
Player.addModule(AbrModule);
Player.addModule(ContainerTSModule);
Player.addModule(ContainerMp4Module);
Player.addModule(SubtitlesModule);
Player.addModule(SubtitlesCEA608Module);
Player.addModule(StyleModule);

export const usePlayer = ({
  container,
  config,
  source,
}: { container: MutableRefObject<View> } & Pick<
  BitmovinVideoProps,
  "config" | "source"
>) => {
  const player = useRef<PlayerAPI>();

  const configHash = JSON.stringify(config);

  useEffect(() => {
    const newPlayer = new Player(container.current as any, config);
    UIFactory.buildDefaultUI(newPlayer);
    player.current = newPlayer;

    return () => {
      newPlayer.pause();
      newPlayer.destroy();
    };
  }, [configHash]);

  useEffect(() => {
    if (!player.current) {
      return;
    }

    player.current?.unload();
    if (source) {
      player.current?.load(source);
    } else {
    }
  }, [
    configHash, // Trigger load on changed config as well
    source,
  ]);
};
