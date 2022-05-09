import BitmovinPlayer

@objc(RNTBitmovinVideoManager)
class RNTBitmovinVideoManager: RCTViewManager {
    
  @objc static override func requiresMainQueueSetup() -> Bool {
    return false
  }
    
  override func view() -> (RNTBitmovinVideo) {
    return RNTBitmovinVideo()
  }
}

class RNTBitmovinVideo : UIView {

  @objc var source: String? {
    didSet {
        self.startPlayer();
    }
  }

    var player: Player!
    var licenseKey: String?
    
    required init?(coder: NSCoder) {
        fatalError("init(coder: is not implemented")
    }

    required init() {
        print("init!")
        super.init(frame: .zero)
        (URLSession.shared.dataTask(with: URL(string: "http://127.0.0.1:8080")!) { (data, response, error) in
        print("license key!");
        if let data = data {
          self.licenseKey = String(data: data, encoding: .utf8)
            DispatchQueue.main.async {
                self.startPlayer()
            }
        } else {
            print("Error fetching license key: \(error)")
        }
      }).resume()
    }
    
    deinit {
        player?.destroy()
    }
    
    func startPlayer() {
        print("Building player...")
        
        guard let source = self.source,
              let licenseKey = self.licenseKey,
                let posterUrl = URL(string: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg") else {
                    print("Something wasn't ready...")
                  return
              }
        
        let streamUrl = URL(string: source)!


              // Create player configuration
              let playerConfig = PlayerConfig()
        playerConfig.key = licenseKey

              // Create player based on player config
              player = PlayerFactory.create(playerConfig: playerConfig)

              // Create player view and pass the player instance to it
              let playerView = PlayerView(player: player, frame: .zero)

              // Listen to player events
              // player.add(listener: self)

              playerView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
              playerView.frame = self.bounds

              self.addSubview(playerView)
              self.bringSubviewToFront(playerView)

              // Create source config
              let sourceConfig = SourceConfig(url: streamUrl, type: .hls)
              // Set a poster image
              sourceConfig.posterSource = posterUrl
              player.load(sourceConfig: sourceConfig)
  }
}
