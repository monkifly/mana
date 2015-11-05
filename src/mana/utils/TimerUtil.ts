module mana {
	export module utils {
		export class TimerUtil extends BaseUtil {

			public _secondTimer:egret.Timer;
            public _secondObjs: Array<SecondObj> = [];

			public addSecondExecute(fun:Function, thisObject?:any)
			{
                this.removeSecondExecute(fun);
                var t: SecondObj = new SecondObj(fun,thisObject);
				if(!this._secondTimer)
				{
					this._secondTimer = new egret.Timer(1000);
                    this._secondTimer.addEventListener(egret.TimerEvent.TIMER,this.onSecondTimer,this);
					this._secondTimer.start();
				}
                this._secondObjs.push(t);
			}

			public removeSecondExecute(fun:Function)
			{
                for(var i = 0;i < this._secondObjs.length; ++i){
    			    if(this._secondObjs[i].callback == fun){
                        this._secondObjs.splice(i--,1);
                        break;
    			    }
                }
                var hasSecondFun: boolean = this._secondObjs.length>0;
    			
                if(!hasSecondFun)
				{
					if(this._secondTimer)
					{
						this._secondTimer.removeEventListener(egret.TimerEvent.TIMER,this.onSecondTimer,this);
						this._secondTimer.stop();
						this._secondTimer = null;
					}
				}
			}

			private onSecondTimer(event:egret.TimerEvent)
			{
                for(var i = 0;i < this._secondObjs.length; ++i) {
                    var t: SecondObj = this._secondObjs[i];
                    t.callback.call(t.thisObject);
                }
			}

		}

		class SecondObj{
			public callback:Function;
            public thisObject: any;

			public constructor(callback:Function,thisObject?:any)
			{
				this.callback = callback;
                this.thisObject = thisObject;
			}
		}
	}
}