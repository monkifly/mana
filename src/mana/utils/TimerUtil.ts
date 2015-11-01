//module mana {
//	export module utils {
//		export class TimerUtil extends egret.HashObject {
//
//			public static _sprite:egret.Sprite;
//			public static _secondTimer:egret.Timer;
//			public static _frameFunDic:flash.Dictionary;
//			public static _secondFunDic:flash.Dictionary;
//			public static _timerFunDic:flash.Dictionary;
//			public static hasExecuteFun(fun:Function):boolean
//			{
//				return mana.utils.TimerUtil._frameFunDic.getItem(fun) != null || mana.utils.TimerUtil._timerFunDic.getItem(fun) != null || mana.utils.TimerUtil._secondFunDic.getItem(fun) != null;
//			}
//
//			public static addFrameExecute(fun:Function)
//			{
//				if(fun != null && mana.utils.TimerUtil._frameFunDic.getItem(fun) == null)
//				{
//					mana.utils.TimerUtil._frameFunDic.setItem(fun,fun);
//					if(<any>!mana.utils.TimerUtil._sprite)
//					{
//						mana.utils.TimerUtil._sprite = new egret.Sprite();
//						mana.utils.TimerUtil._sprite.addEventListener(egret.Event.ENTER_FRAME,mana.utils.TimerUtil.onEnterFrame,null);
//					}
//				}
//			}
//
//			public static removeFrameExecute(fun:Function)
//			{
//				if(fun != null && mana.utils.TimerUtil._frameFunDic.getItem(fun) != null)
//				{
//					mana.utils.TimerUtil._frameFunDic.delItem(fun);
//					var hasFun:boolean = <any>false;
//					for(var fun_key_a in mana.utils.TimerUtil._frameFunDic.map)
//					{
//						var fun:Function = mana.utils.TimerUtil._frameFunDic.map[fun_key_a][1];
//						if(fun != null)
//						{
//							hasFun = true;
//							break;
//						}
//					}
//					if(<any>!hasFun)
//					{
//						for(var timerObj_key_a in mana.utils.TimerUtil._timerFunDic.map)
//						{
//							var timerObj:TimerObj = mana.utils.TimerUtil._timerFunDic.map[timerObj_key_a][1];
//							if(timerObj != null)
//							{
//								hasFun = true;
//								break;
//							}
//						}
//						if(<any>!hasFun && mana.utils.TimerUtil._sprite)
//						{
//							mana.utils.TimerUtil._sprite.removeEventListener(egret.Event.ENTER_FRAME,mana.utils.TimerUtil.onEnterFrame,null);
//							mana.utils.TimerUtil._sprite = null;
//						}
//					}
//				}
//			}
//
//			private static onEnterFrame(event:egret.Event)
//			{
//				for(var fun_key_a in mana.utils.TimerUtil._frameFunDic.map)
//				{
//					var fun:Function = mana.utils.TimerUtil._frameFunDic.map[fun_key_a][1];
//					fun();
//				}
//				var nowTime:number = flash.checkInt(egret.getTimer());
//				for(var timeObj_key_a in mana.utils.TimerUtil._timerFunDic.map)
//				{
//					var timeObj:TimerObj = mana.utils.TimerUtil._timerFunDic.map[timeObj_key_a][1];
//					if(nowTime - timeObj.lastTime >= timeObj.delay)
//					{
//						timeObj.callBack();
//						if(<any>!timeObj.isUseLastTime)
//							timeObj.lastTime += flash.checkUint(timeObj.delay);
//						else
//							timeObj.lastTime = flash.checkUint(nowTime);
//					}
//				}
//			}
//
//			public static addTimerExecute(fun:Function,delay:number,isUseLastTime:boolean = false)
//			{
//				if(fun == null)
//					return ;
//				if(mana.utils.TimerUtil._timerFunDic.getItem(fun) == null)
//				{
//					mana.utils.TimerUtil._timerFunDic.setItem(fun,new TimerObj(fun,delay,isUseLastTime));
//					if(<any>!mana.utils.TimerUtil._sprite)
//					{
//						mana.utils.TimerUtil._sprite = new egret.Sprite();
//						mana.utils.TimerUtil._sprite.addEventListener(egret.Event.ENTER_FRAME,mana.utils.TimerUtil.onEnterFrame,null);
//					}
//				}
//				else
//				{
//					(<TimerObj>(mana.utils.TimerUtil._timerFunDic.getItem(fun))).delay = flash.checkUint(delay);
//					(<TimerObj>(mana.utils.TimerUtil._timerFunDic.getItem(fun))).isUseLastTime = isUseLastTime;
//				}
//			}
//
//			public static removeTimerExecute(fun:Function)
//			{
//				if(fun != null && mana.utils.TimerUtil._timerFunDic.getItem(fun) != null)
//				{
//					mana.utils.TimerUtil._timerFunDic.delItem(fun);
//					var hasFun:boolean = <any>false;
//					for(var fun_key_a in mana.utils.TimerUtil._frameFunDic.map)
//					{
//						var fun:Function = mana.utils.TimerUtil._frameFunDic.map[fun_key_a][1];
//						if(fun != null)
//						{
//							hasFun = true;
//							break;
//						}
//					}
//					if(<any>!hasFun)
//					{
//						for(var timerObj_key_a in mana.utils.TimerUtil._timerFunDic.map)
//						{
//							var timerObj:TimerObj = mana.utils.TimerUtil._timerFunDic.map[timerObj_key_a][1];
//							if(timerObj != null)
//							{
//								hasFun = true;
//								break;
//							}
//						}
//						if(<any>!hasFun && mana.utils.TimerUtil._sprite)
//						{
//							mana.utils.TimerUtil._sprite.removeEventListener(egret.Event.ENTER_FRAME,mana.utils.TimerUtil.onEnterFrame,null);
//							mana.utils.TimerUtil._sprite = null;
//						}
//					}
//				}
//			}
//
//			public static addSecondExecute(fun:Function,exact:boolean = true)
//			{
//				if(exact)
//					mana.utils.TimerUtil.addTimerExecute(fun,1000);
//				else
//				{
//					if(fun != null && mana.utils.TimerUtil._secondFunDic.getItem(fun) == null)
//					{
//						mana.utils.TimerUtil._secondFunDic.setItem(fun,fun);
//						if(<any>!mana.utils.TimerUtil._secondTimer)
//						{
//							mana.utils.TimerUtil._secondTimer = new egret.Timer(1000);
//							mana.utils.TimerUtil._secondTimer.addEventListener(egret.TimerEvent.TIMER,mana.utils.TimerUtil.onSecondTimer,null);
//							mana.utils.TimerUtil._secondTimer.start();
//						}
//					}
//				}
//			}
//
//			public static removeSecondExecute(fun:Function)
//			{
//				mana.utils.TimerUtil.removeTimerExecute(fun);
//				if(mana.utils.TimerUtil._secondFunDic.getItem(fun) != null)
//				{
//					mana.utils.TimerUtil._secondFunDic.delItem(fun);
//					var hasFun:boolean = <any>false;
//					for(var fun_key_a in mana.utils.TimerUtil._secondFunDic.map)
//					{
//						var fun:Function = mana.utils.TimerUtil._secondFunDic.map[fun_key_a][1];
//						if(fun != null)
//						{
//							hasFun = true;
//							break;
//						}
//					}
//					if(<any>!hasFun)
//					{
//						if(mana.utils.TimerUtil._secondTimer)
//						{
//							mana.utils.TimerUtil._secondTimer.removeEventListener(egret.TimerEvent.TIMER,mana.utils.TimerUtil.onSecondTimer,null);
//							mana.utils.TimerUtil._secondTimer.stop();
//							mana.utils.TimerUtil._secondTimer = null;
//						}
//					}
//				}
//			}
//
//			private static onSecondTimer(event:egret.TimerEvent)
//			{
//				for(var fun_key_a in mana.utils.TimerUtil._secondFunDic.map)
//				{
//					var fun:Function = mana.utils.TimerUtil._secondFunDic.map[fun_key_a][1];
//					fun();
//				}
//			}
//
//		}
//
//		 class TimerObj extends egret.HashObject {
//
//			public delay:number = 0;
//			public callBack:Function;
//			public lastTime:number = 0;
//			public isUseLastTime:boolean = false;
//
//			public constructor(callBack:Function,delay:number,isUseLastTime:boolean)
//			{
//				super();
//				delay = flash.checkUint(delay);
//
//				this.delay = flash.checkUint(delay);
//				this.callBack = callBack;
//				this.lastTime = flash.checkUint(egret.getTimer());
//				this.isUseLastTime = isUseLastTime;
//			}
//
//		}
//	}
//}
//
//mana.utils.TimerUtil._frameFunDic = new flash.Dictionary();
//mana.utils.TimerUtil._secondFunDic = new flash.Dictionary();
//mana.utils.TimerUtil._timerFunDic = new flash.Dictionary();
