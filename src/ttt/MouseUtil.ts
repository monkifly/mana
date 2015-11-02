module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class MouseUtil extends egret.HashObject {

					public static _curType:number = 0;
					public static _mouseSwf:com.txjy.s01.ui.component.S01Swf;
					public static showCusMouse(type:number)
					{
						type = flash.checkInt(type);

						var commonInfo:sheetutil.CommonInfo = <any>SysCommon.getInstance().getCommonInfo(CommonDef.SHEET_TYPE_MOUSE_EFFECT,type);
						if(<any>!commonInfo)
						{
							logger.output("找不到表属性 鼠标类型" + type);
							return ;
						}
						if(<any>!com.txjy.s01.utils.MouseUtil._mouseSwf)
							com.txjy.s01.utils.MouseUtil._mouseSwf = new S01Swf();
						com.txjy.s01.utils.MouseUtil._curType = flash.checkInt(type);
						com.txjy.s01.utils.MouseUtil._mouseSwf["addEventListener"](egret.Event.COMPLETE,com.txjy.s01.utils.MouseUtil.onMouseSwfComplete);
						com.txjy.s01.utils.MouseUtil._mouseSwf["load"](UIPathDef.getAssetUrl(commonInfo["value2"]));
					}

					public static showSysMouse()
					{
						Mouse.show();
						if(com.txjy.s01.utils.MouseUtil._mouseSwf)
						{
							TimerUtil.removeFrameExecute(com.txjy.s01.utils.MouseUtil.onEnterFrame);
							com.txjy.s01.utils.MouseUtil._mouseSwf["unload"]();
							if(com.txjy.s01.utils.MouseUtil._mouseSwf["parent"])
								LayerUtil.removeChild(com.txjy.s01.utils.MouseUtil._mouseSwf);
						}
						com.txjy.s01.utils.MouseUtil._curType = flash.checkInt(-1);
					}

					private static onMouseSwfComplete(event:egret.Event)
					{
						if(com.txjy.s01.utils.MouseUtil._curType != -1 && event.currentTarget == com.txjy.s01.utils.MouseUtil._mouseSwf)
						{
							com.txjy.s01.utils.MouseUtil._mouseSwf["mouseEnabled"] = com.txjy.s01.utils.MouseUtil._mouseSwf["mouseChildren"] = false;
							var layer:egret.Sprite = <any>LayerUtil.getLayer(LayerDef.MOUSE_UI);
							layer.addChild(com.txjy.s01.utils.MouseUtil._mouseSwf);
							Mouse.hide();
							TimerUtil.addFrameExecute(com.txjy.s01.utils.MouseUtil.onEnterFrame);
							com.txjy.s01.utils.MouseUtil.onEnterFrame();
						}
					}

					private static onEnterFrame()
					{
						var layer:egret.Sprite = <any>LayerUtil.getLayer(LayerDef.MOUSE_UI);
						com.txjy.s01.utils.MouseUtil._mouseSwf["x"] = layer["mouseX"];
						com.txjy.s01.utils.MouseUtil._mouseSwf["y"] = layer["mouseY"];
					}

				}
			}
		}
	}
}

