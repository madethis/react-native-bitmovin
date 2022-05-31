package com.reactnativebitmovin

import android.util.Log
import android.view.View
import android.widget.FrameLayout
import android.widget.LinearLayout
import com.bitmovin.player.PlayerView
import com.bitmovin.player.api.Player
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.uimanager.ThemedReactContext
import kotlin.properties.Delegates

const val TAG = "BitmovinVideoView"

/**
 * Heavily inspired by
 * https://github.com/react-native-video/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/ReactExoplayerView.java
 */
class BitmovinVideoView : FrameLayout, LifecycleEventListener {

    constructor(context: ThemedReactContext) : super(context) {
        this.reactContext = context
    }

    private var reactContext: ThemedReactContext

    private var playerView: PlayerView? = null
    private var player: Player? = null

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

        Log.d(TAG, "reLayout")
        if (view == null) return
        Log.d(TAG, "reLayout has view")
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
        Log.d(TAG, "prop set: $newProp")

        val config = this.config
        if (config == null) {
            Log.d(TAG, "config is null")
            return
        }

        //        Handler(Looper.getMainLooper())
        //            .postDelayed(

        if (playerView == null || newProp == "config") {
            // playerView?.getPlayer()?.destroy()

            val view = PlayerView(reactContext, Player.create(reactContext, config))

            playerView = view

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
                player?.play()
            } else {
                player?.unload()
            }
        }
    }
}
