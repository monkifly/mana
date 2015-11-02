module mana {
	export module core {
		export class SysManager extends mana.Singleton {

//			protected _message:mana.net.Messager = Messager.getInstance();

			public constructor()
			{
				super();
			}

			public startSecondTicker():void{
                var timerUtil: mana.utils.TimerUtil = mana.utils.TimerUtil.getInstance();
                timerUtil.addSecondExecute(this.onSecond, this);
			}
			public stopSecondTicker():void{
                var timerUtil: mana.utils.TimerUtil = mana.utils.TimerUtil.getInstance();
                timerUtil.removeSecondExecute(this.onSecond);
			}
            protected onSecond():void{
                
            }
		}
	}
}
