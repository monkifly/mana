module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class SceneUtil extends egret.HashObject {

					public static _eventDispatcher:egret.EventDispatcher;
					public static EVENT_TYPE_SCENE_CHANGE:string;
					public static MAP:number;
					public static CAMPAIGN:number;
					public static MAZE:number;
					public static SCENE_ARENA:number;
					public static SCENE_PASS:number;
					public static SCENE_WINEGENERAL:number;
					public static SCENE_RELIC:number;
					public static SCENE_CAMP:number;
					public static SCENE_KILL:number;
					public static SCENE_BATTLEFIELD:number;
					public static CUR_SCENCE:number;
					public static get curScene():number
					{
						return com.txjy.s01.utils.SceneUtil.CUR_SCENCE;
					}

					public set curScene(value:number)
		{
			flash.superSetter(com.txjy.s01.utils.SceneUtil, this, "curScene", value);
		}
	
 					public static addEventListener(type:string,listener:Function,useCapture:boolean = false,priority:number = 0,useWeakReference:boolean = false)
					{
						com.txjy.s01.utils.SceneUtil._eventDispatcher.addEventListener(type,listener,null,useCapture,priority);
					}

					public static changeScene(scene:number)
					{
						scene = flash.checkInt(scene);

						var isChanged:boolean = com.txjy.s01.utils.SceneUtil.CUR_SCENCE != scene;
						var fightView:com.txjy.s01.view.fight.FightView;
						var mapView:com.txjy.s01.view.map.MapView;
						var mainUI:com.txjy.s01.view.common.MainUI;
						var campaignView:com.txjy.s01.view.campaign.CampaignView;
						if(scene == com.txjy.s01.utils.SceneUtil.CAMPAIGN)
						{
							com.txjy.s01.utils.BoxUtil.closeAllBoxExcept([BoxDef.BOX_ID_CAMPAIGN_RESULT,BoxDef.BOX_ID_SPECIAL_CAMPAIGN_RESULT,BoxDef.BOX_ID_CAMPAIGN_LUCK_DRAW,BoxDef.BOX_ID_CAMPAIGN_EXAMINATION,BoxDef.BOX_ID_CAMPAIGN_SECRET_STORE,BoxDef.BOX_ID_STREN_FUN_WINDOW,BoxDef.BOX_ID_EXCHANGE_FORM_WINDOW,BoxDef.BOX_ID_TALE_CHALLENGE,BoxDef.BOX_ID_DUPLICATE_RESULT]);
						}
						else
						{
							com.txjy.s01.utils.BoxUtil.closeAllBoxExcept([BoxDef.BOX_ID_STREN_FUN_WINDOW,BoxDef.BOX_ID_EXCHANGE_FORM_WINDOW]);
						}
						com.txjy.s01.utils.SceneUtil.CUR_SCENCE = flash.checkInt(scene);
						if(scene == com.txjy.s01.utils.SceneUtil.MAP)
						{
							com.txjy.s01.utils.SceneUtil.hideFightScene();
							com.txjy.s01.utils.SceneUtil.hideCampaignScene();
							com.txjy.s01.utils.SceneUtil.showMainUI();
							mapView = com.txjy.s01.utils.UIUtil.getView(MapView);
							LayerUtil.addChild(mapView,LayerDef.SCENE);
							com.txjy.s01.utils.SoundUtil.playMusicBg(UIPathDef.getAssetUrl(SysMap.getInstance().map.info.music));
						}
						else if(scene == com.txjy.s01.utils.SceneUtil.CAMPAIGN)
						{
							if(SysFight.getInstance().fightState != FightDef.STATE_LOADING)
								com.txjy.s01.utils.SceneUtil.hideFightScene();
							com.txjy.s01.utils.SceneUtil.hideMapScene();
							com.txjy.s01.utils.SceneUtil.showMainUI();
							campaignView = com.txjy.s01.utils.UIUtil.getView(CampaignView);
							if(<any>!campaignView)
								campaignView = new CampaignView();
							LayerUtil.addChild(campaignView,LayerDef.SCENE);
							com.txjy.s01.utils.SoundUtil.playMusicBg(UIPathDef.getAssetUrl(SysCampaign.getInstance().curCampaign.fightMapInfo.music));
						}
						if(isChanged)
							com.txjy.s01.utils.SceneUtil.playScreenEffect();
						else
						{
							if(com.txjy.s01.utils.SceneUtil.curScene == com.txjy.s01.utils.SceneUtil.CAMPAIGN)
							{
								CampaignView(com.txjy.s01.utils.UIUtil.getView(CampaignView)).campaignContent.checkPlot();
							}
						}
						com.txjy.s01.utils.SceneUtil._eventDispatcher.dispatchEvent(new CusEvent(com.txjy.s01.utils.SceneUtil.EVENT_TYPE_SCENE_CHANGE));
					}

					public static playScreenEffect()
					{
						var screenBmd:flash.BitmapData = new flash.BitmapData(LayerUtil.getWidth(),LayerUtil.getHeight(),false,0x0);
						var screenBmp:flash.Bitmap = new flash.Bitmap(screenBmd);
						screenBmp.bitmapData = screenBmd;
						screenBmp.alpha = 1;
						LayerUtil.addChild(screenBmp,LayerDef.SYSTEM_UI);
						LayerUtil.getLayer(LayerDef.SYSTEM_UI).mouseChildren = LayerUtil.getLayer(LayerDef.SYSTEM_UI).mouseEnabled = false;
						TweenLite.to(screenBmp,1,{alpha:0,onComplete:com.txjy.s01.utils.SceneUtil.onScreenBmpFadeComplete,onCompleteParams:[screenBmp],ease:Linear});
					}

					private static hideFightScene()
					{
						var fightView:com.txjy.s01.view.fight.FightView;
						fightView = com.txjy.s01.utils.UIUtil.getView(FightView);
						if(fightView && fightView["allFinish"])
							fightView["clear"]();
						if(fightView && fightView["parent"])
							fightView["parent"].removeChild(fightView);
					}

					private static hideMapScene()
					{
						var mapView:com.txjy.s01.view.map.MapView;
						mapView = com.txjy.s01.utils.UIUtil.getView(MapView);
						if(mapView && mapView["parent"])
							mapView["parent"].removeChild(mapView);
					}

					private static hideCampaignScene()
					{
						var campaignView:com.txjy.s01.view.campaign.CampaignView;
						campaignView = com.txjy.s01.utils.UIUtil.getView(CampaignView);
						if(campaignView && campaignView["parent"])
							campaignView["parent"].removeChild(campaignView);
					}

					private static showMainUI()
					{
						var mainUI:com.txjy.s01.view.common.MainUI;
						mainUI = com.txjy.s01.utils.UIUtil.getView(MainUI);
						if(mainUI)
						{
							LayerUtil.addChild(mainUI,LayerDef.BASE_UI);
						}
					}

					private static onScreenBmpFadeComplete(screenBmp:flash.Bitmap)
					{
						if(screenBmp.parent)
							screenBmp.parent.removeChild(screenBmp);
						LayerUtil.getLayer(LayerDef.SYSTEM_UI).mouseChildren = LayerUtil.getLayer(LayerDef.SYSTEM_UI).mouseEnabled = true;
						if(com.txjy.s01.utils.SceneUtil.curScene == com.txjy.s01.utils.SceneUtil.CAMPAIGN)
						{
							CampaignView(com.txjy.s01.utils.UIUtil.getView(CampaignView)).campaignContent.checkPlot();
						}
					}

					public static _sceneLoaderAssist:mana.loader.LoaderAssist;
					public static _maxMission:number;
					public static _curMisson:mana.loader.mission.Mission;
					public static _emptyCallBack:Function;
					public static _completeCallBack:Function;
					public static _progressCallBack:Function;
					public static _sceneLoading:boolean;
					public static startLoad(missions:Array<any>,emptyCallBack:Function = null,completeCallBack:Function = null,progressCallBack:Function = null)
					{
						if(com.txjy.s01.utils.SceneUtil._sceneLoading)
							return ;
						com.txjy.s01.utils.SceneUtil._sceneLoading = true;
						com.txjy.s01.utils.SceneUtil._emptyCallBack = emptyCallBack;
						com.txjy.s01.utils.SceneUtil._completeCallBack = completeCallBack;
						com.txjy.s01.utils.SceneUtil._progressCallBack = progressCallBack;
						com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["removeEventListener"](LoaderEvent.MISSION_EMPTY,com.txjy.s01.utils.SceneUtil.onLoaderEmpty);
						com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["removeEventListener"](LoaderEvent.MISSION_PROGRESS,com.txjy.s01.utils.SceneUtil.onLoaderProgress);
						com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["removeEventListener"](LoaderEvent.MISSION_COMPLETE,com.txjy.s01.utils.SceneUtil.onLoaderComplete);
						com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["addEventListener"](LoaderEvent.MISSION_EMPTY,com.txjy.s01.utils.SceneUtil.onLoaderEmpty);
						com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["addEventListener"](LoaderEvent.MISSION_PROGRESS,com.txjy.s01.utils.SceneUtil.onLoaderProgress);
						com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["addEventListener"](LoaderEvent.MISSION_COMPLETE,com.txjy.s01.utils.SceneUtil.onLoaderComplete);
						for(var i:number = flash.checkInt(0);i < missions.length; ++i)
							com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["loadMission"](missions[i]);
						com.txjy.s01.utils.SceneUtil._maxMission = flash.checkInt(com.txjy.s01.utils.SceneUtil._sceneLoaderAssist["leftMissionNum"]);
						MainLoaderBar.showMain(0);
						MainLoaderBar.showSub("",0);
					}

					private static onLoaderEmpty(event:mana.loader.LoaderEvent)
					{
						com.txjy.s01.utils.SceneUtil._sceneLoading = false;
						MainLoaderBar.hide();
						if(flash.As3is(com.txjy.s01.utils.SceneUtil._emptyCallBack,Function))
							com.txjy.s01.utils.SceneUtil._emptyCallBack();
						LoaderAssist(event["currentTarget"]).removeEventListener(LoaderEvent.MISSION_EMPTY,com.txjy.s01.utils.SceneUtil.onLoaderEmpty);
						LoaderAssist(event["currentTarget"]).removeEventListener(LoaderEvent.MISSION_PROGRESS,com.txjy.s01.utils.SceneUtil.onLoaderProgress);
						LoaderAssist(event["currentTarget"]).removeEventListener(LoaderEvent.MISSION_COMPLETE,com.txjy.s01.utils.SceneUtil.onLoaderComplete);
						com.txjy.s01.utils.SceneUtil._emptyCallBack = null;
						com.txjy.s01.utils.SceneUtil._completeCallBack = null;
						com.txjy.s01.utils.SceneUtil._progressCallBack = null;
					}

					private static onLoaderProgress(event:mana.loader.LoaderEvent)
					{
						if(<any>!com.txjy.s01.utils.SceneUtil._curMisson)
							com.txjy.s01.utils.SceneUtil._curMisson = event["mission"];
						if(com.txjy.s01.utils.SceneUtil._curMisson == event["mission"])
							MainLoaderBar.showSub("",event["bytesLoaded"] / event["bytesTotal"]);
						if(flash.As3is(com.txjy.s01.utils.SceneUtil._progressCallBack,Function))
							com.txjy.s01.utils.SceneUtil._progressCallBack();
					}

					private static onLoaderComplete(event:mana.loader.LoaderEvent)
					{
						if(com.txjy.s01.utils.SceneUtil._curMisson == event["mission"])
							com.txjy.s01.utils.SceneUtil._curMisson = null;
						var numComplete:number = flash.checkInt(com.txjy.s01.utils.SceneUtil._maxMission - LoaderAssist(event["currentTarget"]).leftMissionNum - LoaderAssist(event["currentTarget"]).loadingNum);
						MainLoaderBar.showMain(numComplete / com.txjy.s01.utils.SceneUtil._maxMission);
						if(flash.As3is(com.txjy.s01.utils.SceneUtil._completeCallBack,Function))
							com.txjy.s01.utils.SceneUtil._completeCallBack();
					}

					public static LEFT_TOP:number;
					public static RIGHT_BOTTOM:number;
					public static RIGHT_TOP:number;
					public static LEFT_BOTTOM:number;
					public static CENTER:number;
					public static LEFT_CENTER:number;
					public static RIGHT_CENTER:number;
					public static TOP_CENTER:number;
					public static BOTTOM_CENTER:number;
					public static effectLayout(target:egret.DisplayObject,model:number = com.txjy.s01.utils.SceneUtil.CENTER,offset:egret.Point = null)
					{
						var stagteWidth:number = <any>LayerUtil.getStage().stageWidth;
						var stageHeight:number = <any>LayerUtil.getStage().stageHeight;
						var pos:egret.Point = new egret.Point();
						switch(model)
						{
						case com.txjy.s01.utils.SceneUtil.RIGHT_BOTTOM :
							pos.x = (stagteWidth - target.width);
							pos.y = (stageHeight - target.height);
							break;
						case com.txjy.s01.utils.SceneUtil.RIGHT_TOP :
							pos.x = (stagteWidth - target.width);
							pos.y = 0;
							break;
						case com.txjy.s01.utils.SceneUtil.LEFT_BOTTOM :
							pos.x = 0;
							pos.y = (stageHeight - target.height);
							break;
						case com.txjy.s01.utils.SceneUtil.CENTER :
							pos.x = (stagteWidth - target.width) / 2;
							pos.y = (stageHeight - target.height) / 2;
							break;
						case com.txjy.s01.utils.SceneUtil.LEFT_CENTER :
							pos.x = 0;
							pos.y = (stageHeight - target.height) / 2;
							break;
						case com.txjy.s01.utils.SceneUtil.RIGHT_CENTER :
							pos.x = (stagteWidth - target.width);
							pos.y = (stageHeight - target.height) / 2;
							break;
						case com.txjy.s01.utils.SceneUtil.TOP_CENTER :
							pos.x = (stagteWidth - target.width) / 2;
							pos.y = 0;
							break;
						case com.txjy.s01.utils.SceneUtil.BOTTOM_CENTER :
							pos.x = (stagteWidth - target.width) / 2;
							pos.y = (stageHeight - target.height);
							break;
						case com.txjy.s01.utils.SceneUtil.LEFT_TOP :
							break;
						}
						if(offset != null)
						{
							pos.x += offset.x;
							pos.y += offset.y;
						}
						var sp:egret.Sprite = <any>LayerUtil.getLayer(LayerDef.TIP);
						pos = flash.globalToLocal(sp,pos);
						target.x = pos.x;
						target.y = pos.y;
					}

					public static effectDic:flash.Dictionary;
					public static _loaderAssist:mana.loader.LoaderAssist;
					public static _hasLoading:boolean;
					public static _dequeArr:Array<any>;
					public static effectUnit:com.txjy.s01.model.effect.EffectUnit;
					public static showScreenEffect(effectId:number,model:number = com.txjy.s01.utils.SceneUtil.CENTER,offset:egret.Point = null,delay:number = 0,repeatCount:number = 1)
					{
						if(com.txjy.s01.utils.SceneUtil.effectDic.getItem(effectId) == null)
						{
							if(com.txjy.s01.utils.SceneUtil._loaderAssist == null)
							{
								com.txjy.s01.utils.SceneUtil._loaderAssist = LoaderManager.getInstance().createLoaderAssist("task.effect");
								com.txjy.s01.utils.SceneUtil._loaderAssist["applicationDomain"] = flash.ApplicationDomain.currentDomain;
								com.txjy.s01.utils.SceneUtil._loaderAssist["addEventListener"](LoaderEvent.MISSION_COMPLETE,com.txjy.s01.utils.SceneUtil.onMissionComplete);
							}
							var urlStr:string = <any>UIPathDef.getAssetUrl(SysCommon.getInstance().getEffectUrl(effectId));
							if(com.txjy.s01.utils.SceneUtil._hasLoading == false)
							{
								if(effectId == CommonDef.RES_TASK_EFFECT_1 || effectId == CommonDef.RES_TASK_EFFECT_2)
									com.txjy.s01.utils.SceneUtil.effectUnit = SysEffect.getInstance().playEffect(EffectDef.EFFECT_TYPE_TASK,false);
								else
									com.txjy.s01.utils.SceneUtil.effectUnit = null;
								com.txjy.s01.utils.SceneUtil._loaderAssist["loadMission"](new LoaderMission(urlStr,VersionConfig.SWF_ASSET_VERSION,{"effectId":effectId,"model":model,"offset":offset,"delay":delay,"repeatCount":repeatCount}));
								com.txjy.s01.utils.SceneUtil._hasLoading = true;
							}
							else
							{
								com.txjy.s01.utils.SceneUtil._dequeArr.push({"url":urlStr,"effectId":effectId,"model":model,"offset":offset,"delay":delay,"repeatCount":repeatCount});
							}
						}
						else
						{
							if(effectId == CommonDef.RES_TASK_EFFECT_1 || effectId == CommonDef.RES_TASK_EFFECT_2)
								SysEffect.getInstance().playEffect(EffectDef.EFFECT_TYPE_TASK,true,new LoadEffect(com.txjy.s01.utils.SceneUtil.effectDic.getItem(effectId),model,offset,delay,repeatCount));
							else
							{
								com.txjy.s01.utils.SceneUtil.effectLayout(com.txjy.s01.utils.SceneUtil.effectDic.getItem(effectId),model,offset);
								com.txjy.s01.utils.SceneUtil.effectDic.getItem(effectId).play(delay,repeatCount);
							}
						}
					}

					private static onMissionComplete(e:mana.loader.LoaderEvent)
					{
						com.txjy.s01.utils.SceneUtil.effectDic.setItem(e["mission"].data.effectId,new AniObj(<egret.SwfMovie>flash.As3As(LoaderMission(e["mission"]).content,egret.SwfMovie)));
						if(com.txjy.s01.utils.SceneUtil.effectUnit == null)
						{
							com.txjy.s01.utils.SceneUtil.effectLayout(com.txjy.s01.utils.SceneUtil.effectDic.getItem(e["mission"].data.effectId),e["mission"].data.model,e["mission"].data.offset);
							com.txjy.s01.utils.SceneUtil.effectDic.getItem(e["mission"].data.effectId).play(e["mission"].data.delay,e["mission"].data.repeatCount);
						}
						else
						{
							com.txjy.s01.utils.SceneUtil.effectUnit["effectModel"] = new LoadEffect(com.txjy.s01.utils.SceneUtil.effectDic.getItem(e["mission"].data.effectId),e["mission"].data.model,e["mission"].data.offset,e["mission"].data.delay,e["mission"].data.repeatCount);
							com.txjy.s01.utils.SceneUtil.effectUnit["hasReady"] = true;
						}
						com.txjy.s01.utils.SceneUtil._hasLoading = false;
						if(com.txjy.s01.utils.SceneUtil._dequeArr.length != 0)
						{
							var dataObj:any = com.txjy.s01.utils.SceneUtil._dequeArr.shift();
							if(dataObj["effectId"] == CommonDef.RES_TASK_EFFECT_1 || dataObj["effectId"] == CommonDef.RES_TASK_EFFECT_2)
								com.txjy.s01.utils.SceneUtil.effectUnit = SysEffect.getInstance().playEffect(EffectDef.EFFECT_TYPE_TASK,false);
							else
								com.txjy.s01.utils.SceneUtil.effectUnit = null;
							com.txjy.s01.utils.SceneUtil._loaderAssist["loadMission"](new LoaderMission(dataObj["url"],null,{"effectId":dataObj["effectId"],"model":dataObj["model"],"offset":dataObj["offset"],"delay":dataObj["delay"],"repeatCount":dataObj["repeatCount"]}));
						}
					}

				}

				 class AniObj extends egret.Sprite {

					private _content:egret.SwfMovie;
					private _delay:number = NaN;
					private _repeatCount:number = 0;
					private _hasPlay:boolean = false;

					public constructor(content:egret.SwfMovie)
					{
						super();
						this._content = content;
						this._content.stop();
						this.touchChildren = false;
						this.touchEnabled = false;
						this.addChild(this._content);
					}

					public play(delay:number = 0,repeatCount:number = 1)
					{
						this._delay = delay;
						this._repeatCount = flash.checkInt(repeatCount);
						if(this.parent != null)
							this.parent.removeChild(this);
						TimerUtil.removeTimerExecute(flash.bind(this.playStart,this));
						this._content.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrameHandler,this),null);
						this._hasPlay = true;
						if(delay <= 0)
						{
							var sp:egret.Sprite = <any>LayerUtil.getLayer(LayerDef.TIP);
							sp.addChild(this);
							this._content.gotoAndPlay(1);
							if(<any>!this._content.hasEventListener(egret.Event.ENTER_FRAME))
								this._content.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrameHandler,this),null,false,0);
						}
						else
						{
							TimerUtil.addTimerExecute(flash.bind(this.playStart,this),delay);
						}
					}

					private playStart()
					{
						TimerUtil.removeTimerExecute(flash.bind(this.playStart,this));
						LayerUtil.getStage().addChild(this);
						this._content.gotoAndPlay(1);
						if(<any>!this._content.hasEventListener(egret.Event.ENTER_FRAME))
							this._content.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrameHandler,this),null,false,0);
					}

					public stop()
					{
						if(this._hasPlay == false)
							return ;
						this._hasPlay = false;
						this._content.gotoAndStop(1);
						this._content.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrameHandler,this),null);
						if(this.parent != null)
							this.parent.removeChild(this);
						this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
					}

					private onEnterFrameHandler(e:egret.Event)
					{
						if(this._content.currentFrame == this._content.totalFrames)
							--this._repeatCount;
						if(this._repeatCount == 0)
							this.stop();
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.SceneUtil._eventDispatcher = new egret.EventDispatcher();
com.txjy.s01.utils.SceneUtil.EVENT_TYPE_SCENE_CHANGE = "EVENT_TYPE_SCENE_CHANGE";
com.txjy.s01.utils.SceneUtil.MAP = 0;
com.txjy.s01.utils.SceneUtil.CAMPAIGN = 1;
com.txjy.s01.utils.SceneUtil.MAZE = 2;
com.txjy.s01.utils.SceneUtil.SCENE_ARENA = 3;
com.txjy.s01.utils.SceneUtil.SCENE_PASS = 4;
com.txjy.s01.utils.SceneUtil.SCENE_WINEGENERAL = 5;
com.txjy.s01.utils.SceneUtil.SCENE_RELIC = 6;
com.txjy.s01.utils.SceneUtil.SCENE_CAMP = 7;
com.txjy.s01.utils.SceneUtil.SCENE_KILL = 8;
com.txjy.s01.utils.SceneUtil.SCENE_BATTLEFIELD = 9;
com.txjy.s01.utils.SceneUtil.CUR_SCENCE = 0;
com.txjy.s01.utils.SceneUtil._sceneLoaderAssist = LoaderManager.getInstance().createLoaderAssist("SceneUtil.sceneLoaderAssist");
com.txjy.s01.utils.SceneUtil._maxMission = 0;
com.txjy.s01.utils.SceneUtil._emptyCallBack = null;
com.txjy.s01.utils.SceneUtil._completeCallBack = null;
com.txjy.s01.utils.SceneUtil._progressCallBack = null;
com.txjy.s01.utils.SceneUtil._sceneLoading = false;
com.txjy.s01.utils.SceneUtil.LEFT_TOP = 0x00;
com.txjy.s01.utils.SceneUtil.RIGHT_BOTTOM = 0x01;
com.txjy.s01.utils.SceneUtil.RIGHT_TOP = 0x02;
com.txjy.s01.utils.SceneUtil.LEFT_BOTTOM = 0x03;
com.txjy.s01.utils.SceneUtil.CENTER = 0x04;
com.txjy.s01.utils.SceneUtil.LEFT_CENTER = 0x05;
com.txjy.s01.utils.SceneUtil.RIGHT_CENTER = 0x06;
com.txjy.s01.utils.SceneUtil.TOP_CENTER = 0x07;
com.txjy.s01.utils.SceneUtil.BOTTOM_CENTER = 0x08;
com.txjy.s01.utils.SceneUtil.effectDic = new flash.Dictionary();
com.txjy.s01.utils.SceneUtil._hasLoading = false;
com.txjy.s01.utils.SceneUtil._dequeArr = [];
flash.extendsClass("AniObj","egret.Sprite")
