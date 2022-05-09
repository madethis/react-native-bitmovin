# React Native Bitmovin

(Unofficial) React Native package for Bitmovin SDK 3+ and React Native 0.67

# Integration

(See `examples/BasicPlayer` for an example of how to use the package).

Add bitmovin pod repository to your Podfile:

```diff
  require_relative '../node_modules/react-native/scripts/react_native_pods'
  require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

+ source 'https://github.com/bitmovin/cocoapod-specs.git'
+
  platform :ios, '12.0'
```

The app only exports a typescript module, enable typescript transpilation to use it.

# iOS Example

open `examples/BasicPlayer/ios/BasicPlayer.xcworkspace`

## TODO

- Android
- tvOS
- Web
