module mana {
	export module utils {
		export class LayerUtil extends BaseUtil {

			public container:egret.DisplayObjectContainer;
			public width:number = NaN;
			public height:number = NaN;
			public maxWidth:number = NaN;
			public maxHeight:number = NaN;
			public minWidth:number = NaN;
			public minHeight:number = NaN;
			public layers:Array<any> = [];
			public defaultLayerIndex:number = 0;
			public stage:egret.Stage;
			public setContainer(parent:egret.DisplayObjectContainer,minWidthPm:number,minHeightPm:number,maxWidthPm:number,maxHeightPm:number)
			{
				this.container = parent;
				this.minWidth = minWidthPm;
				this.minHeight = minHeightPm;
				this.maxWidth = maxWidthPm;
				this.maxHeight = maxHeightPm;
				this.stage = this.container.stage;
				this.container.stage.addEventListener(egret.Event.RESIZE,this.onStageReszie,null);
				this.onStageReszie();
			}

			public getContainer():egret.DisplayObjectContainer
			{
				return this.container;
			}

			public getStage():egret.Stage
			{
				return this.stage;
			}

			public getWidth():number
			{
				return this.width;
			}

			public getHeight():number
			{
				return this.height;
			}

			public setDefaultLayerIndex(index:number)
			{
				this.defaultLayerIndex = index;
			}

			public createLayer(index:number,mouseEnabled:boolean)
			{
				if(<any>!this.getLayer(index))
				{
					var layer:egret.Sprite = new egret.Sprite();
					layer.touchChildren = layer.touchEnabled = mouseEnabled;
					this.layers[index] = layer;
					this.showLayer(index);
				}
			}

			public destroyLayer(index:number):egret.Sprite
			{
				var layer:egret.Sprite = this.getLayer(index);
				if(layer)
				{
					if(layer.parent)
						layer.parent.removeChild(layer);
					this.layers[index] = null;
				}
				return layer;
			}

			public hideLayer(index:number)
			{
				var layer:egret.Sprite = this.getLayer(index);
				if(layer.parent)
					layer.parent.removeChild(layer);
			}

			public showLayer(index:number)
			{
				var layer:egret.Sprite = this.getLayer(index);
				if(layer)
				{
					if(layer.parent)
						return ;
					var min:number = -1;
					var currIndex:number = 0;
					var nextIndex:number = 0;
					for(var i:number = 0;i < this.container.numChildren - 1; ++i)
					{
						currIndex = (this.layers.indexOf(this.container.getChildAt(i)));
						nextIndex = (this.layers.indexOf(this.container.getChildAt(i + 1)));
						if(currIndex < index && nextIndex > index)
						{
							this.container.addChildAt(layer,i + 1);
							break;
						}
					}
					if(<any>!layer.parent)
						this.container.addChild(layer);
				}
			}

			public getLayer(index:number):egret.Sprite
			{
                if(index < 0)
                    index = this.defaultLayerIndex;
				return this.layers[index];
			}

			public swapLayer(index1:number,index2:number)
			{
				this.container.swapChildren(this.getLayer(index1),this.getLayer(index2));
			}

			public addChild(child:egret.DisplayObject,layerIndex:number = -1):egret.DisplayObject
			{
				if(layerIndex == -1)
					layerIndex = (this.defaultLayerIndex);
				var layer:egret.Sprite = this.getLayer(layerIndex);
				layer.addChild(child);
				return child;
			}

			public addChildAt(child:egret.DisplayObject,childIndex:number,layerIndex:number = -1):egret.DisplayObject
			{
				if(layerIndex == -1)
					layerIndex = (this.defaultLayerIndex);
				var layer:egret.Sprite = this.getLayer(layerIndex);
				if(layer)
					layer.addChildAt(child,childIndex);
				return child;
			}

			public removeChild(child:egret.DisplayObject):egret.DisplayObject
			{
				if(<any>!child)
					return child;
				if(child.parent && this.layers.indexOf(child.parent))
				{
					child.parent.removeChild(child);
				}
				return child;
			}

			private onStageReszie(event:egret.Event = null)
			{
				this.width = this.container.stage.stageWidth;
				if(this.width > this.maxWidth)
					this.width = this.maxWidth;
				else if(this.width < this.minWidth)
					this.width = this.minWidth;
				this.height = this.container.stage.stageHeight;
				if(this.height > this.maxHeight)
					this.height = this.maxHeight;
				else if(this.height < this.minHeight)
					this.height = this.minHeight;
				if(this.container.stage.stageWidth > this.width)
					this.container.x = (this.container.stage.stageWidth - this.width) / 2;
				else
					this.container.x = 0;
				if(this.container.stage.stageHeight > this.height)
					this.container.y = (this.container.stage.stageHeight - this.height) / 2;
				else
					this.container.y = 0;
				this.container.scrollRect = new egret.Rectangle(0,0,this.width,this.height);
			}

		}
	}
}