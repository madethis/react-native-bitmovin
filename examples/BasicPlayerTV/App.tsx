import React from 'react';
import {View} from 'react-native';

import 'react-native/tvos-types.d';

import {BitmovinVideo, BitmovinVideoProvider} from 'react-native-bitmovin';

import {BITMOVIN_LICENSE_KEY} from './bitmovin-license-key';

const videos: {title: string; url: string}[] = [
  {
    title: 'Sintel',
    url: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
  {
    title: 'Art of motion',
    url: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  },
];

const App = () => {
  return (
    <BitmovinVideoProvider licenseKey={BITMOVIN_LICENSE_KEY}>
      <View>
        <BitmovinVideo
          source={videos[0].url}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#000000',
          }}
        />
      </View>
    </BitmovinVideoProvider>
  );
};

export default App;
