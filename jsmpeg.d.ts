declare module "jsmpeg" {

  export class Player {
    options: PlayerOptions;
    source: VideoSource;

    maxAudioLag: number;
    loop: boolean;
    autoplay: boolean;
    isPlaying: boolean;
    paused: boolean;

    demuxer: any;

    constructor(url: string, options: PlayerOptions);

    showHide(): void;
    startLoading(): void;

    play(): void;
    pause(): void;
    stop(): void;
    nextFrame() : boolean;
    destroy(): void;
    update(): void;
    updateForStreaming(): void;
    updateForStaticFile(): void;

    seek(time: number): void;

    getCurrentTime(): number;
    setCurrentTime(): number;
    getVolume(): number;
    setVolume(level: number): void;
  }

  export interface PlayerOptions {
    canvas?: Element;
    loop?: boolean;
    autoplay?: boolean;
    audio?: boolean;
    video?: boolean;
    poster?: string;
    pauseWhenHidden?: boolean;
    disableGl?: boolean;
    disableWebAssembly?: boolean;
    progressive?: boolean;
    throttled?: boolean;
    chunkSize?: number;
    decodeFirstFrame?: boolean;
    maxAudioLag?: number;
    videoBufferSize?: number;
    audioBufferSize?: number;
    onVideoDecode?: (decoder: any, time: number) => void;
    onAudioDecode?: (decoder: any, time: number) => void;
    onPlay?: (player: Player) =>void;
    onPause?: (player: Player) => void;
    onEnded?: (player: Player) => void;
    onStalled?: (player: Player) => void;
    onSourceEstablished?: (source: any) => void;
    onSourceCompleted?: (source: any) => void;
  }

  export interface VideoSource {
    destroy(): void;
  }

  export class WebSocket implements VideoSource {
    public url: string;
    public options: PlayerOptions;
    public socket?: any;
    public streaming: boolean;
    public destination?: any;
    public reconnectInterval?: number;
    public shouldAttemptReconnect? : boolean;
    public completed?: boolean;
    public established?: boolean;
    public progress?: number;

    constructor(url: string, options: PlayerOptions);

    connect(): void;
    destroy(): void;
    start(): void;
    resume(): void;
    onOpen(): void;
    onClose(): void;
    onMessage(): void;
  }

}
