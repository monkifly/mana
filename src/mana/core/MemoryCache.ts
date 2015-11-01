module mana {
	export module core {
		export class MemoryCache extends egret.HashObject {

            private _dic: any = {};
			private _curCheckTime:number = 0;
			private _maxCheckTime:number = 0;
			private _recheckTime:number = 0;
			private _recheckTimerID:number = -1;

			public constructor(checkTime:number = 30 * 60 * 1000)
			{
				super();
                this._dic = {};
				this._curCheckTime = 0;
				this._maxCheckTime = checkTime;
			}

			public cache(name:string,value:any):any
			{
				var curTime:number = egret.getTimer();
				if(curTime - this._curCheckTime > this._maxCheckTime)
				{
					this.clearLongTimeCache();
				}
				this._dic.setItem(name,new TimeCache(curTime,value));
				return value;
			}

			public getValue(name:string):any
			{
				var curTime:number = egret.getTimer();
				if(curTime - this._curCheckTime > this._maxCheckTime)
				{
					this.clearLongTimeCache();
				}
				var tc:TimeCache = <any>this._dic.getItem(name);
				if(tc)
				{
					tc.time = curTime;
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
				for(var key in this._dic){
                    delete this._dic[key];
				}
			}

			public clearLongTimeCache()
			{
				this._curCheckTime = egret.getTimer();
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
				var curTime:number = egret.getTimer();
				var tc:TimeCache = <any>this._dic.getItem(key);
				if(tc)
					tc.time = curTime - (this._maxCheckTime - time);
				if(this._recheckTimerID == -1)
				{
					this._recheckTime = curTime + time;
                    this._recheckTimerID = egret.setTimeout(this.onRecheck,this,time);
				}
				else
				{
					if(curTime + time > this._recheckTime)
					{
						egret.clearTimeout(this._recheckTimerID);
						this._recheckTimerID = egret.setTimeout(this.onRecheck,this,time);
					}
				}
			}

			private onRecheck()
			{
				this.clearLongTimeCache();
				this._recheckTimerID = -1;
			}

		}

		 class TimeCache extends egret.HashObject {

			public time:number = 0;
			public value:any;

			public constructor(time:number,valuePm:any)
			{
				super();

				this.time = time;
				this.value = valuePm;
			}

		}
	}
}

