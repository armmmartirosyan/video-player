import EventEmitter from "helpers/event-emitter";
import { Player_Event_Types, PLAYER_STATES } from "constants/index";

class PlayerProvider {
  private bufferItems: string[] = [];
  private _speed: number = 1;
  private _state: PLAYER_STATES = PLAYER_STATES.PAUSED;
  private _theShortestVideoLength: number = Infinity;
  public eventEmitter: EventEmitter = new EventEmitter();

  public get theShortestVideoLength(): number {
    return this._theShortestVideoLength;
  }

  public set theShortestVideoLength(length: number) {
    if (length < this._theShortestVideoLength) {
      this._theShortestVideoLength = length;
    }
  }

  public get state(): number {
    return this._state;
  }

  private set state(newState: PLAYER_STATES) {
    this._state = newState;
  }

  public get speed(): number {
    return this._speed;
  }

  private set speed(value: number) {
    this._speed = value;
  }

  public addBufferingItem(url: string) {
    this.bufferItems.push(url);
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED
    );
  }

  public removeBufferingItem(url: string) {
    const i = this.bufferItems.indexOf(url);

    if (i !== -1) {
      this.bufferItems.splice(i, 1);
      if (this.bufferItems.length === 0) {
        this.eventEmitter.emit(
          Player_Event_Types.STATE_CHANGE,
          PLAYER_STATES.PLAYING
        );
      }
    }
  }

  public play() {
    this.state = PLAYER_STATES.PLAYING;
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PLAYING
    );
  }

  public pause() {
    this.state = PLAYER_STATES.PAUSED;
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED
    );
  }

  public jump(time: number) {
    this.eventEmitter.emit(Player_Event_Types.TIME_UPDATE, time);
  }

  public setPlaybackRate(speed: number) {
    this.speed = speed;
    this.eventEmitter.emit(Player_Event_Types.SET_PLAYBACK_RATE, speed);
  }

  public setVolume(volume: number) {
    this.eventEmitter.emit(Player_Event_Types.SET_VOLUME, volume);
  }

  public toggleMute(mute: boolean) {
    this.eventEmitter.emit(Player_Event_Types.TOGGLE_MUTE, mute);
  }

  public videoEnded() {
    this.pause();
    this.jump(0);
  }
}

export const playerProvider = new PlayerProvider();
