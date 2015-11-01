module mana {
	export module collection {
		export class CollectionEvent extends egret.Event {

            public static COLLECTION_CHANGE: string = "collectionChange";

			public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false)
			{
				super(type,bubbles,cancelable);
			}

		}
	}
}