package com.reactnativebitmovin

import android.util.Log
import android.view.View
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class BitmovinVideoViewManager : SimpleViewManager<View>() {
  override fun getName() = "RNTBitmovinVideo"

  override fun createViewInstance(reactContext: ThemedReactContext): BitmovinVideoView {
    return BitmovinVideoView(reactContext)
  }

  @ReactProp(name = "source")
  fun setSource(view: BitmovinVideoView, source: ReadableMap?) {
    Log.d(TAG, "setSource")
    view.source =
        source?.let(
            fun(source: ReadableMap): SourceConfig? {
              val url = source.getString("url")

              if (url == null) {
                return null
              }

              Log.d(TAG, "Setting source: $url")
              return SourceConfig.fromUrl(url)
            }
        )
  }

  @ReactProp(name = "config")
  fun setConfig(view: BitmovinVideoView, config: ReadableMap?) {
    Log.d(TAG, "setConfig")
    view.config = PlayerConfig(config?.getString("key")!!)
  }

  // override fun onDropViewInstance(view: BitmovinVideoView) {
  //   view.cleanup()
  // }
}
