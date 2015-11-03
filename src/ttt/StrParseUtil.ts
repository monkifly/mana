//module com {
//	export module txjy {
//		export module s01 {
//			export module utils {
//				export class StrParseUtil extends egret.HashObject {
//
//					public static REPLACER_REGEXP:RegExp;
//					public static begin:number;
//					public static BEGIN:number;
//					public static ITEMLINK:number;
//					public static GENERALLINK:number;
//					public static PLYAER:number;
//					public static FORM:number;
//					public static BATTLE_COPY:number;
//					public static UNIT:number;
//					public static ROLEUP:number;
//					public static REWARD:number;
//					public static UNITLINK:number;
//					public static SKYGAMELINK:number;
//					public static KILLMATRIXLINK:number;
//					public static GETGENERALLINK:number;
//					public static HOLIDAYANSWERLINK:number;
//					public static PASSCARDLINK:number;
//					public static GETTALENT:number;
//					public static UNITNAME:number;
//					public static SECRETLINKLINK:number;
//					public static FBLINK:number;
//					public static FKLINK:number;
//					public static CAMPLINK:number;
//					public static ARMYLINK:number;
//					public static ATTR:number;
//					public static END:number;
//
//					public constructor()
//					{
//						super();
//					}
//
//					public static parsePlayerNotice(str:string):string
//					{
//						if(str == null || str.length < 2)
//							return "";
//						str = str.substring(1,str.length - 1);
//						var arr:Array<any> = str.split("|");
//						if(arr.length == 0)
//							return "";
//						var ID:number = flash.checkInt(0);
//						var name:string = "";
//						var type:number = flash.checkInt(flash.tranint(arr[0]));
//						var isNeedLink:boolean;
//						switch(type)
//						{
//						case com.txjy.s01.utils.StrParseUtil.ITEMLINK :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var itemTmp:com.txjy.s01.model.item.Item = <any>new Item();
//							itemTmp["info"] = SheetUtil.getItemInfo(ID);
//							if(itemTmp["info"].chatLink)
//								str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.ITEMLINK,ID);
//							else
//								str = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_0,com.txjy.s01.utils.CssUtil.getStyle("quality_" + itemTmp["info"].quality)["color"],itemTmp["info"].name);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GENERALLINK :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							isNeedLink = flash.Boolean(flash.tranint(arr[2]));
//							if(isNeedLink)
//								str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.GENERALLINK,ID);
//							else
//							{
//								var genInfo:sheetutil.GeneralInfo = <any>SheetUtil.getGeneralInfo(ID);
//								if(genInfo)
//									str = SysCommon.getInstance().getQualityHTMLStr(genInfo["name"],genInfo["quality"]);
//								else
//									str = "";
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.PLYAER :
//							name = arr[1];
//							if(name != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,name);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FORM :
//							var formValue:number = flash.checkInt(arr[1]);
//							var idTmp:number = flash.checkInt(com.txjy.s01.utils.CommonUtil.getBitValueByLen(formValue,0,8));
//							var lvTmp:number = flash.checkInt(com.txjy.s01.utils.CommonUtil.getBitValueByLen(formValue,8,8));
//							var formInfo:sheetutil.FormInfo = <any>SysGeneral.getInstance().getSeatInfo(idTmp,lvTmp);
//							if(formInfo != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,formInfo["formName"]);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.BATTLE_COPY :
//							var copyID:number = flash.checkInt(arr[1]);
//							var copyInfo:sheetutil.BattleCopyInfo = <any>SheetUtil.getBattleCopyInfo(copyID);
//							if(copyInfo != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,copyInfo["name"]);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.UNIT :
//							var unitID:number = flash.checkInt(arr[1]);
//							var unitInfo:sheetutil.UnitInfo = <any>SheetUtil.getUnitInfo(unitID);
//							if(unitInfo != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,unitInfo["name"]);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.ROLEUP :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var genRoleUpInfo:sheetutil.GeneralInfo = <any>SheetUtil.getGeneralInfo(ID);
//							str = "<font color='{0}'>{1}</font>";
//							str = StringUtil.substitute(str,"#02fc12",GeneralDef.getGeneralCateName(genRoleUpInfo["category"]));
//							break;
//						case com.txjy.s01.utils.StrParseUtil.REWARD :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var rewardInfo:sheetutil.RewardInfo = <any>SheetUtil.getRewardInfo(ID);
//							str = rewardInfo["name"];
//							break;
//						case com.txjy.s01.utils.StrParseUtil.UNITLINK :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.UNITLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.SKYGAMELINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.SKYGAMELINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.KILLMATRIXLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.KILLMATRIXLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GETGENERALLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.GETGENERALLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.HOLIDAYANSWERLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.HOLIDAYANSWERLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.PASSCARDLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.PASSCARDLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GETTALENT :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.GETTALENT,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.UNITNAME :
//							name = arr[1];
//							str = name;
//							break;
//						case com.txjy.s01.utils.StrParseUtil.SECRETLINKLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.SECRETLINKLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FBLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.FBLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FKLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.FKLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.CAMPLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.CAMPLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.ARMYLINK :
//							str = com.txjy.s01.utils.StrParseUtil.getLinkHtmlStr(com.txjy.s01.utils.StrParseUtil.ARMYLINK,ID);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.ATTR :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							str = SheetUtil.getAttrIndexInfo(ID).name;
//							break;
//						}
//						return str;
//					}
//
//					public static getLinkHtmlStr(type:number,...param):string
//					{
//						type = flash.checkInt(type);
//
//						var reStr:string = "";
//						var paramArr:Array<any> = </*Array*/any>flash.As3As(param,Array);
//						var canseeLv:number = flash.checkInt(SysCommon.getConstValue(CommonDef.ID_CONST_CHATLINK_CANSEELV));
//						var mainLv:number = flash.checkInt(SysGeneral.getInstance().mainPlayer.level);
//						switch(type)
//						{
//						case com.txjy.s01.utils.StrParseUtil.UNITLINK :
//							{
//								if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_CORPS) || mainLv >= canseeLv)
//									reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type + "_" + paramArr[0],"#02fc12","申请加入");
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.SKYGAMELINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_14) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要参加");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.KILLMATRIXLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_6) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要参加");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GETGENERALLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_8) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要武将");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.HOLIDAYANSWERLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_3) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要参加");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.PASSCARDLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_1) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要参加");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GETTALENT :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_PAG_FIGHTMARK) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要战纹");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.SECRETLINKLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_20) || SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_19) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要参加");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GENERALLINK :
//							var genInfo:sheetutil.GeneralInfo = <any>SheetUtil.getGeneralInfo(paramArr[0]);
//							reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type + "_" + paramArr[0],com.txjy.s01.utils.CssUtil.getStyle("quality_" + genInfo["quality"])["color"],genInfo["name"]);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.ITEMLINK :
//							var itemInfo:sheetnoutil.ItemInfo = <any>SheetUtil.getItemInfo(paramArr[0]);
//							reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type + "_" + paramArr[0],com.txjy.s01.utils.CssUtil.getStyle("quality_" + itemInfo["quality"])["color"],itemInfo["name"]);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FBLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_18) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要参加");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FKLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_5) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要竞技");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.CAMPLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_ACTION_9) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我要扎营");
//							break;
//						case com.txjy.s01.utils.StrParseUtil.ARMYLINK :
//							if(SysCommon.getInstance().hasOpenBtnFun(CommonDef.ID_PAG_ARMY) || mainLv >= canseeLv)
//								reStr = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_2,type,"#02fc12","我的兵牌");
//							break;
//						}
//						return reStr;
//					}
//
//					public static parsePlayerNoticeNoLink(str:string):string
//					{
//						if(str == null || str.length < 2)
//							return "";
//						str = str.substring(1,str.length - 1);
//						var arr:Array<any> = str.split("|");
//						if(arr.length == 0)
//							return "";
//						var ID:number = flash.checkInt(0);
//						var name:string = "";
//						var type:number = flash.checkInt(flash.tranint(arr[0]));
//						var isNeedLink:boolean;
//						switch(type)
//						{
//						case com.txjy.s01.utils.StrParseUtil.ITEMLINK :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var itemTmp:com.txjy.s01.model.item.Item = <any>new Item();
//							itemTmp["info"] = SheetUtil.getItemInfo(ID);
//							str = StringUtil.substitute(com.txjy.s01.utils.CssUtil.HTML_FORMAT_0,com.txjy.s01.utils.CssUtil.getStyle("quality_" + itemTmp["info"].quality)["color"],itemTmp["info"].name);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GENERALLINK :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var genInfo:sheetutil.GeneralInfo = <any>SheetUtil.getGeneralInfo(ID);
//							str = SysCommon.getInstance().getQualityHTMLStr(genInfo["name"],genInfo["quality"]);
//							break;
//						case com.txjy.s01.utils.StrParseUtil.PLYAER :
//							name = arr[1];
//							if(name != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,name);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FORM :
//							var formValue:number = flash.checkInt(arr[1]);
//							var idTmp:number = flash.checkInt(com.txjy.s01.utils.CommonUtil.getBitValueByLen(formValue,0,8));
//							var lvTmp:number = flash.checkInt(com.txjy.s01.utils.CommonUtil.getBitValueByLen(formValue,8,8));
//							var formInfo:sheetutil.FormInfo = <any>SysGeneral.getInstance().getSeatInfo(idTmp,lvTmp);
//							if(formInfo != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,formInfo["formName"]);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.BATTLE_COPY :
//							var copyID:number = flash.checkInt(arr[1]);
//							var copyInfo:sheetutil.BattleCopyInfo = <any>SheetUtil.getBattleCopyInfo(copyID);
//							if(copyInfo != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,copyInfo["name"]);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.UNIT :
//							var unitID:number = flash.checkInt(arr[1]);
//							var unitInfo:sheetutil.UnitInfo = <any>SheetUtil.getUnitInfo(unitID);
//							if(unitInfo != null)
//							{
//								str = "<font color='#cd990e'>{0}</font>";
//								str = StringUtil.substitute(str,unitInfo["name"]);
//							}
//							break;
//						case com.txjy.s01.utils.StrParseUtil.ROLEUP :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var genRoleUpInfo:sheetutil.GeneralInfo = <any>SheetUtil.getGeneralInfo(ID);
//							str = "<font color='{0}'>{1}</font>";
//							str = StringUtil.substitute(str,"#02fc12",GeneralDef.getGeneralCateName(genRoleUpInfo["category"]));
//							break;
//						case com.txjy.s01.utils.StrParseUtil.REWARD :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							var rewardInfo:sheetutil.RewardInfo = <any>SheetUtil.getRewardInfo(ID);
//							str = rewardInfo["name"];
//							break;
//						case com.txjy.s01.utils.StrParseUtil.UNITLINK :
//							ID = flash.checkInt(flash.tranint(arr[1]));
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.SKYGAMELINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.KILLMATRIXLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GETGENERALLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.HOLIDAYANSWERLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.PASSCARDLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.GETTALENT :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.UNITNAME :
//							name = arr[1];
//							str = name;
//							break;
//						case com.txjy.s01.utils.StrParseUtil.SECRETLINKLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FBLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.FKLINK :
//							str = "";
//							break;
//						case com.txjy.s01.utils.StrParseUtil.CAMPLINK :
//							str = "";
//							break;
//						}
//						return str;
//					}
//
//				}
//			}
//		}
//	}
//}
//
//com.txjy.s01.utils.StrParseUtil.REPLACER_REGEXP = new RegExp("\\{.+?\\}","g");
//com.txjy.s01.utils.StrParseUtil.begin = 1;
//com.txjy.s01.utils.StrParseUtil.BEGIN = com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.ITEMLINK = com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.GENERALLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.PLYAER = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.FORM = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.BATTLE_COPY = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.UNIT = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.ROLEUP = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.REWARD = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.UNITLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.SKYGAMELINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.KILLMATRIXLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.GETGENERALLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.HOLIDAYANSWERLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.PASSCARDLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.GETTALENT = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.UNITNAME = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.SECRETLINKLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.FBLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.FKLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.CAMPLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.ARMYLINK = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.ATTR = ++com.txjy.s01.utils.StrParseUtil.begin;
//com.txjy.s01.utils.StrParseUtil.END = ++com.txjy.s01.utils.StrParseUtil.begin;
