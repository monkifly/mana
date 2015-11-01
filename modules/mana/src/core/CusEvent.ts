module mana {
	/**
	 *
	 * @author 
	 *
	 */
	export class CusEvent extends egret.Event{
		public constructor(type:string, data:any=null) {
            super(type);
            
            console.log("ad");
		}
	}
}
