//
//  BitmovinVideo+events.swift
//  react-native-bitmovin
//
//  Created by Rasmus Styrk on 15/06/2022.
//

import Foundation
import BitmovinPlayer

/**
 * Bitmovin Player Events
 *
 * This extension handles dispatching events from the bitmovin player back to react native
 */
extension BitmovinVideo: PlayerListener {
    func onEvent(_ event: Event, player _: Player) {
        dump(event, name: "[Player Event]", maxDepth: 2)
        
        if let timeChanged = event as? TimeChangedEvent {
            // self.onTimeChanged?(["currentTime": timeChanged.currentTime])
        }
        
        print(self._events)
    }
}
