import BitmovinPlayer

@objc(RNTBitmovinVideoManager)
class BitmovinVideoManager: RCTViewManager {
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  override func view() -> (BitmovinVideo) {
    return BitmovinVideo()
  }
}

@objc(RNTBitmovinVideo)
class BitmovinVideo: UIView {
  @objc var source: String? {
    didSet {
      startPlayer()
    }
  }

  @objc var licenseKey: String? {
    didSet {
      startPlayer()
    }
  }

  var player: Player!

  // @available(*, unavailable)
  // required init?(coder _: NSCoder) {
  //   fatalError("init(coder: is not implemented")
  // }

  // required init() {}

  deinit {
    player?.destroy()
  }

  func startPlayer() {
    print("Building player...")

    guard let source = source,
          let licenseKey = licenseKey
    else {
      print("Something wasn't ready...")
      return
    }

    let streamUrl = URL(string: source)!

    // Create player configuration
    let playerConfig = PlayerConfig()
    playerConfig.key = licenseKey

    if player == nil {
      // Create player based on player config
      player = PlayerFactory.create(playerConfig: playerConfig)

      // Create player view and pass the player instance to it
      let playerView = PlayerView(player: player, frame: .zero)

      // Listen to player events
      player.add(listener: self)

      playerView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
      playerView.frame = bounds

      addSubview(playerView)
      bringSubviewToFront(playerView)
    }

    // Create source config
    let sourceConfig = SourceConfig(url: streamUrl, type: .hls)

    // Set a poster image
    // sourceConfig.posterSource = posterUrl

    player.load(sourceConfig: sourceConfig)
  }
}

extension BitmovinVideo: PlayerListener {
  func onEvent(_ event: Event, player _: Player) {
    dump(event, name: "[Player Event]", maxDepth: 1)
  }
}
