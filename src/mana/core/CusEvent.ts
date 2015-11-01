module mana {
	export module core {
		export class CusEvent extends egret.Event {

			public data:any;

			public constructor(type:string,dataPm:any = null,bubbles:boolean = false,cancelable:boolean = false)
			{
				super(type,bubbles,cancelable);
				this.data = dataPm;
			}

		}
	}
}

flash.extendsClass("mana.core.CusEvent","egret.Event")
