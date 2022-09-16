import BitmovinPlayer
import Foundation

/**
 * Playback config  is an object within Bitmovin framework. Here we create an
 * extension that can create a PlaybackConfig from a dictionary that is provided by
 * react javascript side.
 *
 * https://cdn.bitmovin.com/player/ios/3/docs/Classes/PlaybackConfig.html#/c:@M@BitmovinPlayer@objc(cs)BMPPlaybackConfig(py)isAutoplayEnabled
 */
extension PlaybackConfig {
    
    /**
     * From dict
     *
     * Takes a dictionary from react native javascript side and maps it to a PlaybackConfig object
     */
    static func fromDict(dict: Dictionary<String, Any>) -> PlaybackConfig {
        
        let config = PlaybackConfig()
        
        if let autoplay = dict["autoplay"] as? Bool {
            config.isAutoplayEnabled = autoplay
        }
        
        // "seeking" | "audioLanguage" not supported here
        
        if let muted = dict["muted"] as? Bool {
            config.isMuted = muted
        }
        
        if let timeShift = dict["timeShift"] as? Bool {
            config.isTimeShiftEnabled = timeShift
        }
        
        return config
    }
}
