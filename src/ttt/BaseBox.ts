module mana {
	export module flc {
		export class BaseBox extends SkinView {

            public static DRAG_ALPHA_DEFAULT: number = 0.6;
			protected _triggerType:number = 0;
			protected _allowSwap:boolean = false;
			protected _modalMC:egret.Sprite;
			protected _isModal:boolean = false;
			protected _modalAlpha:number = NaN;
			protected _closeButton:BaseButton;
			private _offsetX:number = NaN;
			private _offsetY:number = NaN;

			public constructor(isModalPm:boolean = false,modalAlphaPm:number = 0.5)
			{
				super();
				this._isModal = isModalPm;
				this._modalAlpha = modalAlphaPm;
				this.allowSwap = true;
				this._dragAlpha = mana.flc.BaseBox.DRAG_ALPHA_DEFAULT;
				addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.onAddedToStage,this));
				addEventListener(egret.Event.REMOVED_FROM_STAGE,flash.bind(this.onRemovedFromStage,this));
			}

			public get modalAlpha():number
			{
				return this._modalAlpha;
			}

			public set modalAlpha(value:number)
			{
				this._modalAlpha = value;
				if(this._isModal && stage)
					this.createModalMC();
			}

			public get triggerType():number
			{
				return this._triggerType;
			}

			public set triggerType(value:number)
			{
				value = flash.checkInt(value);

				this._triggerType = flash.checkInt(value);
			}

			public get allowSwap():boolean
			{
				return this._allowSwap;
			}

			public set allowSwap(value:boolean)
			{
				this._allowSwap = value;
				if(this._allowSwap)
					addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this));
				else
					removeEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onMouseDown,this));
			}

			public get isModal():boolean
			{
				return this._isModal;
			}

			public set isModal(value:boolean)
			{
				this._isModal = value;
				if(this._isModal && stage)
					this.createModalMC();
			}

			public get isShowed():boolean
			{
				return stage != null;
			}

			public set isShowed(value:boolean)
		{
			flash.superSetter(mana.flc.BaseBox, this, "isShowed", value);
		}
	
 			public setDragableObj(dragObjPm:egret.DisplayObject)
			{
				if(this._dragObj != null)
					this._dragObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onDragObjMouseDown,this),null);
				this._dragObj = dragObjPm;
				if(this._dragObj)
					this._dragObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.onDragObjMouseDown,this),null);
			}

			public getDragableObj():egret.DisplayObject
			{
				return this._dragObj;
			}

			public toTop()
			{
				if(this.allowSwap)
				{
					if(parent == null)
						return ;
					var maxIndex:number = flash.checkInt(parent.numChildren - 1);
					if(parent.getChildIndex(this) != maxIndex)
					{
						parent.setChildIndex(this,maxIndex);
					}
				}
			}

			public toBottom()
			{
				if(this.allowSwap)
				{
					if(parent == null)
						return ;
					if(parent.getChildIndex(this) != 0)
					{
						parent.setChildIndex(this,0);
					}
				}
			}

			public isTop():boolean
			{
				return parent && parent.numChildren - 1 == parent.getChildIndex(this);
			}

			public isBottom():boolean
			{
				return parent && 0 == parent.getChildIndex(this);
			}

			public open(boxParent:egret.DisplayObjectContainer)
			{
				if(boxParent)
				{
					boxParent.addChild(this);
					dispatchEvent(new FlcEvent(FlcEvent.BOX_OPENED));
				}
			}

			public close():boolean
			{
				if(parent)
				{
					parent.removeChild(this);
					dispatchEvent(new FlcEvent(FlcEvent.BOX_CLOSED));
					return true;
				}
				return false;
			}

			protected createModalMC()
			{
				if(<any>!this._modalMC)
					this._modalMC = new egret.Sprite();
				this._modalMC.graphics.clear();
				this._modalMC.graphics.beginFill(0x000000,this._modalAlpha);
				this._modalMC.graphics.drawRect(0,0,1,1);
				this._modalMC.graphics.endFill();
				this._modalMC.width = LayerUtil.getWidth();
				this._modalMC.height = LayerUtil.getHeight();
				parent.addChildAt(this._modalMC,parent.getChildIndex(this));
			}

			protected onAddedToStage(event:egret.Event)
			{
				if(this.isModal)
				{
					this.createModalMC();
				}
			}

			protected onRemovedFromStage(event:egret.Event)
			{
				if(this._modalMC && this._modalMC.parent != null)
				{
					this._modalMC.parent.removeChild(this._modalMC);
				}
			}

			protected onMouseDown(event:flash.MouseEvent)
			{
				this.toTop();
			}

			public setCloseButton(button:BaseButton = null)
			{
				if(this._closeButton)
				{
					this._closeButton["removeEventListener"](egret.TouchEvent.TOUCH_TAP,flash.bind(this.onCloseClick,this));
				}
				this._closeButton = button;
				if(this._closeButton)
				{
					this._closeButton["addEventListener"](egret.TouchEvent.TOUCH_TAP,flash.bind(this.onCloseClick,this));
				}
			}

			protected onCloseTap(e:egret.TouchEvent)
			{
				this.close();
			}

		}
	}
}