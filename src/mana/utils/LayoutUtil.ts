//module mana {
//	export module utils {
//		export class LayoutUtil extends egret.HashObject {
//
//
//			public constructor()
//			{
//				super();
//			}
//
//			public static hBoxLayout(container:any,gap:number)
//			{
//				var child:egret.DisplayObject;
//				var beginX:number = <any>0;
//				if(flash.As3is(container,egret.DisplayObjectContainer))
//				{
//					var doc:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>flash.As3As(container,egret.DisplayObjectContainer);
//					for(var i:number = flash.checkInt(0);i < doc.numChildren; ++i)
//					{
//						child = doc.getChildAt(i);
//						child.x = beginX;
//						beginX += child.width + gap;
//					}
//				}
//				else if(flash.As3is(container,Array))
//				{
//					var ary:Array<any> = </*Array*/any>flash.As3As(container,Array);
//					for(var k:number = flash.checkInt(0);k < ary.length; ++k)
//					{
//						child = ary[k];
//						child.x = beginX;
//						beginX += child.width + gap;
//					}
//				}
//			}
//
//			public static vBoxLayout(container:any,gap:number)
//			{
//				var child:egret.DisplayObject;
//				var beginY:number = <any>0;
//				if(flash.As3is(container,egret.DisplayObjectContainer))
//				{
//					var doc:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>flash.As3As(container,egret.DisplayObjectContainer);
//					for(var i:number = flash.checkInt(0);i < doc.numChildren; ++i)
//					{
//						child = doc.getChildAt(i);
//						child.y = beginY;
//						beginY += child.height + gap;
//					}
//				}
//				else if(flash.As3is(container,Array))
//				{
//					var ary:Array<any> = </*Array*/any>flash.As3As(container,Array);
//					for(var k:number = flash.checkInt(0);k < ary.length; ++k)
//					{
//						child = ary[k];
//						child.y = beginY;
//						beginY += child.height + gap;
//					}
//				}
//			}
//
//			public static getTopLeftPoint(child:egret.DisplayObject):egret.Point
//			{
//				return new egret.Point(child.x,child.y);
//			}
//
//			public static getTopRightPoint(child:egret.DisplayObject):egret.Point
//			{
//				return new egret.Point(child.x + child.width,child.y);
//			}
//
//			public static getBottomLeftPoint(child:egret.DisplayObject):egret.Point
//			{
//				return new egret.Point(child.x,child.y + child.height);
//			}
//
//			public static getBottomRightPoint(child:egret.DisplayObject):egret.Point
//			{
//				return new egret.Point(child.x + child.width,child.y + child.height);
//			}
//
//			public static setCenter(child:egret.DisplayObject,offsetX:number = 0,offsetY:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				child.x = flash.tranint(rect.x + (rect.width - child.width) / 2) + offsetX;
//				child.y = flash.tranint(rect.y + (rect.height - child.height) / 2) + offsetY;
//			}
//
//			public static setCenterH(child:egret.DisplayObject,offset:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				child.x = flash.tranint(rect.x + (rect.width - child.width) / 2) + offset;
//			}
//
//			public static setCenterV(child:egret.DisplayObject,offset:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				child.y = flash.tranint(rect.y + (rect.height - child.height) / 2) + offset;
//			}
//
//			public static setRight(child:egret.DisplayObject,offset:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				child.x = flash.tranint(rect.x + rect.width - child.width - offset);
//			}
//
//			public static setBottom(child:egret.DisplayObject,offset:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				child.y = flash.tranint(rect.y + rect.height - child.height - offset);
//			}
//
//			public static setTopRight(child:egret.DisplayObject,offsetX:number = 0,offsetY:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				mana.utils.LayoutUtil.setRight(child,offsetX,rect);
//				child.y = rect.y + offsetY;
//			}
//
//			public static setBottomRight(child:egret.DisplayObject,offsetX:number = 0,offsetY:number = 0,rect:egret.Rectangle = null)
//			{
//				if(<any>!rect)
//					rect = new egret.Rectangle(0,0,mana.utils.LayerUtil.getWidth(),mana.utils.LayerUtil.getHeight());
//				mana.utils.LayoutUtil.setRight(child,offsetX,rect);
//				mana.utils.LayoutUtil.setBottom(child,offsetY,rect);
//			}
//
//		}
//	}
//}
//
