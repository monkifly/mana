module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class TipUtil extends egret.HashObject {

					public static tipUtilInfoDic:flash.Dictionary;
					public static timer:egret.Timer;
					public static WAIT_TIME:number;
					public static curTipTarget:egret.DisplayObject;

					public constructor()
					{
						super();
					}

					public static registerTip(targetPm:egret.DisplayObject,tipClassPm:any = null,dataPm:any = null,timelagPm:boolean = false,downHidePm:boolean = false,fixPm:boolean = false,columnsPm:number = 0,removeStageUnregisterPm:boolean = false)
					{
						if(targetPm != null)
						{
							if(<any>!tipClassPm)
								tipClassPm = S01TextTip;
							var info:TipUtilInfo;
							if(<any>!com.txjy.s01.utils.TipUtil.tipUtilInfoDic.getItem(targetPm))
							{
								info = new TipUtilInfo();
								com.txjy.s01.utils.TipUtil.tipUtilInfoDic.setItem(targetPm,info);
								targetPm.addEventListener(flash.MouseEvent.ROLL_OVER,com.txjy.s01.utils.TipUtil.onTargetRollOver,null);
								targetPm.addEventListener(flash.MouseEvent.ROLL_OUT,com.txjy.s01.utils.TipUtil.onTargetRollOut,null);
							}
							else
							{
								info = <TipUtilInfo>flash.As3As(com.txjy.s01.utils.TipUtil.tipUtilInfoDic.getItem(targetPm),TipUtilInfo);
								if(info.removeStageUnregister)
									targetPm.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.TipUtil.onTargetRemoveFromStage,null);
								if(info.downHide)
									targetPm.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,com.txjy.s01.utils.TipUtil.onTargetRollOut,null);
								if(info.tip)
								{
									if(com.txjy.s01.utils.TipUtil.curTipTarget != targetPm || info.tipClass != tipClassPm)
									{
										info.tip["hide"]();
										info.tip = null;
									}
									else
										info.tip["data"] = dataPm;
								}
							}
							info.tipClass = tipClassPm;
							info.data = dataPm;
							info.timelag = timelagPm;
							info.downHide = downHidePm;
							info.fix = fixPm;
							info.removeStageUnregister = removeStageUnregisterPm;
							info.columns = flash.checkUint(columnsPm);
							if(info.downHide)
								targetPm.addEventListener(egret.TouchEvent.TOUCH_BEGIN,com.txjy.s01.utils.TipUtil.onTargetRollOut,null);
							if(info.removeStageUnregister)
								targetPm.addEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.TipUtil.onTargetRemoveFromStage,null);
						}
					}

					public static unregisterTip(targetPm:egret.DisplayObject)
					{
						var info:TipUtilInfo = <any>com.txjy.s01.utils.TipUtil.tipUtilInfoDic.getItem(targetPm);
						if(targetPm != null && info)
						{
							targetPm.removeEventListener(flash.MouseEvent.ROLL_OVER,com.txjy.s01.utils.TipUtil.onTargetRollOver,null);
							targetPm.removeEventListener(flash.MouseEvent.ROLL_OUT,com.txjy.s01.utils.TipUtil.onTargetRollOut,null);
							targetPm.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.TipUtil.onTargetRemoveFromStage,null);
							if(info.tip)
								info.tip["hide"]();
							com.txjy.s01.utils.TipUtil.tipUtilInfoDic.delItem(targetPm);
						}
					}

					private static showTip()
					{
						var info:TipUtilInfo = <any>com.txjy.s01.utils.TipUtil.tipUtilInfoDic.getItem(com.txjy.s01.utils.TipUtil.curTipTarget);
						var baseTip:mana.flc.BaseTip;
						if(<any>!info)
							return ;
						if(<any>!info)
							return ;
						if(<any>!info.tip)
							info.tip = new info.tipClass();
						baseTip = info.tip;
						if(flash.As3is(baseTip,null,"S01TextTip"))
						{
							S01TextTip(baseTip).setColumns(info.columns);
						}
						baseTip["fix"] = info.fix;
						baseTip["data"] = info.data;
						baseTip["show"](LayerDef.TIP);
					}

					private static onTargetRollOver(event:flash.MouseEvent)
					{
						com.txjy.s01.utils.TipUtil.curTipTarget = <egret.DisplayObject>flash.As3As(event.currentTarget,egret.DisplayObject);
						var info:TipUtilInfo = <any>com.txjy.s01.utils.TipUtil.tipUtilInfoDic.getItem(com.txjy.s01.utils.TipUtil.curTipTarget);
						if(<any>!info)
							return ;
						if(<any>!info.timelag)
						{
							com.txjy.s01.utils.TipUtil.showTip();
						}
						else
						{
							if(<any>!com.txjy.s01.utils.TipUtil.timer)
							{
								com.txjy.s01.utils.TipUtil.timer = new egret.Timer(com.txjy.s01.utils.TipUtil.WAIT_TIME,1);
								com.txjy.s01.utils.TipUtil.timer.addEventListener(egret.TimerEvent.TIMER,com.txjy.s01.utils.TipUtil.onTimer,null);
							}
							if(<any>!com.txjy.s01.utils.TipUtil.timer.running)
							{
								com.txjy.s01.utils.TipUtil.timer.reset();
								com.txjy.s01.utils.TipUtil.timer.start();
							}
						}
					}

					private static onTargetRollOut(event:flash.MouseEvent)
					{
						if(com.txjy.s01.utils.TipUtil.timer && com.txjy.s01.utils.TipUtil.timer.running)
						{
							com.txjy.s01.utils.TipUtil.timer.stop();
						}
						com.txjy.s01.utils.TipUtil.curTipTarget = null;
						var targetPm:egret.DisplayObject = <egret.DisplayObject>flash.As3As(event.currentTarget,egret.DisplayObject);
						var info:TipUtilInfo = <any>com.txjy.s01.utils.TipUtil.tipUtilInfoDic.getItem(targetPm);
						if(<any>!info)
							return ;
						if(info.tip)
						{
							info.tip["hide"]();
						}
					}

					private static onTargetRemoveFromStage(event:egret.Event)
					{
						com.txjy.s01.utils.TipUtil.unregisterTip(<egret.DisplayObject>flash.As3As(event.currentTarget,egret.DisplayObject));
					}

					private static onTimer(event:egret.TimerEvent)
					{
						com.txjy.s01.utils.TipUtil.showTip();
					}

				}

				 class TipUtilInfo extends egret.HashObject {

					public tipClass:any;
					public data:any;
					public timelag:boolean = false;
					public downHide:boolean = false;
					public fix:boolean = false;
					public removeStageUnregister:boolean = false;
					public columns:number = 0;
					public tip:mana.flc.BaseTip;

					public constructor()
					{
						super();
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.TipUtil.tipUtilInfoDic = new flash.Dictionary();
com.txjy.s01.utils.TipUtil.WAIT_TIME = 400;
