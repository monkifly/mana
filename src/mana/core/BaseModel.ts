module mana {
		export class BaseModel extends egret.EventDispatcher {

        public static create(...args: any[]): any {
            var Class: any = this;
            var obj: any = new Class();
            if(obj.init) obj.init.apply(obj,arguments);
            return obj;
        }
		
		public constructor()
		{
			super();
		}

        public addEventListener(type: string,listener: Function,thisObject:any=null,useCapture:boolean=false,priority:number=0):void{
            super.addEventListener(type,listener,thisObject,useCapture,priority);
		}
        public once(type: string,listener: Function,thisObject?: any,useCapture?: boolean,priority?: number): void {
            super.once(type,listener,thisObject,useCapture,priority);
        }
	}
}