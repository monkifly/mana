module mana {
	export module net {
		export class BaseMsg extends egret.HashObject {

			public static MSG_MIN_LENGTH:number;
			private _bytes:flash.ByteArray;
			protected _msgID:number = 0;
			private _callbacks:flash.Dictionary;

			public constructor()
			{
				super();
				this._callbacks = new flash.Dictionary();
			}

			public get bytes():flash.ByteArray
			{
				return this._bytes;
			}

			public set bytes(value:flash.ByteArray)
		{
			flash.superSetter(mana.net.BaseMsg, this, "bytes", value);
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

			public decode(value:flash.ByteArray,needUncompress:boolean = false)
			{
				if(needUncompress)
					value.uncompress();
				this._bytes = value;
			}

		}
	}
}

mana.net.BaseMsg.MSG_MIN_LENGTH = 6;
