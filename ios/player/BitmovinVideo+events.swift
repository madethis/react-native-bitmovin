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
        switch(event) {
        case is ReadyEvent:
            self.onReady?(["type": "ready"])
        case is PlayEvent:
            self.onReady?(["type": "play"])
        case is PlayingEvent:
            self.onPlaying?(["type": "playing"])
        case is PausedEvent:
            self.onPaused?(["type": "paused"])
        case is SeekEvent:
            self.onSeek?(["type": "seek"])
        case is SeekedEvent:
            self.onSeeked?(["type": "seeked"])
        case is TimeShiftEvent:
            self.onTimeShift?(["type": "timeshift"])
        case is TimeShiftedEvent:
            self.onTimeShifted?(["type": "timeshifted"])
        case is MutedEvent:
            self.onMuted?(["type": "muted"])
        case is UnmutedEvent:
            self.onUnmuted?(["type": "unmuted"])
        case is VideoSizeChangedEvent: //PlayerResized?
            self.onPlayerResized?(["type": "playerresized"])
        case is PlaybackFinishedEvent:
            self.onPlaybackFinished?(["type": "playbackfinished"])
        case let error as PlayerErrorEvent:
            self.onError?(["type": "error", "code": error.code, "message": error.message])
        case let warning as PlayerWarningEvent:
            self.onWarning?(["type": "warning", "code": warning.code, "message": warning.message])
        case is StallStartedEvent:
            self.onStallStarted?(["type": "stallstarted"])
        case is StallEndedEvent:
            self.onStallEnded?(["type": "stallended"])
        case let timeChanged as TimeChangedEvent:
            self.onTimeChanged?(["time": timeChanged.currentTime, "type": "timechanged"])
        case is CastAvailableEvent:
            self.onCastAvailable?(["type": "castavailable"])
        case is CastStoppedEvent:
            self.onCastStopped?(["type": "caststopped"])
        case is CastStartEvent:
            self.onCastStart?(["type": "caststart"])
        case is CastStartedEvent:
            self.onCastStarted?(["type": "caststarted"])
        case is CastWaitingForDeviceEvent:
            self.onCastWaitingForDevice?(["type": "castwaitingfordevicee"])
        case is SourceLoadedEvent:
            self.onSourceLoaded?(["type": "sourceloaded"])
        case is SourceUnloadEvent:
            self.onSourceUnloaded?(["type": "sourceunloaded"])
        case is AirPlayAvailableEvent:
            self.onAirplayAvailable?(["type": "airplayavailable"])
        case is AirPlayChangedEvent:
            self.onAirplayChanged?(["type": "airplaychanged"])
        case is DestroyEvent:
            self.onDestroy?(["type": "destroy"])
        case is DurationChangedEvent:
            self.onDurationChanged?(["type": "durationchanged"])
        case is PictureInPictureEnterEvent:
            self.onPictureInPictureEnter?(["type": "pictureinpictureenter"])
        case is PictureInPictureExitEvent:
            self.onPictureInPictureEnter?(["type": "pictureinpictureexit"])
        case is ControlsHideEvent:
            self.onControlsHide?(["type": "controlshide"])
        case is ControlsShowEvent:
            self.onControlsShow?(["type": "controlsshow"])
        case let sourceError as SourceErrorEvent:
            self.onSourceError?(["type": "sourceerror", "code": sourceError.code, "message": sourceError.message])
        case is DownloadFinishedEvent:
            self.onDownloadFinished?(["type": "downloadfinished"])
        default:
            log("Unhandled event: \(event.name)")
        }
    }
}
