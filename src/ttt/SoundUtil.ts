module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class SoundUtil extends egret.HashObject {

					public static _eventDispatcher:egret.EventDispatcher;
					public static _musicBg:mana.media.SoundGroup;
					public static _musicBgVolume:number;
					public static _musicBgMute:boolean;
					public static _randomBeg:boolean = false;
					public static _url:string;
					public static MUSIC_BG:string;
					public static BG_LOOP_TIME:number;
					public static addEventListener(type:string,listener:Function,useCapture:boolean = false,priority:number = 0,useWeakReference:boolean = false)
					{
						com.txjy.s01.utils.SoundUtil._eventDispatcher.addEventListener(type,listener,null,useCapture,priority);
					}

					public static get musicBgMute():boolean
					{
						return com.txjy.s01.utils.SoundUtil._musicBgMute;
					}

					public static set musicBgMute(value:boolean)
					{
						com.txjy.s01.utils.SoundUtil._musicBgMute = value;
						com.txjy.s01.utils.SoundUtil._musicBg["mute"] = com.txjy.s01.utils.SoundUtil._musicBgMute;
						com.txjy.s01.utils.SoundUtil._eventDispatcher.dispatchEvent(new CusEvent(CommonEventType.SOUND_MUSIC_MUTE_CHANGE));
					}

					public static get musicBgVolume():number
					{
						return com.txjy.s01.utils.SoundUtil._musicBgVolume;
					}

					public static set musicBgVolume(value:number)
					{
						com.txjy.s01.utils.SoundUtil._musicBgVolume = value;
						com.txjy.s01.utils.SoundUtil._musicBg["volume"] = com.txjy.s01.utils.SoundUtil._musicBgVolume;
					}

					public static playMusicBg(url:string,isRandom:boolean = true)
					{
						if(com.txjy.s01.utils.SoundUtil._url == url)
							return ;
						com.txjy.s01.utils.SoundUtil._url = url;
						com.txjy.s01.utils.SoundUtil._randomBeg = isRandom;
						var sp:mana.media.SoundPlayer = <any>com.txjy.s01.utils.SoundUtil._musicBg["get"](com.txjy.s01.utils.SoundUtil.MUSIC_BG);
						if(<any>!sp)
						{
							sp = new SoundPlayer();
							sp["addEventListener"](egret.Event.COMPLETE,com.txjy.s01.utils.SoundUtil.onMusicBgLoadComplete);
							sp["addEventListener"](egret.IOErrorEvent.IO_ERROR,com.txjy.s01.utils.SoundUtil.onMusicIoError);
							sp["addEventListener"](flash.Event.SOUND_COMPLETE,com.txjy.s01.utils.SoundUtil.onMusicPlayComplete);
							com.txjy.s01.utils.SoundUtil._musicBg["put"](com.txjy.s01.utils.SoundUtil.MUSIC_BG,sp);
						}
						var tl:com.greensock.TimelineLite = <any>new TimelineLite();
						if(com.txjy.s01.utils.SoundUtil._musicBg["get"](com.txjy.s01.utils.SoundUtil.MUSIC_BG).position > 0)
						{
							tl["append"](TweenLite.to(com.txjy.s01.utils.SoundUtil,1,{musicBgVolume:0.3,onComplete:com.txjy.s01.utils.SoundUtil.onMusicBgFadeComplete,onCompleteParams:[url]}));
						}
						else
						{
							com.txjy.s01.utils.SoundUtil.onMusicBgFadeComplete(url);
						}
						tl["append"](TweenLite.to(com.txjy.s01.utils.SoundUtil,2,{musicBgVolume:1}));
						tl["play"]();
					}

					private static onMusicBgLoadComplete(event:egret.Event = null)
					{
						com.txjy.s01.utils.SoundUtil._musicBg["stopSoundGroup"]();
						if(<any>!com.txjy.s01.utils.SoundUtil._randomBeg)
							com.txjy.s01.utils.SoundUtil._musicBg["playSound"](com.txjy.s01.utils.SoundUtil.MUSIC_BG,0,0);
						else
						{
							var sp:mana.media.SoundPlayer = <any>com.txjy.s01.utils.SoundUtil._musicBg["get"](com.txjy.s01.utils.SoundUtil.MUSIC_BG);
							com.txjy.s01.utils.SoundUtil._musicBg["playSound"](com.txjy.s01.utils.SoundUtil.MUSIC_BG,Math.random() * sp["length"] / 2,0);
						}
						com.txjy.s01.utils.SoundUtil.musicBgVolume = 0.1;
						TweenLite.to(com.txjy.s01.utils.SoundUtil,2,{musicBgVolume:1});
					}

					private static onMusicPlayComplete(event:egret.Event)
					{
						TimerUtil.addTimerExecute(com.txjy.s01.utils.SoundUtil.onDelayPlay,0.5 * 1000);
					}

					private static onMusicIoError(event:flash.IOErrorEvent)
					{
					}

					private static onDelayPlay()
					{
						TimerUtil.removeTimerExecute(com.txjy.s01.utils.SoundUtil.onDelayPlay);
						com.txjy.s01.utils.SoundUtil._randomBeg = false;
						com.txjy.s01.utils.SoundUtil.onMusicBgLoadComplete();
					}

					private static onMusicBgFadeComplete(url:string)
					{
						com.txjy.s01.utils.SoundUtil.musicBgVolume = 0.1;
						com.txjy.s01.utils.SoundUtil._musicBg["get"](com.txjy.s01.utils.SoundUtil.MUSIC_BG).loadFileSound(url + "?v=" + Mission.getVersionByUrl(url));
						com.txjy.s01.utils.SoundUtil._musicBg["stopSoundGroup"]();
						com.txjy.s01.utils.SoundUtil._musicBg["playSound"](com.txjy.s01.utils.SoundUtil.MUSIC_BG,0,0);
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.SoundUtil._eventDispatcher = new egret.EventDispatcher();
com.txjy.s01.utils.SoundUtil._musicBg = new SoundGroup();
com.txjy.s01.utils.SoundUtil._musicBgVolume = 1;
com.txjy.s01.utils.SoundUtil._musicBgMute = false;
com.txjy.s01.utils.SoundUtil.MUSIC_BG = "MUSIC_BG";
com.txjy.s01.utils.SoundUtil.BG_LOOP_TIME = "number"["MAX_VALUE"];
