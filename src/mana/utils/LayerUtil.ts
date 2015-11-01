module mana {
	export module utils {
		export class LayerUtil extends egret.HashObject {

			public static container:egret.DisplayObjectContainer;
			public static width:number = NaN;
			public static height:number = NaN;
			public static maxWidth:number = NaN;
			public static maxHeight:number = NaN;
			public static minWidth:number = NaN;
			public static minHeight:number = NaN;
			public static layers:Array<any> = [];
			public static defaultLayerIndex:number = 0;
			public static stage:egret.Stage;
			public static setContainer(parent:egret.DisplayObjectContainer,minWidthPm:number,minHeightPm:number,maxWidthPm:number,maxHeightPm:number)
			{
				mana.utils.LayerUtil.container = parent;
				mana.utils.LayerUtil.minWidth = minWidthPm;
				mana.utils.LayerUtil.minHeight = minHeightPm;
				mana.utils.LayerUtil.maxWidth = maxWidthPm;
				mana.utils.LayerUtil.maxHeight = maxHeightPm;
				mana.utils.LayerUtil.stage = mana.utils.LayerUtil.container.stage;
				mana.utils.LayerUtil.container.stage.addEventListener(egret.Event.RESIZE,mana.utils.LayerUtil.onStageReszie,null);
				mana.utils.LayerUtil.onStageReszie();
			}

			public static getContainer():egret.DisplayObjectContainer
			{
				return mana.utils.LayerUtil.container;
			}

			public static getStage():egret.Stage
			{
				return mana.utils.LayerUtil.stage;
			}

			public static getWidth():number
			{
				return mana.utils.LayerUtil.width;
			}

			public static getHeight():number
			{
				return mana.utils.LayerUtil.height;
			}

			public static setDefaultLayerIndex(index:number)
			{
				mana.utils.LayerUtil.defaultLayerIndex = index;
			}

			public static createLayer(index:number,mouseEnabled:boolean)
			{
				if(<any>!mana.utils.LayerUtil.getLayer(index))
				{
					var layer:egret.Sprite = new egret.Sprite();
					layer.touchChildren = layer.touchEnabled = mouseEnabled;
					mana.utils.LayerUtil.layers[index] = layer;
					mana.utils.LayerUtil.showLayer(index);
				}
			}

			public static destroyLayer(index:number):egret.Sprite
			{
				var layer:egret.Sprite = mana.utils.LayerUtil.getLayer(index);
				if(layer)
				{
					if(layer.parent)
						layer.parent.removeChild(layer);
					mana.utils.LayerUtil.layers[index] = null;
				}
				return layer;
			}

			public static hideLayer(index:number)
			{
				var layer:egret.Sprite = mana.utils.LayerUtil.getLayer(index);
				if(layer.parent)
					layer.parent.removeChild(layer);
			}

			public static showLayer(index:number)
			{
				var layer:egret.Sprite = mana.utils.LayerUtil.getLayer(index);
				if(layer)
				{
					if(layer.parent)
						return ;
					var min:number = -1;
					var currIndex:number = 0;
					var nextIndex:number = 0;
					for(var i:number = 0;i < mana.utils.LayerUtil.container.numChildren - 1; ++i)
					{
						currIndex = (mana.utils.LayerUtil.layers.indexOf(mana.utils.LayerUtil.container.getChildAt(i)));
						nextIndex = (mana.utils.LayerUtil.layers.indexOf(mana.utils.LayerUtil.container.getChildAt(i + 1)));
						if(currIndex < index && nextIndex > index)
						{
							mana.utils.LayerUtil.container.addChildAt(layer,i + 1);
							break;
						}
					}
					if(<any>!layer.parent)
						mana.utils.LayerUtil.container.addChild(layer);
				}
			}

			public static getLayer(index:number):egret.Sprite
			{
				return mana.utils.LayerUtil.layers[index];
			}

			public static swapLayer(index1:number,index2:number)
			{
				mana.utils.LayerUtil.container.swapChildren(mana.utils.LayerUtil.getLayer(index1),mana.utils.LayerUtil.getLayer(index2));
			}

			public static addChild(child:egret.DisplayObject,layerIndex:number = -1):egret.DisplayObject
			{
				if(layerIndex == -1)
					layerIndex = (mana.utils.LayerUtil.defaultLayerIndex);
				var layer:egret.Sprite = mana.utils.LayerUtil.getLayer(layerIndex);
				layer.addChild(child);
				return child;
			}

			public static addChildAt(child:egret.DisplayObject,childIndex:number,layerIndex:number = -1):egret.DisplayObject
			{
				if(layerIndex == -1)
					layerIndex = (mana.utils.LayerUtil.defaultLayerIndex);
				var layer:egret.Sprite = mana.utils.LayerUtil.getLayer(layerIndex);
				if(layer)
					layer.addChildAt(child,childIndex);
				return child;
			}

			public static removeChild(child:egret.DisplayObject):egret.DisplayObject
			{
				if(<any>!child)
					return child;
				if(child.parent && mana.utils.LayerUtil.layers.indexOf(child.parent))
				{
					child.parent.removeChild(child);
				}
				return child;
			}

			private static onStageReszie(event:egret.Event = null)
			{
				mana.utils.LayerUtil.width = mana.utils.LayerUtil.container.stage.stageWidth;
				if(mana.utils.LayerUtil.width > mana.utils.LayerUtil.maxWidth)
					mana.utils.LayerUtil.width = mana.utils.LayerUtil.maxWidth;
				else if(mana.utils.LayerUtil.width < mana.utils.LayerUtil.minWidth)
					mana.utils.LayerUtil.width = mana.utils.LayerUtil.minWidth;
				mana.utils.LayerUtil.height = mana.utils.LayerUtil.container.stage.stageHeight;
				if(mana.utils.LayerUtil.height > mana.utils.LayerUtil.maxHeight)
					mana.utils.LayerUtil.height = mana.utils.LayerUtil.maxHeight;
				else if(mana.utils.LayerUtil.height < mana.utils.LayerUtil.minHeight)
					mana.utils.LayerUtil.height = mana.utils.LayerUtil.minHeight;
				if(mana.utils.LayerUtil.container.stage.stageWidth > mana.utils.LayerUtil.width)
					mana.utils.LayerUtil.container.x = (mana.utils.LayerUtil.container.stage.stageWidth - mana.utils.LayerUtil.width) / 2;
				else
					mana.utils.LayerUtil.container.x = 0;
				if(mana.utils.LayerUtil.container.stage.stageHeight > mana.utils.LayerUtil.height)
					mana.utils.LayerUtil.container.y = (mana.utils.LayerUtil.container.stage.stageHeight - mana.utils.LayerUtil.height) / 2;
				else
					mana.utils.LayerUtil.container.y = 0;
				mana.utils.LayerUtil.container.scrollRect = new egret.Rectangle(0,0,mana.utils.LayerUtil.width,mana.utils.LayerUtil.height);
			}

		}
	}
}