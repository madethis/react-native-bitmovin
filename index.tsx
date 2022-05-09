import React, { FC, useContext, VFC } from "react";
import { ViewStyle } from "react-native";
import { NativeBitmovinVideo } from "./NativeBitmovinVideo";

type BitmovinVideoProps = {
  source: string;
  style?: ViewStyle;
  licenseKey?: string;
};

export const BitmovinVideo: VFC<BitmovinVideoProps> = ({
  source,
  style,
  ...props
}) => {
  const context = useContext(Context);

  const licenseKey = props.licenseKey || context.licenseKey;

  return (
    <NativeBitmovinVideo
      source={source}
      style={style}
      licenseKey={licenseKey}
    />
  );
};

const Context = React.createContext<{ licenseKey?: string }>({});

export const BitmovinVideoProvider: FC<{ licenseKey: string }> = ({
  children,
  licenseKey,
}) => {
  return <Context.Provider value={{ licenseKey }}>{children}</Context.Provider>;
};
