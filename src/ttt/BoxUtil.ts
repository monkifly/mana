module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class BoxUtil extends mana.core.Singleton {

					public static _boxs:Array<any>;
					public static _destroyBoxs:Array<any>;
					public static _creatingBoxIDs:Array<any>;
					public static displayBox(boxID:number,data:any = null,reverse:boolean = true,triggerType:number = 0,layer:number = -1)
					{
						var box:com.txjy.s01.ui.component.S01BaseBox = com.txjy.s01.utils.BoxUtil.getBox(boxID);
						if(box)
						{
							box["data"] = data;
							box["triggerType"] = triggerType;
							com.txjy.s01.utils.BoxUtil.showBox(box,reverse,layer);
						}
						else
						{
							com.txjy.s01.utils.BoxUtil.createBox(boxID,function ()
							{
								com.txjy.s01.utils.BoxUtil.displayBox(boxID,data,reverse,triggerType,layer);
							});
						}
					}

					public static createBox(boxID:number,callback:Function = null,...params)
					{
						if(com.txjy.s01.utils.BoxUtil._creatingBoxIDs.indexOf(boxID) != -1)
							return ;
						if(com.txjy.s01.utils.BoxUtil.hasBox(boxID))
							return ;
						com.txjy.s01.utils.BoxUtil._creatingBoxIDs.push(boxID);
						UILoader.getInstance().loadBox(boxID,function ()
						{
							var cIdx:number = flash.checkInt(com.txjy.s01.utils.BoxUtil._creatingBoxIDs.indexOf(boxID));
							com.txjy.s01.utils.BoxUtil._creatingBoxIDs.splice(cIdx,1);
							var classRef:any = <any>BoxDef.getBoxClass(boxID);
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>new classRef();
							com.txjy.s01.utils.BoxUtil._boxs[boxID] = box;
							if(callback != null)
								callback.apply(null,params);
						});
					}

					public static hasBox(boxID:number):boolean
					{
						boxID = flash.checkInt(boxID);

						return com.txjy.s01.utils.BoxUtil._boxs[boxID] != null;
					}

					public static getBox(boxID:number):com.txjy.s01.ui.component.S01BaseBox
					{
						boxID = flash.checkInt(boxID);

						return com.txjy.s01.utils.BoxUtil._boxs[boxID];
					}

					public static isBoxShowed(boxID:number):boolean
					{
						boxID = flash.checkInt(boxID);

						if(<any>!com.txjy.s01.utils.BoxUtil.hasBox(boxID))
							return false;
						return com.txjy.s01.utils.BoxUtil.getBox(boxID)["isShowed"];
					}

					public static hasBoxShow():boolean
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if(box && box["isShowed"])
								return true;
						}
						return false;
					}

					public static hasSceneBoxShow():boolean
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if((flash.As3is(box,null,"S01SceneBox")) && box["isShowed"])
								return true;
						}
						return false;
					}

					public static getCurSceneBoxID():number
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if((flash.As3is(box,null,"S01SceneBox")) && box["isShowed"])
								return i;
						}
						return -1;
					}

					public static closeBox(boxID:number)
					{
						boxID = flash.checkInt(boxID);

						var box:com.txjy.s01.ui.component.S01BaseBox = com.txjy.s01.utils.BoxUtil.getBox(boxID);
						if(box && box["isShowed"])
							box["close"]();
					}

					public static closeBoxByTrigger(triggers:Array<any>)
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if(box && triggers.indexOf(box["triggerType"]) != -1)
								box["close"]();
						}
					}

					public static closeAllBox(includeScence:boolean = true)
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if(<any>!includeScence && (flash.As3is(box,null,"S01SceneBox")))
								continue;
							if(box)
								box["close"]();
						}
					}

					public static closeAllBoxExcept(boxIDs:Array<any>)
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							if(boxIDs.indexOf(i) == -1)
							{
								var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
								if(box)
									box["close"]();
							}
						}
					}

					public static closeAllDestroyBox()
					{
						while(com.txjy.s01.utils.BoxUtil._destroyBoxs.length)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._destroyBoxs.shift();
							if(box)
								box["close"]();
						}
					}

					public static closeDestroyBoxByElement(eleString:string,value:number)
					{
						value = flash.checkInt(value);

						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.BoxUtil._destroyBoxs.length; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._destroyBoxs[i];
							if(box && box["data"])
							{
								var dataTmp:number = 0;
								if(box["hasOwnProperty"](eleString) && box[eleString] != null)
									dataTmp = flash.checkInt(flash.tranint(box[eleString]));
								else if(box["data"][eleString] != null)
									dataTmp = flash.checkInt(flash.tranint(box["data"][eleString]));
								if(dataTmp == value)
									box["close"]();
							}
						}
					}

					public static autoCloseOther(selfBox:com.txjy.s01.ui.component.S01BaseBox)
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if(box == selfBox)
								continue;
							if(box && box["autoCloseByOther"] && com.txjy.s01.utils.BoxUtil.isBoxShowed(i))
								box["close"]();
						}
					}

					public static closeSceneBox()
					{
						for(var i:number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END; ++i)
						{
							var box:com.txjy.s01.ui.component.S01BaseBox = <any>com.txjy.s01.utils.BoxUtil._boxs[i];
							if(box && (flash.As3is(box,null,"S01SceneBox")))
								box["close"]();
						}
						com.txjy.s01.utils.SceneUtil.changeScene(com.txjy.s01.utils.SceneUtil.curScene);
					}

					public static showBox(box:com.txjy.s01.ui.component.S01BaseBox,reverse:boolean = true,layer:number = -1)
					{
						if(<any>!reverse || <any>!box["isShowed"])
						{
							if(layer == -1)
								layer = flash.checkInt(LayerDef.BOX);
							box["open"](LayerUtil.getLayer(layer));
						}
						else
							box["close"]();
					}

					public static displayDistroyBox(boxID:number,data:any = null,layer:number = -1)
					{
						var box:com.txjy.s01.ui.component.S01BaseBox;
						UILoader.getInstance().loadBox(boxID,function ()
						{
							var classRef:any = <any>BoxDef.getBoxClass(boxID);
							box = new classRef();
							box["data"] = data;
							box["addEventListener"](FlcEvent.BOX_CLOSED,com.txjy.s01.utils.BoxUtil.onBoxClosed);
							com.txjy.s01.utils.BoxUtil._destroyBoxs.push(box);
							com.txjy.s01.utils.BoxUtil.showBox(box,false,layer);
						});
					}

					private static onBoxClosed(event:mana.flc.event.FlcEvent)
					{
						var box:com.txjy.s01.ui.component.S01BaseBox = <any><S01BaseBox>flash.As3As(event["currentTarget"],S01BaseBox);
						var index:number = flash.checkInt(com.txjy.s01.utils.BoxUtil._destroyBoxs.indexOf(box));
						if(index != -1)
							com.txjy.s01.utils.BoxUtil._destroyBoxs.splice(index,1);
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.BoxUtil._boxs = [];
com.txjy.s01.utils.BoxUtil._destroyBoxs = [];
com.txjy.s01.utils.BoxUtil._creatingBoxIDs = [];
flash.extendsClass("com.txjy.s01.utils.BoxUtil","mana.core.Singleton")
