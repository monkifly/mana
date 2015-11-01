module mana {
	export module utils {
		export class MouseHoldUtil extends egret.HashObject {

			public static DEFAULT_HOLD_TIME:number;
			public static DEFAULT_INTERVAL:number;
			private curTime:number = 0;
			private target:egret.DisplayObject;
			private holdHandler:Function;
			private holdStopHandler:Function;
			private holdTime:number = 0;
			private interval:number = 0;
			private stage:egret.Stage;
			private isMouseDownDo:boolean = false;
			private isMoustOutStop:boolean = false;
			private isMoustOverContinue:boolean = false;
			private mouseState_mouseOut:boolean = false;

			public constructor(targetPm:egret.DisplayObject,holdHandlerPm:Function,holdStopHandlerPm:Function = null,downDo:boolean = false,outStop:boolean = false,overContinue:boolean = false,intervalPm:number = mana.utils.MouseHoldUtil.DEFAULT_INTERVAL,holdTimePm:number = mana.utils.MouseHoldUtil.DEFAULT_HOLD_TIME)
			{
				super();
				this.register(targetPm,holdHandlerPm,holdStopHandlerPm,downDo,outStop,overContinue,intervalPm,holdTimePm);
			}

			public register(targetPm:egret.DisplayObject,holdHandlerPm:Function,holdStopHandlerPm:Function = null,downDo:boolean = false,outStop:boolean = false,overContinue:boolean = false,intervalPm:number = mana.utils.MouseHoldUtil.DEFAULT_INTERVAL,holdTimePm:number = mana.utils.MouseHoldUtil.DEFAULT_HOLD_TIME)
			{
				this.unregister();
				this.target = targetPm;
				this.holdHandler = holdHandlerPm;
				this.holdStopHandler = holdStopHandlerPm;
				this.interval = flash.checkInt(intervalPm);
				this.holdTime = flash.checkInt(holdTimePm);
				this.isMouseDownDo = downDo;
				this.isMoustOutStop = outStop;
				this.isMoustOverContinue = overContinue;
				this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this),null);
				if(<any>!this.stage && this.target.stage)
					this.stage = this.target.stage;
			}

			public unregister()
			{
				if(this.target)
				{
					this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this),null);
					this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onDownEnterFrame,this),null);
					this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onHoldEnterFrame,this),null);
				}
				this.target = null;
				this.holdHandler = null;
			}

			private onMouseDown(event:flash.MouseEvent)
			{
				if(<any>!this.stage && this.target.stage)
					this.stage = this.target.stage;
				this.stage.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onStageMouseUp,this),null);
				this.target.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onDownEnterFrame,this),null);
				this.curTime = flash.checkUint(egret.getTimer());
				if(this.isMouseDownDo)
					this.holdHandler();
				this.mouseState_mouseOut = false;
				if(this.isMoustOutStop)
				{
					this.target.addEventListener(flash.MouseEvent.ROLL_OUT,flash.bind(this.onRollOut,this),null);
					if(this.isMoustOverContinue)
					{
						this.target.addEventListener(flash.MouseEvent.ROLL_OVER,flash.bind(this.onRollOver,this),null);
					}
				}
			}

			private onStageMouseUp(event:flash.MouseEvent = null)
			{
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onStageMouseUp,this),null);
				this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onDownEnterFrame,this),null);
				this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onHoldEnterFrame,this),null);
				this.target.removeEventListener(flash.MouseEvent.ROLL_OUT,flash.bind(this.onRollOut,this),null);
				this.target.removeEventListener(flash.MouseEvent.ROLL_OVER,flash.bind(this.onRollOver,this),null);
				if(this.holdStopHandler != null)
					this.holdStopHandler();
			}

			private onDownEnterFrame(event:egret.Event)
			{
				if(egret.getTimer() - this.curTime >= this.holdTime)
				{
					this.target.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onDownEnterFrame,this),null);
					this.target.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onHoldEnterFrame,this),null);
					this.curTime = flash.checkUint(egret.getTimer());
				}
			}

			private onHoldEnterFrame(event:egret.Event)
			{
				if(this.mouseState_mouseOut)
					return ;
				var getTime:number = flash.checkInt(egret.getTimer());
				if(getTime - this.curTime >= this.interval)
				{
					this.holdHandler();
					this.curTime += flash.checkUint(this.interval);
				}
			}

			private onRollOut(event:flash.MouseEvent)
			{
				if(<any>!this.isMoustOverContinue)
				{
					this.onStageMouseUp();
				}
				else
				{
					this.mouseState_mouseOut = true;
				}
			}

			private onRollOver(event:flash.MouseEvent)
			{
				this.mouseState_mouseOut = false;
			}

		}
	}
}

mana.utils.MouseHoldUtil.DEFAULT_HOLD_TIME = 400;
mana.utils.MouseHoldUtil.DEFAULT_INTERVAL = 70;
