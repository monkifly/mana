module mana {
	export module core {
		export class ModelManager extends egret.HashObject {

            public static _singleIntances: any = {};
			public static getModel(classRef:any):any
			{
				if(mana.core.ModelManager._singleIntances.getItem(classRef) == null)
				{
					mana.core.ModelManager._singleIntances.setItem(classRef,new classRef());
				}
				return mana.core.ModelManager._singleIntances.getItem(classRef);
			}

			public static destroyModel(classRef:any)
			{
				mana.core.ModelManager._singleIntances.delItem(classRef);
			}


			public constructor()
			{
				super();
			}

		}
	}
}