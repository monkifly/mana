module mana {
	export module core {
		export class BaseModel extends egret.EventDispatcher {


			public constructor()
			{
				super();
			}

			public addEventListener(type:string,listener:Function,useCapture:boolean = false,priority:number = 0,useWeakReference:boolean = true)
			{
				super.addEventListener(type,listener,null,useCapture,priority);
			}

		}
	}
}

flash.extendsClass("mana.core.BaseModel","egret.EventDispatcher")
