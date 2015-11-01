module mana {
	export module core {
		export class MemoryTestView extends egret.Sprite {

			private _tfMem:flash.TextField;
			private _tfFrame:flash.TextField;
			private _count:number = 0;
			private _lastTime:number = 0;
			private _lastCount:number = 0;

			public constructor()
			{
				var _self__:any = this;
				super();
				this._tfMem = new flash.TextField();
				this._tfMem.textAlign = flash.TextFieldAutoSize.LEFT;
				this._tfMem.x = 2;
				this._tfMem.y = 2;
				this._tfMem["selectable"] = false;
				this._tfMem.touchEnabled = false;
				_self__.addChild(this._tfMem);
				this._tfFrame = new flash.TextField();
				this._tfFrame.textAlign = flash.TextFieldAutoSize.LEFT;
				this._tfFrame.x = 2;
				this._tfFrame.y = 22;
				this._tfFrame["selectable"] = false;
				this._tfFrame.touchEnabled = false;
				_self__.addChild(this._tfFrame);
				this.graphics.beginFill(0xcccccc,1);
				this.graphics.drawRect(0,0,90,40);
				this.graphics.endFill();
				TimerUtil.addFrameExecute(flash.bind(this.onFrame,this));
				_self__.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this),null);
				_self__.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.onMouseUp,this),null);
			}

			private onFrame()
			{
				this._count++;
				var dTime:number = flash.checkInt(egret.getTimer() - this._lastTime);
				var fps:number = <any>0;
				if(dTime > 200)
				{
					fps = (this._count - this._lastCount) / dTime * 1000;
					this._lastCount = flash.checkInt(this._count);
					this._lastTime = flash.checkInt(egret.getTimer());
					this._tfFrame.text = "Fps:" + fps.toFixed(1);
				}
				this._tfMem.text = "Mem:" + flash.System["totalMemory"] / 1024 + "KB";
			}

			private onMouseDown(event:flash.MouseEvent)
			{
				var _self__:any = this;
				_self__.flash.startDrag(undefined);
			}

			private onMouseUp(event:flash.MouseEvent)
			{
				var _self__:any = this;
				_self__.flash.stopDrag(undefined);
			}

		}
	}
}

flash.extendsClass("mana.core.MemoryTestView","egret.Sprite")
