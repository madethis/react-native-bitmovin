import { ForwardedRef, useMemo } from "react";
import {
  Player,
  PlayerAPI,
  PlayerEvent,
} from "bitmovin-player/modules/bitmovinplayer-core";
import { useRef, useEffect, MutableRefObject } from "react";
import { View } from "react-native";
import {
  BitmovinVideoPlayerConfig,
  BitmovinVideoProps,
  BitmovinVideoSourceConfig,
} from "./BitmovinVideoProps";
import { BitmovinVideoRef } from "./BitmovinVideoRef";

import PolyfillModule from "bitmovin-player/modules/bitmovinplayer-polyfill";
import EngineBitmovinModule from "bitmovin-player/modules/bitmovinplayer-engine-bitmovin";
import EngineNativeModule from "bitmovin-player/modules/bitmovinplayer-engine-native";
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
// import { UIFactory, UIManager } from "bitmovin-player-ui";
type UIManager = any;

Player.addModule(EngineBitmovinModule);
Player.addModule(EngineNativeModule);
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
  ref,
  ...rest
}: {
  container: MutableRefObject<View>;
  ref: ForwardedRef<BitmovinVideoRef>;
} & BitmovinVideoProps) => {
  const player = useRef<PlayerAPI | null>(null);
  const previousEventHandlersRef = useRef<{
    [event: string]: (event: any) => void;
  }>({});

  function setPlayer(p: PlayerAPI | null) {
    player.current = p;
    if (!ref) {
      return;
    }

    if ("current" in ref) {
      ref.current = p;
    }

    if (typeof ref === "function") {
      ref(p);
    }
  }

  const [configHash, configHashWithoutUi] = useMemo(() => {
    const { ui: _ui, ...rest } = config;
    return [JSON.stringify(config), JSON.stringify(rest)];
  }, [config]);

  useEffect(() => {
    // https://cdn.bitmovin.com/player/web/8/docs/index.html
    const newPlayer = new Player(container.current as any, config);
    setPlayer(newPlayer);
    previousEventHandlersRef.current = {};

    return () => {
      newPlayer.pause();
      newPlayer.destroy();
    };
  }, [configHashWithoutUi]);

  useSyncUi(player, config, configHash);

  // NB. Must be after player ref update effect to catch first player instance
  useSyncEventHandlers(player, rest, previousEventHandlersRef);

  useSyncSource(player, source, configHashWithoutUi);
};

function useSyncSource(
  player: MutableRefObject<PlayerAPI | null>,
  source: BitmovinVideoSourceConfig,
  configHash: string
) {
  useEffect(() => {
    if (!player.current) {
      return;
    }

    if (source) {
      player.current?.load(source);
    } else {
      player.current?.unload();
    }
  }, [configHash, source]);
}

function useSyncEventHandlers(
  player: MutableRefObject<PlayerAPI | null>,
  props: Partial<BitmovinVideoProps>,
  previousEventHandlersRef: MutableRefObject<{
    [event: string]: (event: any) => void;
  }>
) {
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

function useSyncUi(
  player: MutableRefObject<PlayerAPI | null>,
  config: BitmovinVideoPlayerConfig,
  configHash: string
) {
  const uiManagerRef = useRef<UIManager>();

  const uiHash = useMemo(() => {
    return JSON.stringify(config.ui);
  }, [configHash]);

  useEffect(() => {
    const p = player.current;

    uiManagerRef.current?.release();
    if (!p) {
      return;
    }

    const showUi = config.ui !== false;

    // New player, no ui
    if (showUi) {
      // uiManagerRef.current = UIFactory.buildDefaultUI(p);
    }
  }, [configHash, uiHash]);
}
