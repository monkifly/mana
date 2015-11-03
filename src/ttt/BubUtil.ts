module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class BubUtil extends egret.HashObject {

					public static _con:egret.Sprite;
					public static createServerBubIcon(bubData:com.txjy.s01.model.common.BubData)
					{
						var bubIcon:com.txjy.s01.view.common.BubIcon = <any>null;
						if(BubDef.getBubClass(bubData["popStyle"]))
						{
							bubIcon = new BubIcon(BubDef.BUB_TYPE_SERVER,bubData["popStyle"]);
							bubIcon["data"] = new BubServerData();
							bubIcon["bubServerItem"].addItem(bubData);
							if(<any>!com.txjy.s01.utils.BubUtil._con)
							{
								com.txjy.s01.utils.BubUtil._con = new egret.Sprite();
								com.txjy.s01.utils.BubUtil.onStageResize();
								LayerUtil.getStage().addEventListener(egret.Event.RESIZE,com.txjy.s01.utils.BubUtil.onStageResize);
								com.txjy.s01.utils.BubUtil.checkBubVisible();
							}
							com.txjy.s01.utils.BubUtil._con.addChild(bubIcon);
							LayerUtil.addChild(com.txjy.s01.utils.BubUtil._con,LayerDef.BASE_UI);
							com.txjy.s01.utils.BubUtil.onStageResize();
						}
					}

					public static createClientBubIcon(bubData:com.txjy.s01.model.common.BubClientData)
					{
						var bubIcon:com.txjy.s01.view.common.BubIcon = <any>null;
						if(BubDef.getBubClass(bubData["popStyle"]))
						{
							bubIcon = new BubIcon(BubDef.BUB_TPYE_CLIENT,bubData["popStyle"]);
							bubIcon["data"] = bubData;
							if(<any>!com.txjy.s01.utils.BubUtil._con)
							{
								com.txjy.s01.utils.BubUtil._con = new egret.Sprite();
								com.txjy.s01.utils.BubUtil.onStageResize();
								LayerUtil.getStage().addEventListener(egret.Event.RESIZE,com.txjy.s01.utils.BubUtil.onStageResize);
								com.txjy.s01.utils.BubUtil.checkBubVisible();
							}
							com.txjy.s01.utils.BubUtil._con.addChild(bubIcon);
							LayerUtil.addChild(com.txjy.s01.utils.BubUtil._con,LayerDef.BASE_UI);
							com.txjy.s01.utils.BubUtil.onStageResize();
						}
					}

					private static onStageResize(event:egret.Event = null)
					{
						LayoutUtil.setBottom(com.txjy.s01.utils.BubUtil._con,250 - 130);
						LayoutUtil.hBoxLayout(com.txjy.s01.utils.BubUtil._con,2);
						LayoutUtil.setCenterH(com.txjy.s01.utils.BubUtil._con);
					}

					public static removeBub(id:number):com.txjy.s01.view.common.BubIcon
					{
						var bubIcon:com.txjy.s01.view.common.BubIcon = com.txjy.s01.utils.BubUtil.getBubIcon(id);
						if(bubIcon)
						{
							com.txjy.s01.utils.BubUtil._con.removeChild(bubIcon);
							com.txjy.s01.utils.TipUtil.unregisterTip(bubIcon);
							LayoutUtil.hBoxLayout(com.txjy.s01.utils.BubUtil._con,2);
							LayoutUtil.setCenterH(com.txjy.s01.utils.BubUtil._con);
						}
						return bubIcon;
					}

					public static getBubIcon(popStyle:number):com.txjy.s01.view.common.BubIcon
					{
						if(<any>!com.txjy.s01.utils.BubUtil._con || com.txjy.s01.utils.BubUtil._con.numChildren == 0)
							return null;
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.BubUtil._con.numChildren; ++i)
						{
							var bubIcon:com.txjy.s01.view.common.BubIcon = <any><BubIcon>flash.As3As(com.txjy.s01.utils.BubUtil._con.getChildAt(i),BubIcon);
							if(bubIcon["bubType"] == BubDef.BUB_TPYE_CLIENT)
							{
								if(bubIcon["bubClientItem"].popStyle == popStyle)
									return bubIcon;
							}
							else if(bubIcon["bubType"] == BubDef.BUB_TYPE_SERVER)
							{
								if(bubIcon["bubServerItem"].popStyle == popStyle)
									return bubIcon;
							}
						}
						return null;
					}

					public static getBubIconStagePos(popStyle:number):egret.Point
					{
						if(<any>!com.txjy.s01.utils.BubUtil._con || com.txjy.s01.utils.BubUtil._con.numChildren == 0)
							return null;
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.BubUtil._con.numChildren; ++i)
						{
							var bubIcon:com.txjy.s01.view.common.BubIcon = <any><BubIcon>flash.As3As(com.txjy.s01.utils.BubUtil._con.getChildAt(i),BubIcon);
							if(bubIcon["bubType"] == BubDef.BUB_TPYE_CLIENT)
							{
								if(bubIcon["bubClientItem"].popStyle == popStyle)
									return bubIcon["localToGlobal"](new egret.Point());
							}
							else if(bubIcon["bubType"] == BubDef.BUB_TYPE_SERVER)
							{
								if(bubIcon["bubServerItem"].popStyle == popStyle)
									return bubIcon["localToGlobal"](new egret.Point());
							}
						}
						return null;
					}

					public static getBubIconByPopID(popID:number):com.txjy.s01.view.common.BubIcon
					{
						if(<any>!com.txjy.s01.utils.BubUtil._con || com.txjy.s01.utils.BubUtil._con.numChildren == 0)
							return null;
						for(var i:number = flash.checkInt(0);i < com.txjy.s01.utils.BubUtil._con.numChildren; ++i)
						{
							var bubIcon:com.txjy.s01.view.common.BubIcon = <any><BubIcon>flash.As3As(com.txjy.s01.utils.BubUtil._con.getChildAt(i),BubIcon);
							if(bubIcon["bubType"] == BubDef.BUB_TYPE_SERVER)
							{
								var bubdata:com.txjy.s01.model.common.BubData = <any>bubIcon["bubServerItem"].getItemByPopID(popID);
								if(bubdata)
									return bubIcon;
							}
						}
						return null;
					}

					public static _canCheckVisible:boolean;
					public static checkBubVisible()
					{
						if(<any>!com.txjy.s01.utils.BubUtil._con)
							return ;
						if(<any>!com.txjy.s01.utils.BubUtil._canCheckVisible)
						{
							com.txjy.s01.utils.BubUtil._canCheckVisible = true;
							flash.setTimeout(com.txjy.s01.utils.BubUtil.checkBubVisible,50);
							return ;
						}
						com.txjy.s01.utils.BubUtil._canCheckVisible = false;
						if(SysStory.getInstance().isPlaying || SysCommon.getInstance().getNewStoryState() < StoryDef.NEW_STORY_STATE_ALL_END || com.txjy.s01.utils.BoxUtil.hasSceneBoxShow() && <any>!com.txjy.s01.utils.BoxUtil.isBoxShowed(BoxDef.BOX_ID_CONVOY) || com.txjy.s01.utils.UIUtil.getView(CampaignView) && CampaignView(com.txjy.s01.utils.UIUtil.getView(CampaignView)).stage || SysKillMatrix.getInstance().isInKillMatrix || SysFight.getInstance().fightState != FightDef.STATE_NULL)
						{
							com.txjy.s01.utils.BubUtil._con.visible = false;
						}
						else
						{
							com.txjy.s01.utils.BubUtil._con.visible = true;
						}
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.BubUtil._canCheckVisible = false;
