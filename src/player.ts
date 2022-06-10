import {
  Player,
  PlayerAPI,
  PlayerEvent,
} from "bitmovin-player/modules/bitmovinplayer-core";
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
  ...rest
}: { container: MutableRefObject<View> } & BitmovinVideoProps) => {
  const player = useRef<PlayerAPI | undefined>(undefined);
  const previousEventHandlersRef = useRef<{
    [event: string]: (event: any) => void;
  }>({});

  const configHash = JSON.stringify(config);

  useEffect(() => {
    // https://cdn.bitmovin.com/player/web/8/docs/index.html
    const newPlayer = new Player(container.current as any, config);
    UIFactory.buildDefaultUI(newPlayer);
    player.current = newPlayer;
    previousEventHandlersRef.current = {};

    return () => {
      newPlayer.pause();
      newPlayer.destroy();
    };
  }, [configHash]);

  // NB. Must be after player ref update effect to catch first player instance
  useUpdateEventHandlers({ player, props: rest, previousEventHandlersRef });

  useEffect(() => {
    if (!player.current) {
      return;
    }

    if (source) {
      player.current?.load(source);
    } else {
      player.current?.unload();
    }
  }, [
    configHash, // Trigger load on changed config as well
    source,
  ]);
};

function useUpdateEventHandlers({
  player,
  props,
  previousEventHandlersRef,
}: {
  player: MutableRefObject<PlayerAPI | undefined>;
  props: Partial<BitmovinVideoProps>;
  previousEventHandlersRef: MutableRefObject<{
    [event: string]: (event: any) => void;
  }>;
}) {
  const eventHandlersChangedRef = useRef<number>(0);
  const ob = Object.entries(props);
  const entries = ob
    .flatMap(([key, handler]): [string, (event: any) => void][] => {
      if (key.startsWith("on") && typeof handler === "function") {
        return [[key.substring(2).toLowerCase(), handler]];
      }

      return [];
    })
    .sort((a, b) => (a[0] as string).localeCompare(b[0]));

  if (Object.keys(previousEventHandlersRef.current).length !== entries.length) {
    eventHandlersChangedRef.current++;
  } else {
    if (
      entries.some(([event, handler]) => {
        return handler !== previousEventHandlersRef.current[event as string];
      })
    ) {
      eventHandlersChangedRef.current++;
    }
  }

  useEffect(() => {
    const p = player.current;
    if (!p) {
      return;
    }

    const previousEventHandlers = previousEventHandlersRef.current;
    previousEventHandlersRef.current = Object.fromEntries(entries);

    for (const [event, handler] of entries) {
      const previousHandler = previousEventHandlers[event as string];
      const newHandler = previousHandler !== handler;

      if (newHandler) {
        p.off(event as PlayerEvent, previousHandler);
      }

      if (!previousHandler || newHandler) {
        p.on(event as PlayerEvent, handler);
      }
    }
  }, [eventHandlersChangedRef.current]);
}
