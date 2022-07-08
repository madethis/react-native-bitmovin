package com.reactnativebitmovin

import android.util.Log
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.event.PlayerEvent
import com.bitmovin.player.api.event.SourceEvent
import com.bitmovin.player.api.source.SourceConfig
import com.bitmovin.player.api.ui.StyleConfig
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.reactnativebitmovin.BitmovinVideoView.Companion.TAG

class BitmovinVideoViewManager : SimpleViewManager<BitmovinVideoView>() {

    companion object {
        val eventMap =
            mapOf(
                "onReady" to PlayerEvent.Ready::class,
                "onError" to PlayerEvent.Error::class,
                "onTimeChanged" to PlayerEvent.TimeChanged::class,
                "onSourceLoaded" to SourceEvent.Loaded::class,
                "onPlaying" to PlayerEvent.Playing::class,
                "onPaused" to PlayerEvent.Paused::class,
                "onSeek" to PlayerEvent.Seek::class,
                "onSeeked" to PlayerEvent.Seeked::class,
                "onTimeShift" to PlayerEvent.TimeShift::class,
                "onTimeShifted" to PlayerEvent.TimeShifted::class,
                "onMuted" to PlayerEvent.Muted::class,
                "onUnmuted" to PlayerEvent.Unmuted::class,
                "onPlayerResized" to PlayerEvent.VideoSizeChanged::class,
                "onPlaybackFinished" to PlayerEvent.PlaybackFinished::class,
                "onError" to PlayerEvent.Error::class,
                "onWarning" to PlayerEvent.Warning::class,
                "onStallStarted" to PlayerEvent.StallStarted::class,
                "onStallEnded" to PlayerEvent.StallEnded::class,
                "onTimeChanged" to PlayerEvent.TimeChanged::class,
                "onCastAvailable" to PlayerEvent.CastAvailable::class,
                "onCastStopped" to PlayerEvent.CastStopped::class,
                "onCastStart" to PlayerEvent.CastStart::class,
                "onCastStarted" to PlayerEvent.CastStarted::class,
                "onCastWaitingForDevice" to PlayerEvent.CastWaitingForDevice::class,
                "onSourceLoaded" to SourceEvent.Loaded::class,
                "onSourceUnloaded" to SourceEvent.Unloaded::class,
                "onDestroy" to PlayerEvent.Destroy::class,
                "onDurationChanged" to SourceEvent.DurationChanged::class,
                "onPictureInPictureAvailabilityChanged" to PlayerEvent.PictureInPictureAvailabilityChanged::class,
                "onPictureInPictureEnter" to PlayerEvent.PictureInPictureEnter::class,
                "onPictureInPictureExit" to PlayerEvent.PictureInPictureExit::class,
                "onDownloadFinished" to SourceEvent.DownloadFinished::class,
                "onSourceError" to SourceEvent.Error::class,
            )

        val availableEvents =
            eventMap.keys.associate {
                it.substring(2).lowercase() to
                        mapOf("phasedRegistrationNames" to mapOf("bubbled" to it))
            }
    }

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
    fun setConfig(view: BitmovinVideoView, propValue: ReadableMap?) {
        if (propValue == null) {
            view.config = null
            return
        }

        val key = propValue.getString("key")!!

        val currentConfig = view.config
        val playerConfig: PlayerConfig = if (key === currentConfig?.key) {
            currentConfig
        } else {
            PlayerConfig(key)
        }

        val styleConfig = getStyleConfig(propValue.getMap("style"))

        if (styleConfig != null) {
            Log.d(TAG, "Setting style $styleConfig")
            playerConfig.styleConfig = styleConfig
        }

        view.config = playerConfig;
    }

    private fun getStyleConfig(map: ReadableMap?): StyleConfig? {
        if (map == null) {
            return null
        }

        val styleConfig = StyleConfig(
            isUiEnabled = map.getBoolean("isUiEnabled"),
        )

        map.getString("playerUiJs")?.let {
            styleConfig.playerUiJs = it
        }

        map.getString("playerUiCss")?.let {
            styleConfig.playerUiCss = it
        }

        map.getString("supplementalUiCss")?.let {
            styleConfig.supplementalPlayerUiCss = it
        }

        if (map.hasKey("hideFirstFrame")) {
            styleConfig.isHideFirstFrame = map.getBoolean("hideFirstFrame")
        }

        return styleConfig
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

    override fun receiveCommand(root: BitmovinVideoView, commandId: String?, args: ReadableArray?) {
        super.receiveCommand(root, commandId, args)

        when (commandId) {
            "play" -> root.play()
            "pause" -> root.pause()
            else -> throw IllegalArgumentException("Unknown command: $commandId")
        }
    }
}
