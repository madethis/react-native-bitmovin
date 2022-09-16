import BitmovinPlayer
import Foundation

/**
 * Style config  is an object within Bitmovin framework. Here we create an
 * extension that can create a StyleConfig from a dictionary that is provided by
 * react javascript side.
 */
extension StyleConfig {
    
    /**
     * From dict
     *
     * Takes a dictionary from react native javascript side and maps it to a PlaybackConfig object
     */
    static func fromDict(dict: Dictionary<String, Any>) -> StyleConfig {
        
        let config = StyleConfig()
        
        if let isUiEnabled = dict["isUiEnabled"] as? Bool {
            config.isUiEnabled = isUiEnabled
        }
        
        return config
    }
}
