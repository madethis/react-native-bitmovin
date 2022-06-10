package com.reactnativebitmovin

import android.util.Log
import android.view.View
import android.widget.FrameLayout
import android.widget.LinearLayout
import com.bitmovin.player.PlayerView
import com.bitmovin.player.api.Player
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.event.PlayerEvent
import com.bitmovin.player.api.event.SourceEvent
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import kotlin.properties.Delegates

const val TAG = "BitmovinVideoView"

data class Config(val playerConfig: PlayerConfig)
/**
 * Heavily inspired by
 * https://github.com/react-native-video/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/ReactExoplayerView.java
 */
class BitmovinVideoView : FrameLayout, LifecycleEventListener {

    private val eventEmitter: @Suppress("deprecation") RCTEventEmitter

    private var reactContext: ThemedReactContext

    private var playerView: PlayerView? = null
    private var player: Player? = null

    private var registeredEvents: Set<String> = mutableSetOf()

    constructor(context: ThemedReactContext) : super(context) {
        this.reactContext = context

        eventEmitter =
                @Suppress("deprecation") reactContext.getJSModule(RCTEventEmitter::class.java)
    }

    var source: SourceConfig? by Delegates.observable(null) { _, _, _ -> startPlayer("source") }
    var config: Config? by Delegates.observable(null) { _, _, _ -> startPlayer("config") }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        reLayout(playerView)
    }
    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
    }

    override fun onHostResume() {}
    override fun onHostPause() {}
    override fun onHostDestroy() {}

    override fun requestLayout() {
        Log.d(TAG, "requestLayout")
        super.requestLayout()
        post(Runnable { reLayout(this) })
    }

    private fun reLayout(view: View?) {
        if (view == null) return
        view.measure(
                MeasureSpec.makeMeasureSpec(measuredWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(measuredHeight, MeasureSpec.EXACTLY)
        )
        view.layout(
                view.getLeft(),
                view.getTop(),
                view.getMeasuredWidth(),
                view.getMeasuredHeight()
        )
    }

    private fun startPlayer(newProp: String) {
        Log.d(TAG, "start player")
        val config = this.config
        if (config == null) {
            return
        }

        if (playerView == null || newProp == "config") {

            Log.d(TAG, "Creating player view ${config}")

            playerView?.getPlayer()?.pause()
            playerView?.getPlayer()?.destroy()

            val player = Player.create(reactContext, config.playerConfig)

            val view = PlayerView(reactContext, player)

            playerView = view

            updateEvents(registeredEvents, true)

            val layoutParams =
                    LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
            view.layoutParams = layoutParams
            this.addView(playerView, 0, layoutParams)
        }

        reLayout(playerView)

        if (newProp == "source") {
            val source = this.source
            val player = playerView?.getPlayer()
            if (source != null) {
                player?.load(source)
            } else {
                player?.unload()
            }
        }
    }

    private fun emitEvent(event: String, data: WritableMap? = null) {
        Log.d(TAG, "Emitting event $event")
        @Suppress("deprecation") eventEmitter.receiveEvent(id, event, data)
    }

    private val onReady = { event: PlayerEvent -> emitEvent("ready") }
    private val onSourceLoaded = { event: SourceEvent -> emitEvent("sourceloaded") }

    fun registerEvents(events: Set<String>) {
        // If player not ready, just set events
        val player = playerView?.getPlayer()
        if (player == null) {
            registeredEvents = events
            return
        }

        // If player ready, update event listeners
        val removeEvents = registeredEvents - events
        val addEvents = events - registeredEvents

        updateEvents(addEvents, true)
        updateEvents(removeEvents, false)
        registeredEvents = events
    }

    fun updateEvents(events: Set<String>, add: Boolean) {
        val player = playerView?.getPlayer()
        if (player == null) {
            return
        }

        Log.d(TAG, "Updating events (${add}): ${events}")

        for (event in events) {
            // Apply event listener change
            when (event) {
                "ready" ->
                        if (add) {
                            player.on(PlayerEvent.Ready::class, onReady)
                        } else {
                            player.off(PlayerEvent.Ready::class, onReady)
                        }
                "onSourceLoaded" ->
                        if (add) {
                            player.on(SourceEvent.Loaded::class, onSourceLoaded)
                        } else {
                            player.off(SourceEvent.Loaded::class, onSourceLoaded)
                        }
            }
        }
    }

    fun cleanup() {
        playerView?.getPlayer()?.pause()
        playerView?.getPlayer()?.destroy()
    }
}
