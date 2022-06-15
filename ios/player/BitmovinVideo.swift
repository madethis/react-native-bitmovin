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
     * A list of all events
     */
    @objc var _events: NSArray?
    
    /**
     * De-nit
     *
     * When class being deinited we need to make sure player and other resources is destroyed
     */
    deinit {
        self.destroyPlayer()
    }
}
