//
//  BitmovinPlayer.swift
//  RNTBitmovin
//
//  Created by Rasmus Styrk on 15/06/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//
import BitmovinPlayer
import Foundation

/**
 * Bitmovin Video
 *
 * This is the actual player interface. It handles setting properties from react native and building the player object
 * as well as communicating events to listeners.
 */
@objc(RNTBitmovinVideo)
class BitmovinVideo: UIView {
    /**
     * The actual bitmovin player object
     */
    var player: Player?
    
    /**
     * The actual player view of bitmovin
     */
    var playerView: PlayerView?
    
    /**
     * The source for the player, it has title, stream info etc
     */
    @objc var source: NSDictionary? {
        didSet {
            initPlayer()
        }
    }
    
    /**
     * The config of the player
     */
    @objc var config: NSDictionary? {
        didSet {
            initPlayer()
        }
    }
    
    /**
     *  All events that is emitted fromt he player
     */
    @objc var onReady: RCTBubblingEventBlock?
    @objc var onPlay: RCTBubblingEventBlock?
    @objc var onPlaying: RCTBubblingEventBlock?
    @objc var onPaused: RCTBubblingEventBlock?
    @objc var onSeek: RCTBubblingEventBlock?
    @objc var onSeeked: RCTBubblingEventBlock?
    @objc var onTimeShift: RCTBubblingEventBlock?
    @objc var onTimeShifted: RCTBubblingEventBlock?
    @objc var onVolumeChanged: RCTBubblingEventBlock?
    @objc var onMuted: RCTBubblingEventBlock?
    @objc var onUnmuted: RCTBubblingEventBlock?
    @objc var onPlayerResized: RCTBubblingEventBlock?
    @objc var onPlaybackFinished: RCTBubblingEventBlock?
    @objc var onError: RCTDirectEventBlock?
    @objc var onWarning: RCTBubblingEventBlock?
    @objc var onStallStarted: RCTBubblingEventBlock?
    @objc var onStallEnded: RCTBubblingEventBlock?
    @objc var onAudioChanged: RCTBubblingEventBlock?
    @objc var onAudioAdded: RCTBubblingEventBlock?
    @objc var onAudioRemoved: RCTBubblingEventBlock?
    @objc var onVideoQualityChanged: RCTBubblingEventBlock?
    @objc var onAudioQualityChanged: RCTBubblingEventBlock?
    @objc var onVideoDownloadQualityChange: RCTBubblingEventBlock?
    @objc var onAudioDownloadQualityChange: RCTBubblingEventBlock?
    @objc var onVideoDownloadQualityChanged: RCTBubblingEventBlock?
    @objc var onAudioDownloadQualityChanged: RCTBubblingEventBlock?
    @objc var onVideoPlaybackQualityChanged: RCTBubblingEventBlock?
    @objc var onAudioPlaybackQualityChanged: RCTBubblingEventBlock?
    @objc var onTimeChanged: RCTBubblingEventBlock?
    @objc var onSegmentPlayback: RCTBubblingEventBlock?
    @objc var onMetadata: RCTBubblingEventBlock?
    @objc var onMetadataParsed: RCTBubblingEventBlock?
    @objc var onMetadataChanged: RCTBubblingEventBlock?
    @objc var onVideoAdaptation: RCTBubblingEventBlock?
    @objc var onAudioAdaptation: RCTBubblingEventBlock?
    @objc var onDownloadFinished: RCTBubblingEventBlock?
    @objc var onSegmentRequestFinished: RCTBubblingEventBlock?
    @objc var onCastAvailable: RCTBubblingEventBlock?
    @objc var onCastStopped: RCTBubblingEventBlock?
    @objc var onCastStart: RCTBubblingEventBlock?
    @objc var onCastStarted: RCTBubblingEventBlock?
    @objc var onCastWaitingForDevice: RCTBubblingEventBlock?
    @objc var onSourceLoaded: RCTBubblingEventBlock?
    @objc var onSourceUnloaded: RCTBubblingEventBlock?
    @objc var onAirplayAvailable: RCTBubblingEventBlock?
    @objc var onAirplayChanged: RCTBubblingEventBlock?
    @objc var onDestroy: RCTBubblingEventBlock?
    @objc var onPlaybackSpeedChanged: RCTBubblingEventBlock?
    @objc var onDurationChanged: RCTBubblingEventBlock?
    @objc var onViewModeChanged: RCTBubblingEventBlock?
    @objc var onModuleReady: RCTBubblingEventBlock?
    @objc var onSubtitleEnable: RCTBubblingEventBlock?
    @objc var onSubtitleEnabled: RCTBubblingEventBlock?
    @objc var onSubtitleDisable: RCTBubblingEventBlock?
    @objc var onSubtitleDisabled: RCTBubblingEventBlock?
    @objc var onVideoQualityAdded: RCTBubblingEventBlock?
    @objc var onVideoQualityRemoved: RCTBubblingEventBlock?
    @objc var onAudioQualityAdded: RCTBubblingEventBlock?
    @objc var onAudioQualityRemoved: RCTBubblingEventBlock?
    @objc var onTargetLatencyChanged: RCTBubblingEventBlock?
    @objc var onLatencyModeChanged: RCTBubblingEventBlock?
    @objc var onLicenseValidated: RCTBubblingEventBlock?
    @objc var onDrmLicenseAdded: RCTBubblingEventBlock?
    @objc var onAspectRatioChanged: RCTBubblingEventBlock?
    @objc var onPictureInPictureAvailabilityChanged: RCTBubblingEventBlock?
    @objc var onPictureInPictureEnter: RCTBubblingEventBlock?
    @objc var onPictureInPictureExit: RCTBubblingEventBlock?
    @objc var onControlsHide: RCTBubblingEventBlock?
    @objc var onControlsShow: RCTBubblingEventBlock?
    @objc var onSourceError: RCTBubblingEventBlock?
    
    /**
     * De-nit
     *
     * When class being deinited we need to make sure player and other resources is destroyed
     */
    deinit {
        self.destroyPlayer()
    }
}
