module mana.utils {
	/**
	 *
	 * @author 
	 *
	 */
	export class MsgUtil extends BaseUtil{
        public defaultMsgType: number = 0;
        private msgClasses: any = {};
        private idToTypeFun: Function;
		public constructor() {
            super();
		}
		
		public show(msg:any, ...args):void{
            var type: number = this.defaultMsgType;
		    if(!isNaN(msg)){
    		    type = this.idToTypeFun(msg);
		    }
            this.showMsg(type,msg,args);
		}
		
		public showMsg(type:number, msg:string, ...args):void{
            if(args[0] instanceof Array){
                args = args[0];
            }
            var msgClass: any = this.getMsgClass(type);
            var msgView = new msgClass();
		}
		
		public setMsgClass(type:number, msgClass:any):void{
            this.msgClasses[type] = msgClass;
		}
		public getMsgClass(type:number):any{
		    return this.msgClasses[type];
		}
	}
}
