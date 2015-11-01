module mana {
	export module core {
		export class Singleton extends mana.core.BaseModel {

			public static _instanceDictionary:flash.Dictionary;

			public constructor()
			{
				super();
				var className:string = egret.getQualifiedClassName(this);
				var classReference:any = <any>flash.getDefinitionByName(className);
				if(mana.core.Singleton._instanceDictionary.getItem(classReference) != null)
					throw new flash.Error(className + " is single instance!!!").message;
				else
					mana.core.Singleton._instanceDictionary.setItem(classReference,this);
			}

			public destroyInstance()
			{
				var className:string = egret.getQualifiedClassName(this);
				var classReference:any = <any>flash.getDefinitionByName(className);
				mana.core.Singleton._instanceDictionary.delItem(classReference);
			}

			public static getInstance(classReference:any):mana.core.Singleton
			{
				if(mana.core.Singleton._instanceDictionary.getItem(classReference) != null)
					return mana.core.Singleton._instanceDictionary.getItem(classReference);
				var instance:any = new classReference();
				mana.core.Singleton._instanceDictionary.setItem(classReference,instance);
				return instance;
			}

		}
	}
}

mana.core.Singleton._instanceDictionary = new flash.Dictionary();
flash.extendsClass("mana.core.Singleton","mana.core.BaseModel")
