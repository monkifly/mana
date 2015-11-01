module mana {
	export module utils {
		export interface IKeyUp {

			onKeyUp(event:flash.KeyboardEvent,focus:egret.DisplayObject,lastKeyDownCode:number):number;
			keyUpPriority:number;
		}
	}
}

