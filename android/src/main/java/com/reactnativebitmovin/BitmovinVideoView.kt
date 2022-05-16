package com.reactnativebitmovin

import kotlin.properties.Delegates
import android.os.Handler
import android.os.Looper
import android.widget.FrameLayout
import com.bitmovin.player.PlayerView
import com.bitmovin.player.api.Player
import com.bitmovin.player.api.PlayerConfig;
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.uimanager.ThemedReactContext

const TAG = "ReactNativeBitmovinVideoView"

/**
 * Heavily inspired by
 * https://github.com/react-native-video/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/ReactExoplayerView.java
 */
class BitmovinVideoView : FrameLayout, LifecycleEventListener {

    private var playerView: PlayerView? = null
    private var player: Player? = null

    var source: String? by Delegates.observable(null) { _, _, newValue ->
        startPlayer()
    }

    constructor(context: ThemedReactContext) : super(context) {}

    override fun onAttachedToWindow() {}
    override fun onDetachedFromWindow() {}

    override fun onHostResume() {}
    override fun onHostPause() {}
    override fun onHostDestroy() {}

    private fun startPlayer() {
        notImpl

        Log.d(TAG, "startPlayer")
        if (source == null) {
            Log.d(TAG, "source is null")
            return
        }

        Handler(Looper.getMainLooper()).postDelayed({
            Log.d(TAG, "startPlayer delayed")

            val playerConfig = PlayerConfig()

            TODO("Make android player view work")

            // See https://github.dev/bitmovin/bitmovin-player-android-samples/blob/main/BasicAds/src/main/java/com/bitmovin/player/samples/ads/basic/MainActivity.java#L70

            // TODO
            // playerConfig.licenseKey = ...

            // playerView = new PlayerView(this, Player.create(this, playerConfig));
            // playerView.setLayoutParams(
            //         new LinearLayout.LayoutParams(
            //                 LinearLayout.LayoutParams.MATCH_PARENT,
            //                 LinearLayout.LayoutParams.MATCH_PARENT
            //         )
            // );
    
            // playerView.getPlayer().load(SourceConfig.fromUrl("https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd"));

        }, 1)
    }
}