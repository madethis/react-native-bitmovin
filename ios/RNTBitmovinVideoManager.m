#import "React/RCTViewManager.h"

/**
 * Bitmovin Video Manager
 *
 * This is the actual interface for react natve to use when calling from js to native code. It decribes the module and properties,
 * events etc.
 */
@interface RCT_EXTERN_MODULE(RNTBitmovinVideoManager, RCTViewManager)

/**
 * Source
 *
 * The source property used to instantiate the bitmovin player. It has information like stream, title etc.
 */
RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)

/**
 * Config
 *
 * The player configration object that conaints license key etc
 */
RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)

/**
 * Events
 *
 * A list of all events that are subcribed to
 */
RCT_EXPORT_VIEW_PROPERTY(_events, NSArray)

@end
