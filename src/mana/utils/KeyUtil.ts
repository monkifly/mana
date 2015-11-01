//module mana {
//	export module utils {
//		export class KeyUtil extends egret.HashObject {
//
//			public static get lastKeyDownCode():number
//			{
//				return mana.utils.KeyUtil._lastKeyDownCode;
//			}
//
//			public set lastKeyDownCode(value:number)
//		{
//			flash.superSetter(mana.utils.KeyUtil, this, "lastKeyDownCode", value);
//		}
//	
// 			public static _lastFocus:egret.DisplayObject;
//			public static _lastKeyDownCode:number;
//			public static _isExecuteKeyDown:boolean = false;
//			public static _isExecuteKeyUp:boolean = false;
//			public static _keyDowns:Array<any>;
//			public static _keyUps:Array<any>;
//			public static _stage:egret.Stage;
//			public static setStage(stage:egret.Stage)
//			{
//				if(<any>!mana.utils.KeyUtil._stage)
//				{
//					mana.utils.KeyUtil._stage = stage;
//					mana.utils.KeyUtil._stage.addEventListener(flash.KeyboardEvent.KEY_DOWN,mana.utils.KeyUtil.onStageKeyDown,null);
//					mana.utils.KeyUtil._stage.addEventListener(flash.KeyboardEvent.KEY_UP,mana.utils.KeyUtil.onStageKeyUp,null);
//					mana.utils.KeyUtil._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,mana.utils.KeyUtil.onStageMouseDown,null);
//					mana.utils.KeyUtil._stage.addEventListener(egret.FocusEvent.FOCUS_IN,mana.utils.KeyUtil.onStageFocusIn,null);
//					mana.utils.KeyUtil._stage.addEventListener(egret.Event.DEACTIVATE,mana.utils.KeyUtil.onStageDeactive,null);
//				}
//				else
//				{
//					console.log("KeyboardManager::stage has set!!!");
//				}
//			}
//
//			public static registerKeyDown(keyDown:mana.utils.IKeyDown)
//			{
//				var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyDown,egret.DisplayObject);
//				if(disObj)
//				{
//					disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,mana.utils.KeyUtil.onAddedToStage,null);
//					disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onRemoveFromStage,null);
//					disObj.addEventListener(egret.Event.ADDED_TO_STAGE,mana.utils.KeyUtil.onAddedToStage,null);
//					disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onRemoveFromStage,null);
//				}
//				if(<any>!disObj || disObj.stage != null)
//				{
//					mana.utils.KeyUtil.addKeyDown(keyDown);
//				}
//			}
//
//			public static unregisterKeyDown(keyDown:mana.utils.IKeyDown)
//			{
//				var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyDown,egret.DisplayObject);
//				if(disObj)
//				{
//					disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,mana.utils.KeyUtil.onAddedToStage,null);
//					disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onRemoveFromStage,null);
//				}
//				mana.utils.KeyUtil.removeKeyDown(keyDown);
//			}
//
//			public static registerKeyUp(keyUp:mana.utils.IKeyUp)
//			{
//				var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyUp,egret.DisplayObject);
//				if(disObj)
//				{
//					disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,mana.utils.KeyUtil.onAddedToStage,null);
//					disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onRemoveFromStage,null);
//					disObj.addEventListener(egret.Event.ADDED_TO_STAGE,mana.utils.KeyUtil.onAddedToStage,null);
//					disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onRemoveFromStage,null);
//				}
//				if(<any>!disObj || disObj.stage != null)
//				{
//					mana.utils.KeyUtil.addKeyUp(keyUp);
//				}
//			}
//
//			public static unregisterKeyUp(keyUp:mana.utils.IKeyUp)
//			{
//				var disObj:egret.DisplayObject = <egret.DisplayObject>flash.As3As(keyUp,egret.DisplayObject);
//				if(disObj)
//				{
//					disObj.removeEventListener(egret.Event.ADDED_TO_STAGE,mana.utils.KeyUtil.onAddedToStage,null);
//					disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onRemoveFromStage,null);
//				}
//				mana.utils.KeyUtil.removeKeyUp(keyUp);
//			}
//
//			private static addKeyDown(keyDown:mana.utils.IKeyDown)
//			{
//				var index:number = flash.checkInt(mana.utils.KeyUtil.getKeyDownIndex(keyDown));
//				if(index == -1)
//				{
//					mana.utils.KeyUtil._keyDowns.push(keyDown);
//					if(<any>!mana.utils.KeyUtil._isExecuteKeyDown)
//						mana.utils.KeyUtil.sortKeyDownByPriority();
//				}
//			}
//
//			private static removeKeyDown(keyDown:mana.utils.IKeyDown)
//			{
//				var index:number = flash.checkInt(mana.utils.KeyUtil.getKeyDownIndex(keyDown));
//				if(index != -1)
//				{
//					mana.utils.KeyUtil._keyDowns.splice(index,1);
//				}
//			}
//
//			private static addKeyUp(keyUp:mana.utils.IKeyUp)
//			{
//				var index:number = flash.checkInt(mana.utils.KeyUtil.getKeyUpIndex(keyUp));
//				if(index == -1)
//				{
//					mana.utils.KeyUtil._keyUps.push(keyUp);
//					if(<any>!mana.utils.KeyUtil._isExecuteKeyUp)
//						mana.utils.KeyUtil.sortKeyUpByPriority();
//				}
//			}
//
//			private static removeKeyUp(keyUp:mana.utils.IKeyUp)
//			{
//				var index:number = flash.checkInt(mana.utils.KeyUtil.getKeyUpIndex(keyUp));
//				if(index != -1)
//				{
//					mana.utils.KeyUtil._keyUps.splice(index,1);
//				}
//			}
//
//			private static getKeyDownIndex(keyDown:mana.utils.IKeyDown):number
//			{
//				return mana.utils.KeyUtil._keyDowns.indexOf(keyDown);
//			}
//
//			private static getKeyUpIndex(keyUp:mana.utils.IKeyUp):number
//			{
//				return mana.utils.KeyUtil._keyUps.indexOf(keyUp);
//			}
//
//			private static sortKeyDownByPriority()
//			{
//				flash.sortOn(mana.utils.KeyUtil._keyDowns,"keyDownPriority",flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
//			}
//
//			private static sortKeyUpByPriority()
//			{
//				flash.sortOn(mana.utils.KeyUtil._keyUps,"keyUpPriority",flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
//			}
//
//			private static onStageKeyDown(event:flash.KeyboardEvent)
//			{
//				var keyDown:mana.utils.IKeyDown;
//				var state:number = 0;
//				mana.utils.KeyUtil._isExecuteKeyDown = true;
//				for(var i:number = flash.checkInt(0);i < mana.utils.KeyUtil._keyDowns.length; ++i)
//				{
//					keyDown = mana.utils.KeyUtil._keyDowns[i];
//					state = flash.checkInt(keyDown.onKeyDown(event,mana.utils.KeyUtil._stage["focus"],mana.utils.KeyUtil._lastKeyDownCode));
//					if(state == mana.utils.KeyboardDef.ACTION_STATE_STOP)
//						break;
//				}
//				mana.utils.KeyUtil._isExecuteKeyDown = false;
//				mana.utils.KeyUtil.sortKeyDownByPriority();
//				mana.utils.KeyUtil._lastKeyDownCode = flash.checkInt(event.keyCode);
//			}
//
//			private static onStageKeyUp(event:flash.KeyboardEvent)
//			{
//				if(mana.utils.KeyUtil._lastKeyDownCode == event.keyCode)
//					mana.utils.KeyUtil._lastKeyDownCode = flash.checkInt(mana.utils.KeyboardDef.KC_NULL);
//				var keyUp:mana.utils.IKeyUp;
//				var state:number = 0;
//				mana.utils.KeyUtil._isExecuteKeyUp = true;
//				for(var i:number = flash.checkInt(0);i < mana.utils.KeyUtil._keyUps.length; ++i)
//				{
//					keyUp = mana.utils.KeyUtil._keyUps[i];
//					state = flash.checkInt(keyUp.onKeyUp(event,mana.utils.KeyUtil._stage["focus"],mana.utils.KeyUtil._lastKeyDownCode));
//					if(state == mana.utils.KeyboardDef.ACTION_STATE_STOP)
//						break;
//				}
//				mana.utils.KeyUtil._isExecuteKeyUp = false;
//				mana.utils.KeyUtil.sortKeyUpByPriority();
//			}
//
//			private static onStageDeactive(event:egret.Event)
//			{
//				mana.utils.KeyUtil._lastKeyDownCode = flash.checkInt(mana.utils.KeyboardDef.KC_NULL);
//			}
//
//			private static onAddedToStage(event:egret.Event)
//			{
//				var keyDown:mana.utils.IKeyDown = <mana.utils.IKeyDown>flash.As3As(event.currentTarget,"mana.utils.IKeyDown");
//				var keyUp:mana.utils.IKeyUp = <mana.utils.IKeyUp>flash.As3As(event.currentTarget,"mana.utils.IKeyUp");
//				if(keyDown)
//					mana.utils.KeyUtil.addKeyDown(keyDown);
//				if(keyUp)
//					mana.utils.KeyUtil.addKeyUp(keyUp);
//			}
//
//			private static onRemoveFromStage(event:egret.Event)
//			{
//				var keyDown:mana.utils.IKeyDown = <mana.utils.IKeyDown>flash.As3As(event.currentTarget,"mana.utils.IKeyDown");
//				var keyUp:mana.utils.IKeyUp = <mana.utils.IKeyUp>flash.As3As(event.currentTarget,"mana.utils.IKeyUp");
//				if(keyDown)
//					mana.utils.KeyUtil.removeKeyDown(keyDown);
//				if(keyUp)
//					mana.utils.KeyUtil.removeKeyUp(keyUp);
//			}
//
//			private static onStageMouseDown(event:flash.MouseEvent)
//			{
//				if(flash.As3is(mana.utils.KeyUtil._stage["focus"],flash.TextField))
//				{
//					mana.utils.KeyUtil._stage["focus"] = <egret.DisplayObject>flash.As3As(event.target,egret.DisplayObject);
//				}
//			}
//
//			private static onStageFocusIn(event:egret.FocusEvent)
//			{
//				if(mana.utils.KeyUtil._lastFocus)
//				{
//					mana.utils.KeyUtil._lastFocus.removeEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onFocusRemoveFromStage,null);
//				}
//				mana.utils.KeyUtil._lastFocus = mana.utils.KeyUtil._stage["focus"];
//				if(mana.utils.KeyUtil._lastFocus)
//				{
//					mana.utils.KeyUtil._lastFocus.addEventListener(egret.Event.REMOVED_FROM_STAGE,mana.utils.KeyUtil.onFocusRemoveFromStage,null);
//				}
//			}
//
//			private static onFocusRemoveFromStage(event:egret.Event)
//			{
//				mana.utils.KeyUtil._lastKeyDownCode = flash.checkInt(mana.utils.KeyboardDef.KC_NULL);
//				mana.utils.KeyUtil._stage["focus"] = mana.utils.KeyUtil._stage;
//			}
//
//		}
//	}
//}
//
//mana.utils.KeyUtil._lastKeyDownCode = mana.utils.KeyboardDef.KC_NULL;
//mana.utils.KeyUtil._keyDowns = [];
//mana.utils.KeyUtil._keyUps = [];
