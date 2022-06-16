//
//  DrcmConfig+dict.swift
//  react-native-bitmovin
//
//  Created by Rasmus Styrk on 16/06/2022.
//
import BitmovinPlayer
import Foundation

/**
 * DRM Config is an object within Bitmovin framework. Here we create an
 * extension that can create a DrmConfig from a dictionary that is provided by
 * react javascript side.
 */
extension DrmConfig {
    
    /**
     * From dict
     *
     * Takes a dictionary from react native javascript side and maps it to a DrmConfig object
     */
    static func fromDict(dict: Dictionary<String, Any>) -> DrmConfig? {
        
        guard let fairPlay = dict["fairplay"] as? Dictionary<String, Any> else {
            return nil
        }
        
        guard let licenseUrlString = fairPlay["LA_URL"] as? String,
              let licenseUrl = URL(string: licenseUrlString) else {
            return nil
        }
        
        guard let certificateUrlString = fairPlay["certificateURL"] as? String,
              let certificateUrl = URL(string: certificateUrlString) else {
            return nil
        }
        
        let config = FairplayConfig(license: licenseUrl, certificateURL: certificateUrl)
        
        if let licenseRequestHeaders = fairPlay["headers"] as? Dictionary<String, String> {
            config.licenseRequestHeaders = licenseRequestHeaders
        }
        
        if let certificateRequestHeaders = fairPlay["certificateHeaders"] as? Dictionary<String, String> {
            config.certificateRequestHeaders = certificateRequestHeaders
        }

        return config
    }
}
