package com.reactnativebitmovin

import android.util.Log
import android.view.View
import android.widget.FrameLayout
import android.widget.LinearLayout
import com.bitmovin.player.PlayerView
import com.bitmovin.player.api.Player
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.event.Event
import com.bitmovin.player.api.event.PlayerEvent
import com.bitmovin.player.api.event.SourceEvent
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.reactnativebitmovin.BitmovinVideoViewManager.Companion.eventMap
import kotlin.properties.Delegates
import kotlin.reflect.KClass

/**
 * Heavily inspired by
 * https://github.com/react-native-video/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/ReactExoplayerView.java
 */
class BitmovinVideoView(context: ThemedReactContext) :

    FrameLayout(context), LifecycleEventListener {

    companion object {
        const val TAG = "BitmovinVideoView"

        val eventKlassMap =
            eventMap.toList().associate { (k, v) -> k.substring(2).lowercase() to v }
        val klassEventMap = eventKlassMap.toList().associate { (k, v) -> v to k }

    }

    private val eventEmitter: @Suppress("deprecation") RCTEventEmitter

    init {
        eventEmitter = @Suppress("deprecation") context.getJSModule(RCTEventEmitter::class.java)
    }

    private var playerView: PlayerView? = null
    private var player: Player? = null

    private var registeredEvents: Set<String> = mutableSetOf()

    var source: SourceConfig? by Delegates.observable(null) { _, _, _ -> startPlayer("source") }
    var config: PlayerConfig? by Delegates.observable(null) { _, _, _ -> startPlayer("config") }

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
        view.layout(view.left, view.top, view.measuredWidth, view.measuredHeight)
    }

    private fun startPlayer(newProp: String) {
        Log.d(TAG, "start player $newProp")
        val config = this.config ?: return

        if (playerView == null || newProp == "config") {

            Log.d(TAG, "Creating player view $config")

            player?.pause()
            player?.destroy()
            this.removeView(playerView)

            player = Player.create(context, config)
            val view = PlayerView(context, player)

            playerView = view

            updateEvents(registeredEvents, true)

            val layoutParams =
                LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
            view.layoutParams = layoutParams
            this.addView(playerView, 0, layoutParams)

            this.source?.let {
                player?.load(it)
            }
        }

        reLayout(playerView)

        if (newProp == "source") {
            val source = this.source
            if (source != null) {
                player?.load(source)
            } else {
                player?.unload()
            }
        }
    }

    private val onEvent = { event: Event ->
        val name = klassEventMap[event::class]
        Log.d(TAG, "Emitting event $name")
        val data = Arguments.createMap()
        data.putString("type", name)
        setEventData(event, data)
        @Suppress("deprecation") this.eventEmitter.receiveEvent(id, name, data)
    }

    private fun setEventData(event: Event, data: WritableMap) {
        when (event) {
            is PlayerEvent.TimeChanged -> {
                data.putDouble("time", event.time)
            }
            is PlayerEvent.Error -> {
                data.putInt("code", event.code.value)
                data.putString("message", event.message)
            }
            is PlayerEvent.Warning -> {
                data.putInt("code", event.code.value)
                data.putString("message", event.message)
            }
            is SourceEvent.Error -> {
                data.putInt("code", event.code.value)
                data.putString("message", event.message)
            }
            else -> {}
        }
    }

    fun registerEvents(events: Set<String>) {
        // If player not ready, just set events
        val player = this.player
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

    private fun updateEvents(events: Set<String>, add: Boolean) {
        val player = this.player ?: return

        Log.d(TAG, "Updating events (${add}): $events")

        for (event in events) {
            val klass: KClass<out Event>? = eventKlassMap[event]

            if (klass == null) {
                Log.w(TAG, "Unmapped event type: $event")
                continue
            }

            if (add) {
                player.on(klass, onEvent)
            } else {
                player.off(klass, onEvent)
            }
        }
    }

    fun cleanup() {
        player?.apply {
            pause()
            destroy()
        }
    }

    fun play() {
        player?.play()
    }

    fun pause() {
        player?.pause()
    }
}
