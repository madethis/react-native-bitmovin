package com.reactnativebitmovin

import android.graphics.Color
import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class BitmovinVideoViewManager : SimpleViewManager<View>() {
  override fun getName() = "BitmovinVideo"

  override fun createViewInstance(reactContext: ThemedReactContext): BitmovinVideoView {
    return BitmovinVideoView(reactContext)
  }

  @ReactProp(name = "source")
  fun setSource(view: BitmovinVideoView, source: String) {
    view.setSource(source)
  }

  override fun onDropViewInstance(view: BitmovinVideoView) {
    view.cleanup()
  }
}