module mana {
	export module net {
		export class BaseMsg extends egret.HashObject {

			public static MSG_MIN_LENGTH:number;
			private _bytes:egret.ByteArray;
			protected _msgID:number = 0;
			private _callbacks:any;

			public constructor()
			{
				super();
                this._callbacks = {};
			}

			public get bytes():egret.ByteArray
			{
				return this._bytes;
			}
	
 			public doCallBacks()
			{
				for(var fun_key_a in this._callbacks.map)
				{
					var fun:Function = this._callbacks.map[fun_key_a][1];
					fun(this);
				}
				this._bytes = null;
			}

			public registerCallback(fun:Function)
			{
				if(<any>!this._callbacks.getItem(fun))
					this._callbacks.setItem(fun,fun);
			}

			public unregisterCallback(fun:Function)
			{
				this._callbacks.delItem(fun);
			}

			public hasCallback():boolean
			{
				var hasFun:boolean = <any>false;
				for(var fun_key_a in this._callbacks.map)
				{
					var fun:Function = this._callbacks.map[fun_key_a][1];
					if(fun != null)
					{
						hasFun = true;
						break;
					}
				}
				return hasFun;
			}

			public getKey():number
			{
				return this._msgID;
			}

			public decode(value:egret.ByteArray,needUncompress:boolean = false)
			{
//				if(needUncompress)
//					value.uncompress();
				this._bytes = value;
			}

		}
	}
}

mana.net.BaseMsg.MSG_MIN_LENGTH = 6;
