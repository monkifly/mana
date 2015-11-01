module mana {
	export module net {
		export class Messager extends mana.core.Singleton {

			public get socket():flash.Socket
			{
				return this._socket;
			}

			public set socket(value:flash.Socket)
		{
			flash.superSetter(mana.net.Messager, this, "socket", value);
		}
	
 			public static getInstance():mana.net.Messager
			{
				return <mana.net.Messager>flash.As3As(Singleton.getInstance(mana.net.Messager),mana.net.Messager);
			}

			private _msgKeyDic:flash.Dictionary;
			private _msgClassDic:flash.Dictionary;
			private _socket:flash.Socket;
			private _curBuffMsg:mana.net.BaseMsg;
			private _curMsgLength:number = 0;

			public constructor()
			{
				super();
				this._msgKeyDic = new flash.Dictionary();
				this._msgClassDic = new flash.Dictionary();
				this._socket = new flash.Socket();
				this._socket.endian = flash.Endian.LITTLE_ENDIAN;
				this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,flash.bind(this.onRevie,this),null);
				this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR,flash.bind(this.onErrorHandler,this),null);
				this._socket.addEventListener(flash.SecurityErrorEvent.SECURITY_ERROR,flash.bind(this.onErrorHandler,this),null);
				this._socket.addEventListener(egret.Event.CONNECT,flash.bind(this.onConnect,this),null);
			}

			public connect(host:string,port:number,securityPort:number = 0)
			{
				if(securityPort != 0)
				{
					flash.Security["loadPolicyFile"]("xmlsocket://" + host + ":" + securityPort);
				}
				this._socket.connect(host,port);
			}

			public registerMsg(classRef:any,callback:Function)
			{
				var msg:mana.net.BaseMsg;
				if(<any>!this._msgClassDic.getItem(classRef))
				{
					msg = new classRef();
					if(<any>!msg)
						throw new flash.Error(classRef + "is not BaseMsg!").message;
					this._msgClassDic.setItem(classRef,msg);
					this._msgKeyDic.setItem(msg.getKey(),msg);
				}
				msg = this._msgClassDic.getItem(classRef);
				msg.registerCallback(callback);
			}

			public unregisterMsg(classRef:any)
			{
				var msg:mana.net.BaseMsg = <any>this._msgClassDic.getItem(classRef);
				if(msg)
				{
					this._msgKeyDic.delItem(msg.getKey());
					this._msgClassDic.delItem(classRef);
				}
			}

			public unregisterFunction(classRef:any,callback:Function)
			{
				var msg:mana.net.BaseMsg = <any>this._msgClassDic.getItem(classRef);
				if(msg)
				{
					msg.unregisterCallback(callback);
					if(<any>!msg.hasCallback())
					{
						this._msgKeyDic.delItem(msg.getKey());
						this._msgClassDic.delItem(classRef);
					}
				}
			}

			public send(msgID:number,content:flash.ByteArray)
			{
				msgID = flash.checkInt(msgID);

				if(<any>!this.socket.connected)
				{
					console.log("socket 未连接！");
					return ;
				}
				logger.output("[net]","sendID:" + msgID);
				var NETWAY_ID_1:number = flash.checkInt(1403);
				var NETWAY_ID_2:number = flash.checkInt(1402);
				var netwayLen:number = flash.checkInt(mana.net.BaseMsg.MSG_MIN_LENGTH + mana.net.BaseMsg.MSG_MIN_LENGTH);
				var contentLen:number = flash.checkInt(0);
				if(content)
				{
					netwayLen += flash.checkInt(content.length);
				}
				if(msgID > 2000 && msgID <= 3000)
				{
					this._socket.writeInt(netwayLen);
					this._socket.writeShort(NETWAY_ID_1);
					this.sendByteArray(msgID,content);
				}
				else if(msgID > 3000)
				{
					this._socket.writeInt(netwayLen);
					this._socket.writeShort(NETWAY_ID_2);
					this.sendByteArray(msgID,content);
				}
				else
				{
					this.sendByteArray(msgID,content);
				}
				this._socket.flush();
			}

			private sendByteArray(msgID:number,content:flash.ByteArray)
			{
				msgID = flash.checkInt(msgID);

				var conLen:number = flash.checkInt(0);
				if(content)
					conLen = flash.checkInt(content.length);
				this._socket.writeInt(conLen + mana.net.BaseMsg.MSG_MIN_LENGTH);
				this._socket.writeShort(msgID);
				if(content)
					this._socket.writeBytes(content);
			}

			private onRevie(event:egret.ProgressEvent)
			{
				this.asseptData();
			}

			private asseptData()
			{
				if(<any>!this._socket.connected)
					return ;
				if(this._curMsgLength == 0 && this._socket.bytesAvailable >= mana.net.BaseMsg.MSG_MIN_LENGTH)
				{
					this._curMsgLength = flash.checkInt(this._socket.readUnsignedInt());
					var msgID:number = flash.checkInt(this._socket.readUnsignedShort());
					this._curBuffMsg = this._msgKeyDic.getItem(msgID);
					logger.output("[net]","asseptID: " + msgID + "   Msg: " + egret.getQualifiedClassName(this._curBuffMsg));
				}
				if(this._curMsgLength != 0 && this._socket.bytesAvailable >= this._curMsgLength - mana.net.BaseMsg.MSG_MIN_LENGTH)
				{
					if(this._curMsgLength > mana.net.BaseMsg.MSG_MIN_LENGTH)
					{
						var ba:flash.ByteArray = new flash.ByteArray();
						ba.endian = flash.Endian.LITTLE_ENDIAN;
						this._socket.readBytes(ba,0,this._curMsgLength - mana.net.BaseMsg.MSG_MIN_LENGTH);
						if(this._curBuffMsg)
							this._curBuffMsg.decode(ba);
					}
					if(this._curBuffMsg)
						this._curBuffMsg.doCallBacks();
					this._curBuffMsg = null;
					this._curMsgLength = flash.checkInt(0);
					this.asseptData();
				}
			}

			private onConnect(event:egret.Event)
			{
				logger.output("[SOCKET]",event.type);
			}

			private onErrorHandler(event:egret.Event)
			{
				logger.output("[SOCKET]",event.type);
				if(event.type == egret.IOErrorEvent.IO_ERROR)
					{}
				else if(event.type == flash.SecurityErrorEvent.SECURITY_ERROR)
					{}
			}

		}
	}
}

flash.extendsClass("mana.net.Messager","mana.core.Singleton")
