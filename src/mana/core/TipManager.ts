module mana {
	export module core {
		export class TipManager extends mana.Singleton {

			public static getInstance_static_mana_core_TipManager():mana.core.TipManager
			{
				return <mana.core.TipManager>mana.Singleton.getInstance(mana.core.TipManager);
			}

			private _stage:egret.Stage;

			public constructor()
			{
				super();
				this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStageMouseDown,this);
			}

			public registerComponent(target:egret.DisplayObject,data:any = null,tipClass:any = null,timeLag:boolean = false,maxWidth:number = 0,mouseDownDistroy:boolean = true)
			{
			}

			public unregisterComponent(target:egret.DisplayObject)
			{
			}

			private onStageMouseDown(event:egret.TouchEvent)
			{
			}

		}

		 class Info extends egret.HashObject {

			public timelag:boolean = false;
			public showObject:any;
			public maxWidth:number = 0;
			public tipClass:any;
			public mouseDownDistroy:boolean = false;

			public constructor(_arg1:any = null,_arg2:boolean = false,_arg3:number = 0)
			{
				super();
				this.showObject = _arg1;
				this.timelag = _arg2;
				this.maxWidth = _arg3;
			}

		}
	}
}
