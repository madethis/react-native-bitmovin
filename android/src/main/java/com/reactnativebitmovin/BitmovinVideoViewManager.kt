@file:JvmName("RNTBitmovinVideoManager")
package com.reactnativebitmovin

import android.graphics.Color
import android.util.Log
import android.view.View
import com.bitmovin.player.PlayerView
import com.bitmovin.player.api.LicensingConfig
import com.bitmovin.player.api.Player
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class BitmovinVideoViewManager : SimpleViewManager<View>() {
  override fun getName() = "BitmovinVideo"

  override fun createViewInstance(reactContext: ThemedReactContext): BitmovinVideoView {
    Log.d("BitmovinVideoViewM", "instantiate!")
    return BitmovinVideoView(reactContext)
  }

  @ReactProp(name = "source")
  fun setSource(view: BitmovinVideoView, source: String) {
    view.source = source
  }

//  @ReactProp(name = "playerConfig")
//  fun setConfig(view: BitmovinVideoView, source: PlayerConfig) {
//
//  }

  @ReactProp(name = "licenseKey")
  fun setLicenseKey(view: BitmovinVideoView, licenseKey: String) {
    view.licenseKey = licenseKey
  }

  /*
  @ReactProp(name = "licenseKey")
  fun setSource(view: BitmovinVideoView, source: String) {
    view.setSource(source)
  }

  override fun onDropViewInstance(view: BitmovinVideoView) {
    view.cleanup()
  }*/
}