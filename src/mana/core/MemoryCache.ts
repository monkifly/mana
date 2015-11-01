module mana {
	export module core {
		export class MemoryCache extends egret.HashObject {

			private _dic:flash.Dictionary;
			private _curCheckTime:number = 0;
			private _maxCheckTime:number = 0;
			private _recheckTime:number = 0;
			private _recheckTimerID:number = -1;

			public constructor(checkTime:number = 30 * 60 * 1000)
			{
				super();
				this._dic = new flash.Dictionary();
				this._curCheckTime = flash.checkUint(0);
				this._maxCheckTime = flash.checkUint(checkTime);
			}

			public cache(name:string,value:any):any
			{
				var curTime:number = flash.checkInt(egret.getTimer());
				if(curTime - this._curCheckTime > this._maxCheckTime)
				{
					this.clearLongTimeCache();
				}
				this._dic.setItem(name,new TimeCache(curTime,value));
				return value;
			}

			public getValue(name:string):any
			{
				var curTime:number = flash.checkInt(egret.getTimer());
				if(curTime - this._curCheckTime > this._maxCheckTime)
				{
					this.clearLongTimeCache();
				}
				var tc:TimeCache = <any>this._dic.getItem(name);
				if(tc)
				{
					tc.time = flash.checkInt(curTime);
					return tc.value;
				}
				return null;
			}

			public removeValue(name:string):any
			{
				var tc:TimeCache = <any>this._dic.getItem(name);
				this._dic.delItem(name);
				if(tc)
					return tc.value;
				return null;
			}

			public clearAllCache()
			{
				this._dic = new flash.Dictionary();
			}

			public clearLongTimeCache()
			{
				this._curCheckTime = flash.checkUint(egret.getTimer());
				for(var forinvar__ in this._dic.map)
				{
					var key = this._dic.map[forinvar__][0];
					var tc:TimeCache = <any>this._dic.getItem(key);
					if(this._curCheckTime - tc.time >= this._maxCheckTime)
					{
						this._dic.delItem(key);
					}
				}
			}

			public setRemoveAfter(key:string,time:number)
			{
				time = flash.checkInt(time);

				var curTime:number = flash.checkInt(egret.getTimer());
				var tc:TimeCache = <any>this._dic.getItem(key);
				if(tc)
					tc.time = flash.checkInt(curTime - (this._maxCheckTime - time));
				if(this._recheckTimerID == -1)
				{
					this._recheckTime = flash.checkInt(curTime + time);
					this._recheckTimerID = flash.checkInt(flash.setTimeout(flash.bind(this.onRecheck,this),time));
				}
				else
				{
					if(curTime + time > this._recheckTime)
					{
						flash.clearTimeout(this._recheckTimerID);
						this._recheckTimerID = flash.checkInt(flash.setTimeout(flash.bind(this.onRecheck,this),time));
					}
				}
			}

			private onRecheck()
			{
				this.clearLongTimeCache();
				this._recheckTimerID = flash.checkInt(-1);
			}

		}

		 class TimeCache extends egret.HashObject {

			public time:number = 0;
			public value:any;

			public constructor(timePm:number,valuePm:any)
			{
				super();
				timePm = flash.checkInt(timePm);

				this.time = flash.checkInt(timePm);
				this.value = valuePm;
			}

		}
	}
}

