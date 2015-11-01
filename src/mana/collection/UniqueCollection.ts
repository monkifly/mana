module mana {
	export module collection {
		export class UniqueCollection extends mana.core.BaseModel {

			private _dataArray:Array<any>;
			private _signArray:Array<any>;

			public constructor()
			{
				super();
				this._dataArray = new Array();
				this._signArray = new Array();
			}

			public get data():Array<any>
			{
				return this._dataArray;
			}
	
 			public get length():number
			{
				return this._dataArray.length;
			}
	
 			private addItemInternal(item:mana.collection.IUniqueItem)
			{
				var sign:any = item.getUniqueSign();
				var index:number = this._signArray.indexOf(sign);
				if(index == -1)
				{
					this._signArray.push(sign);
					this._dataArray.push(item);
				}
				else
				{
					this._dataArray[index] = item;
				}
			}

			private removeItemAtInternal(index:number):any
			{
				if(index >= 0 && index < this.length)
				{
					this._signArray.splice(index,1);
					return this._dataArray.splice(index,1)[0];
				}
				return null;
			}

			private removeItemBySignInternal(sign:any):any
			{
				var index:number = this._signArray.indexOf(sign);
				if(index != -1)
				{
					return this.removeItemAtInternal(index);
				}
				return null;
			}

			public addItem(item:mana.collection.IUniqueItem)
			{
				this.addItemInternal(item);
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

			public removeItemAt(index:number):any
			{
				var item:any = this.removeItemAtInternal(index);
				if(item)
				{
					dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
				}
				return item;
			}

			public removeItemBySign(sign:any):any
			{
				var item:any = this.removeItemBySignInternal(sign);
				if(item)
				{
					dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
				}
				return item;
			}

			private setItemAtInternal(item:mana.collection.IUniqueItem,index:number)
			{
				var sign:any = item.getUniqueSign();
				if(index >= 0)
				{
					this._signArray[index] = sign;
					this._dataArray[index] = item;
				}
				else
				{
					throw new Error("index invalid").message;
				}
			}

			public setItemAt(item:mana.collection.IUniqueItem,index:number)
			{
				this.setItemAtInternal(item,index);
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

			public setItems(ary:Array<any>)
			{
				var i:number = 0;
				this._signArray.length = 0;
				this._dataArray.length = 0;
				for(i = 0; i < ary.length; i++)
				{
					this.setItemAtInternal(ary[i],i);
				}
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

			public removeAll()
			{
				this._signArray.length = 0;
				this._dataArray.length = 0;
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

			public getItemAt(index:number):any
			{
				return this._dataArray[index];
			}

			public getItemBySign(sign:any):any
			{
				var index:number = this._signArray.indexOf(sign);
				if(index != -1)
				{
					return this._dataArray[index];
				}
				return null;
			}

			public getItemIndexBySign(sign:any):number
			{
				return this._signArray.indexOf(sign);
			}

			public addItems(ary:Array<any>)
			{
				for(var i:number = 0;i < ary.length; i++)
				{
					this.addItemInternal(ary[i]);
				}
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

			public addUniqueCollection(uc:mana.collection.UniqueCollection)
			{
				var len:number = uc.length;
				var item:mana.collection.IUniqueItem;
				for(var i:number = 0;i < len; i++)
				{
					item = <mana.collection.IUniqueItem> uc.getItemAt(i);
					this.addItemInternal(item);
				}
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

			public removeUniqueCollection(uc:mana.collection.UniqueCollection)
			{
				var len:number = uc.length;
				var item:mana.collection.IUniqueItem;
				for(var i:number = 0;i < len; i++)
				{
					item = <mana.collection.IUniqueItem>uc.getItemAt(i);
					this.removeItemBySignInternal(item.getUniqueSign());
				}
				dispatchEvent(new mana.collection.CollectionEvent(mana.collection.CollectionEvent.COLLECTION_CHANGE));
			}

		}
	}
}