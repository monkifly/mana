module com {
	export module txjy {
		export module s01 {
			export module ui {
				export module component {
					export class S01BaseBox extends mana.flc.BaseBox implements com.txjy.s01.ui.IKeyDown {

						public static CLOSEEFFECT1:number;
						protected _btnClose:S01Button;
						protected _closeMaskSp:egret.Sprite;
						protected _fadeToObj:egret.DisplayObject;
						protected _closeEffectState:number = 0;
						protected _needOpenEffect:boolean = false;

						public constructor(isModalPm:boolean = false,modalAlphaPm:number = 0.5,registerKey:boolean = true)
						{
							super(isModalPm,modalAlphaPm);
							if(registerKey)
							{
								KeyUtil.registerKeyDown(this);
							}
							this._needOpenEffect = true;
						}

						public setSkin(skinPm:egret.DisplayObjectContainer)
						{
							super["setSkin"](skinPm);
							if(skinPm.hasOwnProperty("dragBg"))
								setDragableObj(skinPm["dragBg"]);
							else
							{
								var spr:egret.Sprite = new egret.Sprite();
								spr.graphics.beginFill(0xff0000,0);
								spr.graphics.drawRect(0,0,width,42);
								addChild(spr);
								setDragableObj(spr);
							}
						}

						public close():boolean
						{
							if(isShowed)
							{
								var bmd:flash.BitmapData = new flash.BitmapData(width,height,true,0);
								var bmp:flash.Bitmap = new flash.Bitmap(bmd);
								var localPoint:egret.Point = new egret.Point();
								if(this._fadeToObj)
								{
									var sx:number = this._fadeToObj.width / width;
									var sy:number = this._fadeToObj.height / height;
									localPoint = flash.localToGlobal(this._fadeToObj,localPoint);
									localPoint = parent.globalToLocal(localPoint);
									bmd.draw2(this);
									bmp.x = x;
									bmp.y = y;
									LayerUtil.addChild(bmp,LayerDef.TIP);
									TweenLite.to(bmp,0.5,{scaleX:sx,scaleY:sy,x:localPoint.x,y:localPoint.y,alpha:0,ease:Linear.easeNone,onComplete:flash.bind(this.onFadeComplete,this),onCompleteParams:[bmp]});
								}
								else if(this._closeEffectState == com.txjy.s01.ui.component.S01BaseBox.CLOSEEFFECT1)
								{
									bmd.draw2(this);
									bmp.x = x;
									bmp.y = y;
									var sp:egret.DisplayObject = <any>UIUtil.changeRegisterPoint(bmp);
									LayerUtil.addChild(sp,LayerDef.TIP);
									TweenLite.to(sp,0.5,{scaleX:0,scaleY:0,alpha:0,ease:Linear.easeNone,onComplete:flash.bind(this.onFadeComplete,this),onCompleteParams:[sp],ease:Back.easeInOut});
								}
							}
							return super["close"]();
							SysGeneral.getInstance().updateTotalFightEvent();
						}

						private onFadeComplete(bmp:egret.DisplayObject)
						{
							SysGeneral.getInstance().updateTotalFightEvent();
							TweenLite.killTweensOf(bmp);
							if(bmp.parent)
								bmp.parent.removeChild(bmp);
						}

						public get autoCloseOther():boolean
						{
							return true;
						}

						public set autoCloseOther(value:boolean)
		{
			flash.superSetter(com.txjy.s01.ui.component.S01BaseBox, this, "autoCloseOther", value);
		}
	
 						public get autoCloseByOther():boolean
						{
							return true;
						}

						public set autoCloseByOther(value:boolean)
		{
			flash.superSetter(com.txjy.s01.ui.component.S01BaseBox, this, "autoCloseByOther", value);
		}
	
 						protected onAddedToStage(event:egret.Event)
						{
							super["onAddedToStage"](event);
							if(this.autoCloseOther)
								BoxUtil.autoCloseOther(this);
							stage.addEventListener(egret.Event.RESIZE,flash.bind(this.onStageResize,this));
							this.onStageResize(null);
							this.openEffect();
						}

						protected onRemovedFromStage(event:egret.Event)
						{
							super["onRemovedFromStage"](event);
							this.hideClosePanelAniTip();
							stage.removeEventListener(egret.Event.RESIZE,flash.bind(this.onStageResize,this));
						}

						protected openEffect()
						{
							if(<any>!this._needOpenEffect)
								return ;
							var toY:number = flash.checkInt(y);
							y -= 20;
							alpha = 0.1;
							TweenLite.to(this,0.2,{y:toY,alpha:1,ease:Linear.easeNone});
						}

						public onKeyDown(event:flash.KeyboardEvent,focus:egret.DisplayObject,lastKeyDownCode:number):number
						{
							lastKeyDownCode = flash.checkInt(lastKeyDownCode);

							if(event.keyCode == lastKeyDownCode)
								return KeyboardDef.ACTION_STATE_DISACCORD;
							if(<any>!isTop() || <any>!isShowed)
								return KeyboardDef.ACTION_STATE_DISACCORD;
							if(event.keyCode == KeyboardDef.KC_ESCAPE)
							{
								this.close();
								return KeyboardDef.ACTION_STATE_STOP;
							}
							return KeyboardDef.ACTION_STATE_NORMAL;
						}

						public get keyDownPriority():number
						{
							return KeyPriority.BOX;
						}

						public set keyDownPriority(value:number)
		{
			flash.superSetter(com.txjy.s01.ui.component.S01BaseBox, this, "keyDownPriority", value);
		}
	
 						protected onDragObjMouseDown(event:flash.MouseEvent):boolean
						{
							if(<any>!super["onDragObjMouseDown"](event))
								return false;
							if(UIUtil.holeSpr)
								UIUtil.holeSpr.visible = false;
							return true;
						}

						protected onStageMouseUp(event:flash.MouseEvent)
						{
							super["onStageMouseUp"](event);
							UIUtil.refreHole(false);
						}

						protected createCloseButton(isBig:boolean = true)
						{
							if(isBig)
							{
								this._btnClose = UIUtil.createButton(new BigCloseButton());
								this._btnClose["x"] = width - 34;
								this._btnClose["y"] = 15;
							}
							else
							{
								this._btnClose = UIUtil.createButton(new SmlCloseButton());
								this._btnClose["x"] = width - 30;
								this._btnClose["y"] = 5;
							}
							addChild(this._btnClose);
							setCloseButton(this._btnClose);
						}

						protected onStageResize(event:egret.Event)
						{
							var w:number = <any>width;
							var h:number = <any>height;
							if(skinContainer)
							{
								w = skinContainer.width;
								h = skinContainer.height;
							}
							x = (LayerUtil.getWidth() - w) / 2;
							y = (LayerUtil.getHeight() - h) / 2;
							UIUtil.refreHole(false);
						}

						public showClosePanelAniTip(dis:egret.DisplayObject = null,alpha:number = 0.5,towards:number = 3,arrX:number = NaN,arrY:number = NaN,needHole:boolean = false)
						{
							var targetDisplayObj:egret.DisplayObject = dis;
							if(targetDisplayObj == null)
								targetDisplayObj = this._btnClose;
							var offsetX:number = <any>0;
							var offsetY:number = <any>0;
							if(isNaN(arrX))
								offsetX = this._btnClose["width"] / 2;
							if(isNaN(arrY))
								offsetY = this._btnClose["height"] / 2;
							UIUtil.createHole(targetDisplayObj,alpha,towards,offsetX,offsetY,needHole);
						}

						public hideClosePanelAniTip()
						{
							UIUtil.destroyHole();
						}

					}
				}
			}
		}
	}
}

com.txjy.s01.ui.component.S01BaseBox.CLOSEEFFECT1 = 1;
flash.extendsClass("com.txjy.s01.ui.component.S01BaseBox","mana.flc.BaseBox")
flash.implementsClass("com.txjy.s01.ui.component.S01BaseBox",["com.txjy.s01.ui.IKeyDown"]);