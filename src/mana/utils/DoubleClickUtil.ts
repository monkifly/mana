module mana {
	export module utils {
		export class DoubleClickUtil extends egret.HashObject {

			public static TIME_DELAY:number;
			private curTime:number = 0;
			private target:egret.DisplayObject;
			private doubleClickHandler:Function;
			private clickHandler:Function;
			private mouseDownCount:number = 0;

			public constructor(targetPm:egret.DisplayObject,doubleClickHandlerPm:Function,clickHandlerPm:Function = null)
			{
				super();
				this.register(targetPm,doubleClickHandlerPm,clickHandlerPm);
			}

			public register(targetPm:egret.DisplayObject,doubleClickHandlerPm:Function,clickHandlerPm:Function = null)
			{
				this.unregister();
				this.target = targetPm;
				this.doubleClickHandler = doubleClickHandlerPm;
				this.clickHandler = clickHandlerPm;
				this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this),null);
				this.target.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onMouseUp,this),null);
			}

			public unregister()
			{
				if(this.target)
				{
					this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this),null);
					this.target.removeEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onMouseUp,this),null);
					this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrame,this),null);
				}
				this.target = null;
				this.doubleClickHandler = null;
				this.clickHandler = null;
				this.curTime = flash.checkUint(0);
				this.mouseDownCount = flash.checkInt(0);
			}

			private onMouseDown(event:flash.MouseEvent)
			{
				if(egret.getTimer() - this.curTime <= mana.utils.DoubleClickUtil.TIME_DELAY)
				{
					if(this.doubleClickHandler != null)
						this.doubleClickHandler(event);
					this.mouseDownCount = flash.checkInt(0);
					this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrame,this),null);
				}
				else
				{
					if(this.mouseDownCount == 0)
						this.curTime = flash.checkUint(egret.getTimer());
					this.mouseDownCount++;
				}
				this.target.stage.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onStageMouseUp,this),null);
			}

			private onMouseUp(event:flash.MouseEvent)
			{
				if(this.mouseDownCount == 0)
					return ;
				if(egret.getTimer() - this.curTime > mana.utils.DoubleClickUtil.TIME_DELAY)
				{
					if(this.mouseDownCount == 1 && this.clickHandler != null)
						this.clickHandler(event);
					this.mouseDownCount = flash.checkInt(0);
				}
				else
				{
					this.target.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrame,this),null);
				}
			}

			private onEnterFrame(event:egret.Event)
			{
				if(egret.getTimer() - this.curTime > mana.utils.DoubleClickUtil.TIME_DELAY)
				{
					if(this.mouseDownCount == 1 && this.clickHandler != null)
						this.clickHandler(null);
					this.mouseDownCount = flash.checkInt(0);
					event.currentTarget["removeEventListener"](egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrame,this));
				}
			}

			private onStageMouseUp(event:flash.MouseEvent)
			{
				event.currentTarget["removeEventListener"](egret.TouchEvent.TOUCH_END,flash.bind(this.onStageMouseUp,this));
				if(this.target == event.target || (flash.As3is(this.target,egret.DisplayObjectContainer)) && (<egret.DisplayObjectContainer>(this.target)).contains(<egret.DisplayObject>flash.As3As(event.target,egret.DisplayObject)))
				{
					return ;
				}
				this.mouseDownCount = flash.checkInt(0);
				this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrame,this),null);
			}

		}
	}
}

mana.utils.DoubleClickUtil.TIME_DELAY = 270;
