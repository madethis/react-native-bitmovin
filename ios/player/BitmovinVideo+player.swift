//
//  BitmovinVideo+player.swift
//  react-native-bitmovin
//
//  Created by Rasmus Styrk on 15/06/2022.
//

import Foundation
import BitmovinPlayer
/**
 * Bitmovin Player
 *
 * This extension handles setting up and taking down the actual player object and player views
 */
extension BitmovinVideo {
    /**
     * Init Player
     *
     * Initializes the bitmovin player. If player already setup it is first removed.
     */
    func initPlayer() {
        self.destroyPlayer()
        
        guard let source = self.source,
              let config = self.config
        else {
            log("Missing either source or config")
            return
        }
        
        guard let licenseKey = config["key"] as? String else {
            log("Missing license key")
            return
        }
        
        guard let streamUrl = source["hls"] as? String else {
            log("Missing hls stream source")
            return
        }
        
        let playerConfig = PlayerConfig()
        playerConfig.key = licenseKey
        
        if let playbackConfigDict = config["playback"] as? Dictionary<String, Any> {
            playerConfig.playbackConfig = PlaybackConfig.fromDict(dict: playbackConfigDict)
        }
        
        if let styleDict = config["style"] as? Dictionary<String, Any> {
            playerConfig.styleConfig = StyleConfig.fromDict(dict: styleDict)
        }
        
        self.player = PlayerFactory.create(playerConfig: playerConfig)
        self.player!.add(listener: self)
        
        self.playerView = PlayerView(player: self.player!, frame: self.bounds)
        self.playerView!.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        
        self.addSubview(self.playerView!)
        self.bringSubviewToFront(self.playerView!)
        
        let sourceConfig = SourceConfig(url: URL(string: streamUrl)!, type: .hls)
        
        if let title = source["title"] as? String {
            sourceConfig.title = title
        }
        
        if let description = source["description"] as? String {
            sourceConfig.sourceDescription = description
        }
        
        if let poster = source["poster"] as? String, let posterURL = URL(string: poster) {
            sourceConfig.posterSource = posterURL
        }
        
        if let drmDict = source["drm"] as? Dictionary<String, Any> {
            sourceConfig.drmConfig = DrmConfig.fromDict(dict: drmDict)
        }
        
        
        
        
        self.player!.load(sourceConfig: sourceConfig)
    }
    
    /**
     * Destroy player
     *
     * Removes the player view and player object
     */
    func destroyPlayer() {
        self.playerView?.removeFromSuperview()
        self.playerView = nil
        
        self.player?.destroy()
        self.player = nil
    }
}
