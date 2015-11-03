module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class UIUtil extends egret.HashObject {

					public static viewDic:flash.Dictionary;
					public static get holeSpr():egret.Sprite
					{
						return com.txjy.s01.utils.UIUtil._holeSpr;
					}

					public set holeSpr(value:egret.Sprite)
		{
			flash.superSetter(com.txjy.s01.utils.UIUtil, this, "holeSpr", value);
		}
	
 					public static registerView(view:egret.DisplayObject)
					{
						var classStr:string = egret.getQualifiedClassName(view);
						var classRef:any = <any>flash.getDefinitionByName(classStr);
						if(com.txjy.s01.utils.UIUtil.viewDic.getItem(classRef) == null)
							com.txjy.s01.utils.UIUtil.viewDic.setItem(classRef,view);
						else
							console.log(classRef + "已经存在！");
					}

					public static getView(classRef:any):any
					{
						return com.txjy.s01.utils.UIUtil.viewDic.getItem(classRef);
					}

					public static unregisterView(classRef:any)
					{
						com.txjy.s01.utils.UIUtil.viewDic.delItem(classRef);
					}

					public static createButton(skin:egret.Sprite,label:flash.TextField = null):S01Button
					{
						if(<any>!(flash.As3is(skin,null,"S01Button")))
							return new S01Button(<egret.SwfMovie>flash.As3As(skin,egret.SwfMovie),label);
						else
						{
							if(skin.parent)
								skin.parent.addChild(skin);
							return <S01Button>flash.As3As(skin,S01Button);
						}
					}

					public static createRadioButton(skin:egret.Sprite,label:flash.TextField = null):S01RadioButton
					{
						if(<any>!(flash.As3is(skin,null,"S01RadioButton")))
							return new S01RadioButton(<egret.SwfMovie>flash.As3As(skin,egret.SwfMovie),label);
						else
						{
							if(skin.parent)
								skin.parent.addChild(skin);
							return <S01RadioButton>flash.As3As(skin,S01RadioButton);
						}
					}

					public static createCheckBox(skin:egret.Sprite,label:flash.TextField = null):S01CheckBox
					{
						if(<any>!(flash.As3is(skin,null,"S01CheckBox")))
							return new S01CheckBox(<egret.SwfMovie>flash.As3As(skin,egret.SwfMovie),label);
						else
						{
							if(skin.parent)
								skin.parent.addChild(skin);
							return <S01CheckBox>flash.As3As(skin,S01CheckBox);
						}
					}

					public static createTabBar(...radioMcs):S01TabBar
					{
						return new S01TabBar(radioMcs);
					}

					public static createHGrid(itemRendererClass:any,row:number,col:number,cellWidth:number,cellHeight:number):S01HGrid
					{
						row = flash.checkUint(row);

						col = flash.checkUint(col);

						return new S01HGrid(itemRendererClass,row,col,cellWidth,cellHeight);
					}

					public static createVGrid(itemRendererClass:any,row:number,col:number,cellWidth:number,cellHeight:number):S01VGrid
					{
						row = flash.checkUint(row);

						col = flash.checkUint(col);

						return new S01VGrid(itemRendererClass,row,col,cellWidth,cellHeight);
					}

					public static createPaging(firBtnMc:egret.SwfMovie = null,finBtnMc:egret.SwfMovie = null,preBtnMc:egret.SwfMovie = null,nexBtnMc:egret.SwfMovie = null,numTF:flash.TextField = null):S01Paging
					{
						return new S01Paging(firBtnMc,finBtnMc,preBtnMc,nexBtnMc,numTF);
					}

					public static createComboBox(maxRow:number = 7,itemRendererClass:any = null):S01ComboBox
					{
						return new S01ComboBox(maxRow,itemRendererClass);
					}

					public static changeRegisterPoint(target:egret.DisplayObject,xModel:string = "center",yModel:string = "center"):egret.DisplayObject
					{
						var sp:egret.Sprite = new egret.Sprite();
						sp.x = target.x;
						sp.y = target.y;
						if(xModel == "center")
							target.x = -target.width / 2;
						if(yModel == "center")
							target.y = -target.height / 2;
						if(xModel == "center")
							sp.x += target.width / 2;
						if(yModel == "center")
							sp.y += target.height / 2;
						sp.addChild(target);
						return sp;
					}

					public static createTextField(con:egret.DisplayObjectContainer = null,x:number = 0,y:number = 0,size:number = 12,color:number = 0,filter:Array<any> = null,font:string = "宋体",autoSize:string = null,text:string = "",bold:boolean = false):flash.TextField
					{
						var textField:flash.TextField = new flash.TextField();
						textField.type = egret.TextFieldType.DYNAMIC;
						textField["selectable"] = false;
						if(autoSize != null)
							textField.textAlign = autoSize;
						else
							textField.textAlign = flash.TextFieldAutoSize.LEFT;
						textField.defaultTextFormat = new flash.TextFormat(font,size,color,bold);
						if(filter != null)
							textField.filters = filter;
						textField.x = x;
						textField.y = y;
						if(con != null)
							con.addChild(textField);
						textField.text = text;
						return textField;
					}

					public static createLinkText(textField:flash.TextField,clickHandler:Function = null):com.txjy.s01.ui.LinkText
					{
						return new LinkText(textField,clickHandler);
					}

					public static createFlickText(textField:flash.TextField,isNum:boolean = true,toColor:number = 0xffffffff,fromColor:number = 0xffffffff):com.txjy.s01.ui.FlickText
					{
						var ft:com.txjy.s01.ui.FlickText = <any>new FlickText(textField,isNum);
						ft["setFromToColor"](toColor,3,200,fromColor);
						return ft;
					}

					public static createEffectMc(mc:egret.SwfMovie):any
					{
						mc.gotoAndStop(mc.totalFrames);
						mc.touchChildren = mc.touchEnabled = false;
						return mc;
					}

					public static createAlphaSprite(w:number,h:number,color:number = 0,alpha:number = 0):egret.Sprite
					{
						var spr:egret.Sprite = new egret.Sprite();
						spr.graphics.beginFill(color,alpha);
						spr.graphics.drawRect(0,0,w,h);
						spr.graphics.endFill();
						return spr;
					}

					public static flyTo(objects:Array<any>,points:Array<any>,time:number,spaceTime:number = 0,callBack:Function = null,endCallBack:Function = null,layerIndex:number = -1)
					{
						if(layerIndex == -1)
							layerIndex = flash.checkInt(LayerDef.TIP);
						var layer:egret.Sprite = <any>LayerUtil.getLayer(layerIndex);
						var dis:egret.DisplayObject;
						var toX:number = 0;
						var toY:number = 0;
						var params:Array<any>;
						for(var i:number = flash.checkInt(0);i < objects.length; ++i)
						{
							dis = objects[i];
							dis.x = (LayerUtil.getWidth() - dis.width) / 2;
							dis.y = (LayerUtil.getHeight() - dis.height) / 2;
							dis.alpha = 0.1;
						}
						for(i = flash.checkInt(0); i < objects.length; ++i)
						{
							dis = objects[i];
							var startPoint:egret.Point = new egret.Point(dis.x,dis.y);
							startPoint = flash.globalToLocal(layer,startPoint);
							dis.x = startPoint.x;
							dis.y = startPoint.y;
							toX = points[i].x;
							toY = points[i].y;
							layer.addChild(dis);
							if(i != objects.length - 1)
								params = [dis,callBack,null];
							else
								params = [dis,callBack,endCallBack];
							var timeline:com.greensock.TimelineLite = <any>new TimelineLite();
							timeline["delay"] = spaceTime * i / 1000;
							if(toY > dis.y)
								timeline["append"](new TweenLite(dis,0.5,{x:dis.x - 200,y:dis.y + 50,alpha:1}));
							else
								timeline["append"](new TweenLite(dis,0.5,{x:dis.x + 200,y:dis.y - 50,alpha:1}));
							timeline["append"](new TweenLite(dis,time / 1000,{x:toX,y:toY,onComplete:com.txjy.s01.utils.UIUtil.onFlyComplete,onCompleteParams:params,ease:Linear.easeNone}));
						}
					}

					public static flyToLine(objects:Array<any>,points:Array<any>,time:number,spaceTime:number = 0,callBack:Function = null,endCallBack:Function = null,layerIndex:number = -1)
					{
						if(layerIndex == -1)
							layerIndex = flash.checkInt(LayerDef.TIP);
						var layer:egret.Sprite = <any>LayerUtil.getLayer(layerIndex);
						var dis:egret.DisplayObject;
						var toX:number = 0;
						var toY:number = 0;
						var params:Array<any>;
						for(var i:number = flash.checkInt(0);i < objects.length; ++i)
						{
							dis = objects[i];
							var startPoint:egret.Point = new egret.Point();
							startPoint = flash.localToGlobal(dis,startPoint);
							startPoint = flash.globalToLocal(layer,startPoint);
							dis.x = startPoint.x;
							dis.y = startPoint.y;
							var point:egret.Point = flash.globalToLocal(layer,points[i]);
							toX = point.x;
							toY = point.y;
							layer.addChild(dis);
							if(i != objects.length - 1)
								params = [dis,callBack,null];
							else
								params = [dis,callBack,endCallBack];
							TweenLite.to(dis,time / 1000,{delay:spaceTime * i / 1000,x:toX,y:toY,onComplete:com.txjy.s01.utils.UIUtil.onFlyComplete,onCompleteParams:params,ease:Linear.easeNone});
						}
					}

					private static onFlyComplete(disObj:egret.DisplayObject,callBack:Function,endCallBack:Function)
					{
						if(disObj.parent)
							disObj.parent.removeChild(disObj);
						if(flash.As3is(callBack,Function))
							callBack();
						if(flash.As3is(endCallBack,Function))
							endCallBack();
					}

					public static _bubTexts:Array<any>;
					public static pushBubText(str:string,layerIndex:number = -1,x:number = NaN,y:number = NaN)
					{
						if(layerIndex == -1)
							layerIndex = flash.checkInt(LayerDef.TIP);
						var layer:egret.Sprite = <any>LayerUtil.getLayer(layerIndex);
						if(isNaN(x))
							x = LayerUtil.getWidth() / 2;
						if(isNaN(y))
							y = 240;
						var bubTextSkin:view.commond.BubTextSkin = <any>new BubTextSkin();
						bubTextSkin["mcBc"].tfBc.htmlText = str;
						bubTextSkin["x"] = x;
						layer.addChild(bubTextSkin);
						com.txjy.s01.utils.UIUtil._bubTexts.unshift(bubTextSkin);
						TimerUtil.addFrameExecute(com.txjy.s01.utils.UIUtil.onBubEnterFrame);
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bubTexts.length; ++i)
						{
							bubTextSkin = com.txjy.s01.utils.UIUtil._bubTexts[i];
							if(bubTextSkin["y"] == 0)
								bubTextSkin["y"] = y + 50;
							TweenLite.to(bubTextSkin,0.3,{y:y - i * 30 + 50});
						}
						if(com.txjy.s01.utils.UIUtil._bubTexts.length > 3)
						{
							bubTextSkin = com.txjy.s01.utils.UIUtil._bubTexts.pop();
							bubTextSkin["parent"].removeChild(bubTextSkin);
						}
					}

					private static onBubEnterFrame()
					{
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bubTexts.length; ++i)
						{
							var bubTextSkin:view.commond.BubTextSkin = <any>com.txjy.s01.utils.UIUtil._bubTexts[i];
							if(bubTextSkin["totalFrames"] == bubTextSkin["currentFrame"])
							{
								bubTextSkin["parent"].removeChild(bubTextSkin);
								com.txjy.s01.utils.UIUtil._bubTexts.splice(i,1);
								--i;
							}
						}
						if(com.txjy.s01.utils.UIUtil._bubTexts.length == 0)
							TimerUtil.removeFrameExecute(com.txjy.s01.utils.UIUtil.onBubEnterFrame);
					}

					public static _bub2Texts:Array<any>;
					public static _bub3Texts:Array<any>;
					public static BC_TYPE_ATTR:string;
					public static BC_TYPE_AWARD:string;
					public static BC_TYPE_OTHER:string;
					public static get bub2Texts():Array<any>
					{
						return com.txjy.s01.utils.UIUtil._bub2Texts;
					}

					public set bub2Texts(value:Array<any>)
		{
			flash.superSetter(com.txjy.s01.utils.UIUtil, this, "bub2Texts", value);
		}
	
 					public static get bub3Texts():Array<any>
					{
						return com.txjy.s01.utils.UIUtil._bub3Texts;
					}

					public set bub3Texts(value:Array<any>)
		{
			flash.superSetter(com.txjy.s01.utils.UIUtil, this, "bub3Texts", value);
		}
	
 					public static getBC2NumByType(bcType:string):number
					{
						var reNum:number = flash.checkInt(0);
						for(var i:number = flash.checkInt(0);i != com.txjy.s01.utils.UIUtil._bub2Texts.length; ++i)
						{
							var bcUnit:com.txjy.s01.model.common.BCUnit = <any>com.txjy.s01.utils.UIUtil._bub2Texts[i].data;
							if(bcUnit["type"] == bcType)
								++reNum;
						}
						return reNum;
					}

					public static getBC3NumByType(bcType:string):number
					{
						var reNum:number = flash.checkInt(0);
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bub3Texts.length; i++)
						{
							var bcUnit:com.txjy.s01.model.common.BCUnit = <any>com.txjy.s01.utils.UIUtil._bub3Texts[i].data;
							if(bcUnit["type"] == bcType)
								++reNum;
						}
						return reNum;
					}

					public static pushBub2TextUnit(bcType:string,str:string,layerIndex:number = -1,x:number = NaN,y:number = NaN)
					{
						if(layerIndex == -1)
							layerIndex = flash.checkInt(LayerDef.TIP);
						var layer:egret.Sprite = <any>LayerUtil.getLayer(layerIndex);
						if(isNaN(x))
							x = LayerUtil.getWidth() / 2 + 60;
						if(isNaN(y))
							y = 350;
						var bc2View:com.txjy.s01.view.common.BC2View = <any>new BC2View();
						bc2View["data"] = new BCUnit(bcType,str);
						bc2View["x"] = x;
						layer.addChild(bc2View);
						com.txjy.s01.utils.UIUtil._bub2Texts.push(bc2View);
						TimerUtil.addFrameExecute(com.txjy.s01.utils.UIUtil.onBub2EnterFrame);
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bub2Texts.length; ++i)
						{
							bc2View = com.txjy.s01.utils.UIUtil._bub2Texts[i];
							bc2View["y"] = y - (com.txjy.s01.utils.UIUtil._bub2Texts.length - i - 1) * 30;
						}
						if(com.txjy.s01.utils.UIUtil._bub2Texts.length > 10)
						{
							bc2View = com.txjy.s01.utils.UIUtil._bub2Texts.shift();
							bc2View["parent"].removeChild(bc2View);
						}
					}

					public static pushBub2Text(bcType:string,strs:Array<any>,layerIndex:number = -1,x:number = NaN,y:number = NaN)
					{
						for(var i:number = flash.checkInt(0);i < strs.length; ++i)
						{
							var str:string = <any>strs[i];
							com.txjy.s01.utils.UIUtil.pushBub2TextUnit(bcType,str,-1,x,y);
						}
					}

					private static onBub2EnterFrame()
					{
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bub2Texts.length; ++i)
						{
							var bub2TextSkin:com.txjy.s01.view.common.BC2View = <any>com.txjy.s01.utils.UIUtil._bub2Texts[i];
							if(bub2TextSkin["display"].totalFrames == bub2TextSkin["display"].currentFrame)
							{
								bub2TextSkin["parent"].removeChild(bub2TextSkin);
								com.txjy.s01.utils.UIUtil._bub2Texts.splice(i,1);
								--i;
								SysEffect.getInstance().dispatchEvent(new CusEvent(EffectEventType.BC2_CHANGE));
							}
						}
						if(com.txjy.s01.utils.UIUtil._bub2Texts.length == 0)
						{
							SysEffect.getInstance().dispatchEvent(new CusEvent(EffectEventType.BC2_OVER));
							TimerUtil.removeFrameExecute(com.txjy.s01.utils.UIUtil.onBub2EnterFrame);
						}
					}

					public static pushBub3TextUnit(bcType:string,str:string,layerIndex:number = -1,x:number = NaN,y:number = NaN)
					{
						if(layerIndex == -1)
							layerIndex = flash.checkInt(LayerDef.TIP);
						var layer:egret.Sprite = <any>LayerUtil.getLayer(layerIndex);
						if(isNaN(x))
							x = LayerUtil.getWidth() / 2 + 60;
						if(isNaN(y))
							y = 350;
						var bc3View:com.txjy.s01.view.common.BC3View = <any>new BC3View();
						bc3View["data"] = new BCUnit(bcType,str);
						bc3View["x"] = x;
						layer.addChild(bc3View);
						com.txjy.s01.utils.UIUtil._bub3Texts.push(bc3View);
						TimerUtil.addFrameExecute(com.txjy.s01.utils.UIUtil.onBub3EnterFrame);
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bub3Texts.length; ++i)
						{
							bc3View = com.txjy.s01.utils.UIUtil._bub3Texts[i];
							bc3View["y"] = y - (com.txjy.s01.utils.UIUtil._bub3Texts.length - i - 1) * 30;
						}
						if(com.txjy.s01.utils.UIUtil._bub3Texts.length > 10)
						{
							bc3View = com.txjy.s01.utils.UIUtil._bub3Texts.shift();
							bc3View["parent"].removeChild(bc3View);
						}
					}

					public static pushBub3Text(bcType:string,strs:Array<any>,layerIndex:number = -1,x:number = NaN,y:number = NaN)
					{
						for(var i:number = flash.checkInt(0);i < strs.length; ++i)
						{
							var str:string = <any>strs[i];
							com.txjy.s01.utils.UIUtil.pushBub3TextUnit(bcType,str,-1,x,y);
						}
					}

					private static onBub3EnterFrame()
					{
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._bub3Texts.length; ++i)
						{
							var bub3TextSkin:com.txjy.s01.view.common.BC3View = <any>com.txjy.s01.utils.UIUtil._bub3Texts[i];
							if(bub3TextSkin["display"].totalFrames == bub3TextSkin["display"].currentFrame)
							{
								bub3TextSkin["parent"].removeChild(bub3TextSkin);
								com.txjy.s01.utils.UIUtil._bub3Texts.splice(i,1);
								--i;
								SysEffect.getInstance().dispatchEvent(new CusEvent(EffectEventType.BC3_CHANGE));
							}
						}
						if(com.txjy.s01.utils.UIUtil._bub3Texts.length == 0)
						{
							SysEffect.getInstance().dispatchEvent(new CusEvent(EffectEventType.BC3_OVER));
							TimerUtil.removeFrameExecute(com.txjy.s01.utils.UIUtil.onBub3EnterFrame);
						}
					}

					public static _lampTexts:Array<any>;
					public static pushLampText(str:string,layerIndex:number = -1)
					{
						if(layerIndex == -1)
							layerIndex = flash.checkInt(LayerDef.ALERT);
						var layer:egret.Sprite = <any>LayerUtil.getLayer(layerIndex);
						var lampUnit:com.txjy.s01.view.common.LampUnit = <any>new LampUnit(str);
						lampUnit["addEventListener"](egret.Event.COMPLETE,com.txjy.s01.utils.UIUtil.onLampComplete);
						layer.addChild(lampUnit);
						com.txjy.s01.utils.UIUtil._lampTexts.unshift(lampUnit);
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.UIUtil._lampTexts.length; ++i)
						{
							lampUnit = com.txjy.s01.utils.UIUtil._lampTexts[i];
							if(lampUnit["y"] != 0)
								TweenLite.to(lampUnit,0.3,{y:130 - i * 50});
							else
								lampUnit["y"] = 130 - i * 50;
						}
						if(com.txjy.s01.utils.UIUtil._lampTexts.length > 3)
						{
							lampUnit = com.txjy.s01.utils.UIUtil._lampTexts.pop();
							lampUnit["parent"].removeChild(lampUnit);
						}
					}

					private static onLampComplete(event:egret.Event)
					{
						var lampUnit:com.txjy.s01.view.common.LampUnit = <any><LampUnit>flash.As3As(event.currentTarget,LampUnit);
						var index:number = flash.checkInt(com.txjy.s01.utils.UIUtil._lampTexts.indexOf(lampUnit));
						if(lampUnit["parent"])
							lampUnit["parent"].removeChild(lampUnit);
						if(index != -1)
							com.txjy.s01.utils.UIUtil._lampTexts.splice(index,1);
					}

					public static hasHoleSp():boolean
					{
						if(com.txjy.s01.utils.UIUtil._holeSpr != null && com.txjy.s01.utils.UIUtil._holeSpr.parent && com.txjy.s01.utils.UIUtil._holeTargetObj != null)
							return true;
						return false;
					}

					public static _holeSpr:egret.Sprite;
					public static _holeTargetObj:egret.DisplayObject;
					public static _holeAlpha:number;
					public static _holeTowards:number;
					public static _holeArrX:number;
					public static _holeArrY:number;
					public static createHole(dis:egret.DisplayObject,alpha:number = 0.5,towards:number = 0,arrX:number = NaN,arrY:number = NaN,needHole:boolean = true)
					{
						if(<any>!dis)
							return ;
						if(com.txjy.s01.utils.UIUtil.hasHoleSp())
							com.txjy.s01.utils.UIUtil.destroyHole();
						com.txjy.s01.utils.UIUtil._holeTargetObj = dis;
						com.txjy.s01.utils.UIUtil._holeAlpha = alpha;
						com.txjy.s01.utils.UIUtil._holeTowards = flash.checkInt(towards);
						com.txjy.s01.utils.UIUtil._holeArrX = arrX;
						com.txjy.s01.utils.UIUtil._holeArrY = arrY;
						var disParent:egret.Sprite = <any>LayerUtil.getLayer(LayerDef.WEAK_GUIDE);
						var temRect:egret.Rectangle = flash.getBounds(dis,disParent);
						if(needHole)
							com.txjy.s01.utils.UIUtil.drawMaskSpr(temRect,alpha);
						else
						{
							if(<any>!com.txjy.s01.utils.UIUtil._holeSpr)
								com.txjy.s01.utils.UIUtil._holeSpr = new egret.Sprite();
						}
						disParent.touchChildren = disParent.touchEnabled = true;
						disParent.addChild(com.txjy.s01.utils.UIUtil._holeSpr);
						var mcGuide:egret.SwfMovie;
						if(towards == 1)
							mcGuide = new GuideLAniMC();
						else if(towards == 2)
							mcGuide = new GuideRAniMC();
						else if(towards == 3)
						{
							mcGuide = new GuideCircleAniMC();
							disParent.touchChildren = disParent.touchEnabled = false;
						}
						if(mcGuide)
						{
							mcGuide.x = temRect.x + arrX;
							mcGuide.y = temRect.y + arrY;
							com.txjy.s01.utils.UIUtil._holeSpr.addChild(mcGuide);
						}
					}

					public static destroyHole()
					{
						if(com.txjy.s01.utils.UIUtil._holeSpr && com.txjy.s01.utils.UIUtil._holeSpr.parent)
						{
							com.txjy.s01.utils.UIUtil._holeSpr.parent.removeChild(com.txjy.s01.utils.UIUtil._holeSpr);
							com.txjy.s01.utils.UIUtil._holeSpr.graphics.clear();
						}
						com.txjy.s01.utils.UIUtil._holeSpr = null;
						com.txjy.s01.utils.UIUtil._holeTargetObj = null;
					}

					public static refreHole(needHole:boolean = true)
					{
						if(com.txjy.s01.utils.UIUtil.hasHoleSp())
						{
							flash.setTimeout(function ()
							{
								com.txjy.s01.utils.UIUtil.createHole(com.txjy.s01.utils.UIUtil._holeTargetObj,com.txjy.s01.utils.UIUtil._holeAlpha,com.txjy.s01.utils.UIUtil._holeTowards,com.txjy.s01.utils.UIUtil._holeArrX,com.txjy.s01.utils.UIUtil._holeArrY,needHole);
							},30);
						}
					}

					protected static drawMaskSpr(rect:egret.Rectangle,alpha:number)
					{
						if(<any>!rect)
							return ;
						var maxW:number = flash.checkInt(SystemConfig.MAX_WIDTH);
						var maxH:number = flash.checkInt(SystemConfig.MAX_HEIGHT);
						if(<any>!com.txjy.s01.utils.UIUtil._holeSpr)
							com.txjy.s01.utils.UIUtil._holeSpr = new egret.Sprite();
						com.txjy.s01.utils.UIUtil._holeSpr.graphics.clear();
						com.txjy.s01.utils.UIUtil._holeSpr.graphics.beginFill(0x000000,alpha);
						if(rect.x > 0)
							com.txjy.s01.utils.UIUtil._holeSpr.graphics.drawRect(0,0,rect.x,maxH);
						if(rect.right < maxW)
							com.txjy.s01.utils.UIUtil._holeSpr.graphics.drawRect(rect.right,0,maxW - rect.right,maxH);
						if(rect.y > 0)
							com.txjy.s01.utils.UIUtil._holeSpr.graphics.drawRect(rect.x,0,rect.width,rect.y);
						if(rect.bottom < maxH)
							com.txjy.s01.utils.UIUtil._holeSpr.graphics.drawRect(rect.x,rect.bottom,rect.width,maxH - rect.bottom);
						com.txjy.s01.utils.UIUtil._holeSpr.graphics.endFill();
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.UIUtil.viewDic = new flash.Dictionary();
com.txjy.s01.utils.UIUtil._bubTexts = [];
com.txjy.s01.utils.UIUtil._bub2Texts = [];
com.txjy.s01.utils.UIUtil._bub3Texts = [];
com.txjy.s01.utils.UIUtil.BC_TYPE_ATTR = "BC_TYPE_ATTR";
com.txjy.s01.utils.UIUtil.BC_TYPE_AWARD = "BC_TYPE_AWARD";
com.txjy.s01.utils.UIUtil.BC_TYPE_OTHER = "BC_TYPE_OTHER";
com.txjy.s01.utils.UIUtil._lampTexts = [];
com.txjy.s01.utils.UIUtil._holeAlpha = NaN;
com.txjy.s01.utils.UIUtil._holeTowards = 0;
com.txjy.s01.utils.UIUtil._holeArrX = NaN;
com.txjy.s01.utils.UIUtil._holeArrY = NaN;
