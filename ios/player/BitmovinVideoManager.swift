import BitmovinPlayer

/**
 * Bitmovin Video Manager
 *
 * The bitmovin video manager handles RN View lifecycle of instanciating a new view
 * each time react native needs to rerender.
 */
@objc(RNTBitmovinVideoManager)
class BitmovinVideoManager: RCTViewManager {
    /**
     * We want to be on main thread and let video player do stuff on background
     */
    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    /**
     * This method instantiates a native view to be managed by the module. Override
     * this to return a custom view instance, which may be preconfigured with default
     * properties, subviews, etc. This method will be called many times, and should
     * return a fresh instance each time. The view module MUST NOT cache the returned
     * view and return the same instance for subsequent calls.
     */
    override func view() -> (BitmovinVideo) {
        return BitmovinVideo()
    }
}
