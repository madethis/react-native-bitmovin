package com.reactnativebitmovin

import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.FrameLayout
import android.widget.LinearLayout
import com.bitmovin.player.PlayerView
import com.bitmovin.player.api.Player
import com.bitmovin.player.api.PlayerConfig
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.uimanager.ThemedReactContext
import kotlin.properties.Delegates

const val TAG = "ReactNativeBitmovinVideoView"

/**
 * Heavily inspired by
 * https://github.com/react-native-video/react-native-video/blob/master/android-exoplayer/src/main/java/com/brentvatne/exoplayer/ReactExoplayerView.java
 */
class BitmovinVideoView : FrameLayout, LifecycleEventListener {

    private var playerView: PlayerView? = null
    private var player: Player? = null

    var source: String? by Delegates.observable(null) { _, _, _ -> startPlayer() }

    var licenseKey: String? by Delegates.observable(null) { _, _, _ -> startPlayer() }

    constructor(context: ThemedReactContext) : super(context) {}

    override fun onAttachedToWindow() {}
    override fun onDetachedFromWindow() {}

    override fun onHostResume() {}
    override fun onHostPause() {}
    override fun onHostDestroy() {}

    private fun startPlayer() {
        Log.d(TAG, "startPlayer")
        if (source == null) {
            Log.d(TAG, "source is null")
            return
        }

        if (licenseKey == null) {
            Log.d(TAG, "licenseKey is null")
            return
        }

        Handler(Looper.getMainLooper())
                .postDelayed(
                        {
                            Log.d(TAG, "startPlayer delayed")

                            val playerConfig = PlayerConfig(licenseKey)

                            // See
                            // https://github.dev/bitmovin/bitmovin-player-android-samples/blob/main/BasicAds/src/main/java/com/bitmovin/player/samples/ads/basic/MainActivity.java#L70

                            // TODO
                            // playerConfig.licenseKey = ...

                            val view =
                                    PlayerView(
                                            getContext(),
                                            Player.create(getContext(), playerConfig)
                                    )
                            playerView = view
                            view.setLayoutParams(
                                    LinearLayout.LayoutParams(
                                            LinearLayout.LayoutParams.MATCH_PARENT,
                                            LinearLayout.LayoutParams.MATCH_PARENT
                                    )
                            )

                            view.getPlayer()!.load(SourceConfig.fromUrl(source))
                        },
                        1
                )
    }
}
