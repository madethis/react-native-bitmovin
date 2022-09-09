import { PlayerAPI } from "bitmovin-player";
import { UIManager, findNodeHandle } from "react-native";
import { fromEntries } from "./utils";

const bitmovinVideoRefMethodsUnstable = [
  "_startFullscreen",
  "_stopFullscreen",
] as const;

type BitmovinVideoRefMethodUnstable = {
  [Method in typeof bitmovinVideoRefMethodsUnstable[number]]: () => void;
};

function addPlayerApiMethods<Methods extends ReadonlyArray<keyof PlayerAPI>>(
  ...methods: Methods
): Methods {
  return methods;
}

const bitmovinVideoRefMethodsBuiltin = addPlayerApiMethods(
  "play",
  "pause",
  "mute",
  "unmute",
  "setVolume"
);

type BitmovinVideoRefBuiltin = {
  [Method in typeof bitmovinVideoRefMethodsBuiltin[number]]: PlayerAPI[Method];
};

const bitmovinVideoRefMethods = [
  ...bitmovinVideoRefMethodsUnstable,
  ...bitmovinVideoRefMethodsBuiltin,
] as const;

export type BitmovinVideoRef = Partial<BitmovinVideoRefMethodUnstable> &
  BitmovinVideoRefBuiltin;

export function buildBitmovinVideoRef(
  nativeRef: React.MutableRefObject<any>
): BitmovinVideoRef {
  return fromEntries(
    bitmovinVideoRefMethods.map((cmd) => [cmd, command(nativeRef, cmd)])
  );
}

function command(
  nativeRef: React.MutableRefObject<any>,
  cmd: string
): (issuer?: string | undefined) => Promise<void> {
  return async (_issuer?: string) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(nativeRef.current),
      cmd,
      []
    );
  };
}
