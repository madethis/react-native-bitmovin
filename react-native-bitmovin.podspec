require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name           = 'react-native-bitmovin'
  s.version        = package['version']
  s.summary        = package['description']
  s.license        = package['license']
  s.authors         = package['authors']
  s.homepage       = package['homepage']
  s.source         = { :git => "." }

  s.ios.deployment_target = "12.0"
  s.tvos.deployment_target = "9.0"

  s.source_files  = "ios/**/*.{h,m,swift}"
  # s.static_framework = true

  # s.source 'https://github.com/bitmovin/cocoapod-specs.git'

  s.dependency "React-Core"
  s.dependency 'BitmovinPlayer', "3.27.0"

  s.xcconfig = {
    'OTHER_LDFLAGS': '-ObjC',
  }
end
