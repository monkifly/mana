module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class KeyUtil extends egret.HashObject {

					public static get lastKeyDownCode():number
					{
						return com.txjy.s01.utils.KeyUtil._lastKeyDownCode;
					}

					public set lastKeyDownCode(value:number)
		{
			flash.superSetter(com.txjy.s01.utils.KeyUtil, this, "lastKeyDownCode", value);
		}
	
 					public static _lastFocus:egret.DisplayObject;
					public static _lastKeyDownCode:number;
					public static _isExecuteKeyDown:boolean = false;
					public static _isExecuteKeyUp:boolean = false;
					public static _keyDowns:Array<any>;
					public static _keyUps:Array<any>;
					public static _stage:egret.Stage;
					public static setStage(stage:egret.Stage)
					{
						if(<any>!com.txjy.s01.utils.KeyUtil._stage)
						{
							com.txjy.s01.utils.KeyUtil._stage = stage;
							com.txjy.s01.utils.KeyUtil._stage.addEventListener(flash.KeyboardEvent.KEY_DOWN,com.txjy.s01.utils.KeyUtil.onStageKeyDown,null);
							com.txjy.s01.utils.KeyUtil._stage.addEventListener(flash.KeyboardEvent.KEY_UP,com.txjy.s01.utils.KeyUtil.onStageKeyUp,null);
							com.txjy.s01.utils.KeyUtil._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,com.txjy.s01.utils.KeyUtil.onStageMouseDown,null);
							com.txjy.s01.utils.KeyUtil._stage.addEventListener(egret.FocusEvent.FOCUS_IN,com.txjy.s01.utils.KeyUtil.onStageFocusIn,null);
							com.txjy.s01.utils.KeyUtil._stage.addEventListener(egret.Event.DEACTIVATE,com.txjy.s01.utils.KeyUtil.onStageDeactive,null);
						}
						else
						{
							console.log("KeyboardManager::stage has set!!!");
						}
					}

					public static registerKeyDown(keyDown:com.txjy.s01.ui.IKeyDown)
					{
						var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyDown,egret.DisplayObject);
						if(disObj)
						{
							disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,com.txjy.s01.utils.KeyUtil.onAddedToStage,null);
							disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onRemoveFromStage,null);
							disObj.addEventListener(egret.Event.ADDED_TO_STAGE,com.txjy.s01.utils.KeyUtil.onAddedToStage,null);
							disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onRemoveFromStage,null);
						}
						if(<any>!disObj || disObj.stage != null)
						{
							com.txjy.s01.utils.KeyUtil.addKeyDown(keyDown);
						}
					}

					public static unregisterKeyDown(keyDown:com.txjy.s01.ui.IKeyDown)
					{
						var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyDown,egret.DisplayObject);
						if(disObj)
						{
							disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,com.txjy.s01.utils.KeyUtil.onAddedToStage,null);
							disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onRemoveFromStage,null);
						}
						com.txjy.s01.utils.KeyUtil.removeKeyDown(keyDown);
					}

					public static registerKeyUp(keyUp:com.txjy.s01.ui.IKeyUp)
					{
						var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyUp,egret.DisplayObject);
						if(disObj)
						{
							disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,com.txjy.s01.utils.KeyUtil.onAddedToStage,null);
							disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onRemoveFromStage,null);
							disObj.addEventListener(egret.Event.ADDED_TO_STAGE,com.txjy.s01.utils.KeyUtil.onAddedToStage,null);
							disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onRemoveFromStage,null);
						}
						if(<any>!disObj || disObj.stage != null)
						{
							com.txjy.s01.utils.KeyUtil.addKeyUp(keyUp);
						}
					}

					public static unregisterKeyUp(keyUp:com.txjy.s01.ui.IKeyUp)
					{
						var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyUp,egret.DisplayObject);
						if(disObj)
						{
							disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,com.txjy.s01.utils.KeyUtil.onAddedToStage,null);
							disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onRemoveFromStage,null);
						}
						com.txjy.s01.utils.KeyUtil.removeKeyUp(keyUp);
					}

					private static addKeyDown(keyDown:com.txjy.s01.ui.IKeyDown)
					{
						var index:number = flash.checkInt(com.txjy.s01.utils.KeyUtil.getKeyDownIndex(keyDown));
						if(index == -1)
						{
							com.txjy.s01.utils.KeyUtil._keyDowns.push(keyDown);
							if(<any>!com.txjy.s01.utils.KeyUtil._isExecuteKeyDown)
								com.txjy.s01.utils.KeyUtil.sortKeyDownByPriority();
						}
					}

					private static removeKeyDown(keyDown:com.txjy.s01.ui.IKeyDown)
					{
						var index:number = flash.checkInt(com.txjy.s01.utils.KeyUtil.getKeyDownIndex(keyDown));
						if(index != -1)
						{
							com.txjy.s01.utils.KeyUtil._keyDowns.splice(index,1);
						}
					}

					private static addKeyUp(keyUp:com.txjy.s01.ui.IKeyUp)
					{
						var index:number = flash.checkInt(com.txjy.s01.utils.KeyUtil.getKeyUpIndex(keyUp));
						if(index == -1)
						{
							com.txjy.s01.utils.KeyUtil._keyUps.push(keyUp);
							if(<any>!com.txjy.s01.utils.KeyUtil._isExecuteKeyUp)
								com.txjy.s01.utils.KeyUtil.sortKeyUpByPriority();
						}
					}

					private static removeKeyUp(keyUp:com.txjy.s01.ui.IKeyUp)
					{
						var index:number = flash.checkInt(com.txjy.s01.utils.KeyUtil.getKeyUpIndex(keyUp));
						if(index != -1)
						{
							com.txjy.s01.utils.KeyUtil._keyUps.splice(index,1);
						}
					}

					private static getKeyDownIndex(keyDown:com.txjy.s01.ui.IKeyDown):number
					{
						return com.txjy.s01.utils.KeyUtil._keyDowns.indexOf(keyDown);
					}

					private static getKeyUpIndex(keyUp:com.txjy.s01.ui.IKeyUp):number
					{
						return com.txjy.s01.utils.KeyUtil._keyUps.indexOf(keyUp);
					}

					private static sortKeyDownByPriority()
					{
						flash.sortOn(com.txjy.s01.utils.KeyUtil._keyDowns,"keyDownPriority",flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
					}

					private static sortKeyUpByPriority()
					{
						flash.sortOn(com.txjy.s01.utils.KeyUtil._keyUps,"keyUpPriority",flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
					}

					private static onStageKeyDown(event:flash.KeyboardEvent)
					{
						var keyDown:com.txjy.s01.ui.IKeyDown;
						var state:number = 0;
						com.txjy.s01.utils.KeyUtil._isExecuteKeyDown = true;
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.KeyUtil._keyDowns.length; ++i)
						{
							keyDown = com.txjy.s01.utils.KeyUtil._keyDowns[i];
							state = flash.checkInt(keyDown["onKeyDown"](event,com.txjy.s01.utils.KeyUtil._stage["focus"],com.txjy.s01.utils.KeyUtil._lastKeyDownCode));
							if(state == KeyboardDef.ACTION_STATE_STOP)
								break;
						}
						com.txjy.s01.utils.KeyUtil._isExecuteKeyDown = false;
						com.txjy.s01.utils.KeyUtil.sortKeyDownByPriority();
						com.txjy.s01.utils.KeyUtil._lastKeyDownCode = flash.checkInt(event.keyCode);
					}

					private static onStageKeyUp(event:flash.KeyboardEvent)
					{
						if(com.txjy.s01.utils.KeyUtil._lastKeyDownCode == event.keyCode)
							com.txjy.s01.utils.KeyUtil._lastKeyDownCode = flash.checkInt(KeyboardDef.KC_NULL);
						var keyUp:com.txjy.s01.ui.IKeyUp;
						var state:number = 0;
						com.txjy.s01.utils.KeyUtil._isExecuteKeyUp = true;
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.KeyUtil._keyUps.length; ++i)
						{
							keyUp = com.txjy.s01.utils.KeyUtil._keyUps[i];
							state = flash.checkInt(keyUp["onKeyUp"](event,com.txjy.s01.utils.KeyUtil._stage["focus"],com.txjy.s01.utils.KeyUtil._lastKeyDownCode));
							if(state == KeyboardDef.ACTION_STATE_STOP)
								break;
						}
						com.txjy.s01.utils.KeyUtil._isExecuteKeyUp = false;
						com.txjy.s01.utils.KeyUtil.sortKeyUpByPriority();
					}

					private static onStageDeactive(event:egret.Event)
					{
						com.txjy.s01.utils.KeyUtil._lastKeyDownCode = flash.checkInt(KeyboardDef.KC_NULL);
					}

					private static onAddedToStage(event:egret.Event)
					{
						var keyDown:com.txjy.s01.ui.IKeyDown = <any><IKeyDown>flash.As3As(event.currentTarget,IKeyDown);
						var keyUp:com.txjy.s01.ui.IKeyUp = <any><IKeyUp>flash.As3As(event.currentTarget,IKeyUp);
						if(keyDown)
							com.txjy.s01.utils.KeyUtil.addKeyDown(keyDown);
						if(keyUp)
							com.txjy.s01.utils.KeyUtil.addKeyUp(keyUp);
					}

					private static onRemoveFromStage(event:egret.Event)
					{
						var keyDown:com.txjy.s01.ui.IKeyDown = <any><IKeyDown>flash.As3As(event.currentTarget,IKeyDown);
						var keyUp:com.txjy.s01.ui.IKeyUp = <any><IKeyUp>flash.As3As(event.currentTarget,IKeyUp);
						if(keyDown)
							com.txjy.s01.utils.KeyUtil.removeKeyDown(keyDown);
						if(keyUp)
							com.txjy.s01.utils.KeyUtil.removeKeyUp(keyUp);
					}

					private static onStageMouseDown(event:flash.MouseEvent)
					{
						if(flash.As3is(com.txjy.s01.utils.KeyUtil._stage["focus"],flash.TextField))
						{
							com.txjy.s01.utils.KeyUtil._stage["focus"] = <egret.DisplayObject>flash.As3As(event.target,egret.DisplayObject);
						}
					}

					private static onStageFocusIn(event:egret.FocusEvent)
					{
						if(com.txjy.s01.utils.KeyUtil._lastFocus)
						{
							com.txjy.s01.utils.KeyUtil._lastFocus.removeEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onFocusRemoveFromStage,null);
						}
						com.txjy.s01.utils.KeyUtil._lastFocus = com.txjy.s01.utils.KeyUtil._stage["focus"];
						if(com.txjy.s01.utils.KeyUtil._lastFocus)
						{
							com.txjy.s01.utils.KeyUtil._lastFocus.addEventListener(egret.Event.REMOVED_FROM_STAGE,com.txjy.s01.utils.KeyUtil.onFocusRemoveFromStage,null);
						}
					}

					private static onFocusRemoveFromStage(event:egret.Event)
					{
						com.txjy.s01.utils.KeyUtil._lastKeyDownCode = flash.checkInt(KeyboardDef.KC_NULL);
						com.txjy.s01.utils.KeyUtil._stage["focus"] = com.txjy.s01.utils.KeyUtil._stage;
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.KeyUtil._lastKeyDownCode = KeyboardDef.KC_NULL;
com.txjy.s01.utils.KeyUtil._keyDowns = [];
com.txjy.s01.utils.KeyUtil._keyUps = [];
