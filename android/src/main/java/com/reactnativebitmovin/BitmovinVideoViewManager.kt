package com.reactnativebitmovin

import android.util.Log
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.event.PlayerEvent
import com.bitmovin.player.api.event.SourceEvent
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

val eventMap =
    mapOf(
        "onReady" to PlayerEvent.Ready::class,
        "onError" to PlayerEvent.Error::class,
        "onTimeChanged" to PlayerEvent.TimeChanged::class,
        "onSourceLoaded" to SourceEvent.Loaded::class,
    )

val availableEvents = eventMap.keys.associate {
    it.substring(2).lowercase() to mapOf("phasedRegistrationNames" to mapOf("bubbled" to it))
}


class BitmovinVideoViewManager : SimpleViewManager<BitmovinVideoView>() {
    override fun getName() = "RNTBitmovinVideo"

    override fun createViewInstance(reactContext: ThemedReactContext): BitmovinVideoView {
        return BitmovinVideoView(reactContext)
    }

    @ReactProp(name = "source")
    fun setSource(view: BitmovinVideoView, source: ReadableMap?) {
        view.source =
            source?.let(
                fun(source: ReadableMap): SourceConfig? {
                    val url = source.getString("dash") ?: return null

                    return SourceConfig.fromUrl(url)
                }
            )
    }

    @ReactProp(name = "config")
    fun setConfig(view: BitmovinVideoView, config: ReadableMap?) {
        view.config = Config(playerConfig = PlayerConfig(config?.getString("key")!!))
    }

    @ReactProp(name = "_events")
    fun registerEvents(view: BitmovinVideoView, events: ReadableArray?) {
        val eventSet = mutableSetOf<String>()
        for (i in 0 until events?.size()!!) {
            val event = events.getString(i)
            if (event.isNotEmpty()) {
                eventSet += event
            }
        }
        view.registerEvents(eventSet)
    }

    override fun onDropViewInstance(view: BitmovinVideoView) {
        super.onDropViewInstance(view)
        view.cleanup()
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
        return availableEvents
    }
}
