module mana {
	export module collection {
		export class CollectionEvent extends egret.Event {

			public static COLLECTION_CHANGE:string;

			public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false)
			{
				super(type,bubbles,cancelable);
			}

		}
	}
}

mana.collection.CollectionEvent.COLLECTION_CHANGE = "collectionChange";
flash.extendsClass("mana.collection.CollectionEvent","egret.Event")
