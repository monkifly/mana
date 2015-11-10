module game.utils {
	/**
	 *
	 * @author 
	 *
	 */
	export class MsgUtil extends mana.utils.BaseUtil{
		public constructor() {
            super();
		}
		
		public show(msg:any, ...args):void{
		    if(!isNaN(msg)){
//                var info = sheetUitl.getInfo(msg);
//                if(info.type==1){
//                    Alert.show();
//                }
		    }else{
                var fun: Function;
                if(args[args.length - 1] instanceof Function){
                    fun = args[args.length - 1];
                }
                msg = game.stringUtil.substitute(msg,args);
                game.ui.Alert.show(msg,fun);
		    }
		}
	}
}
