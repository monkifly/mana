module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class CommonUtil extends egret.HashObject {

					public static formatTime(second:number,format:string = "hh:mm:ss"):string
					{
						format = format.toLocaleLowerCase();
						var hour:number = flash.checkInt(0);
						var min:number = flash.checkInt(0);
						var sec:number = flash.checkInt(0);
						if(format.indexOf("h") != -1)
						{
							hour = flash.checkInt(second / 3600);
							min = flash.checkInt((second - hour * 3600) / 60);
							sec = flash.checkInt(second % 60);
						}
						else
						{
							if(format.indexOf("m") != -1)
							{
								min = flash.checkInt(second / 60);
								sec = flash.checkInt(second % 60);
							}
							else
							{
								sec = flash.checkInt(second);
							}
						}
						var str:string = format;
						if(format.indexOf("hh") != -1)
							str = str.replace("hh",flash.String(hour > 9?hour:"0" + hour));
						else if(format.indexOf("h") != -1)
							str = str.replace("h",hour.toString());
						if(format.indexOf("mm") != -1)
							str = str.replace("mm",flash.String(min > 9?min:"0" + min));
						else if(format.indexOf("m") != -1)
							str = str.replace("m",min.toString());
						if(format.indexOf("ss") != -1)
							str = str.replace("ss",flash.String(sec > 9?sec:"0" + sec));
						else if(format.indexOf("s") != -1)
							str = str.replace("s",sec.toString());
						return str;
					}

					public static formatDate(secondOrDate:any,format:string = "yyyy-mm-dd hh:mimi:ss"):string
					{
						format = format.toLocaleLowerCase();
						var date:flash.As3Date;
						if(flash.As3is(secondOrDate,flash.As3Date))
							date = secondOrDate;
						else
							date = new flash.As3Date(secondOrDate * 1000);
						var str:string = format;
						if(format.indexOf("yyyy") != -1)
							str = str.replace("yyyy",date.fullYear);
						else if(format.indexOf("yy") != -1)
							str = str.replace("yy",date.fullYear.toString().substr(2));
						if(format.indexOf("mm") != -1)
							str = str.replace("mm",flash.String((date.month + 1) > 9?(date.month + 1):"0" + (date.month + 1)));
						else if(format.indexOf("m") != -1)
							str = str.replace("m",(date.month + 1).toString());
						if(format.indexOf("dd") != -1)
							str = str.replace("dd",flash.String(date.date > 9?date.date:"0" + date.date));
						else if(format.indexOf("d") != -1)
							str = str.replace("d",date.date.toString());
						if(format.indexOf("hh") != -1)
							str = str.replace("hh",flash.String(date.hours > 9?date.hours:"0" + date.hours));
						else if(format.indexOf("h") != -1)
							str = str.replace("h",date.hours.toString());
						if(format.indexOf("mimi") != -1)
							str = str.replace("mimi",flash.String(date.minutes > 9?date.minutes:"0" + date.minutes));
						else if(format.indexOf("mi") != -1)
							str = str.replace("mi",date.minutes.toString());
						if(format.indexOf("ss") != -1)
							str = str.replace("ss",flash.String(date.seconds > 9?date.seconds:"0" + date.seconds));
						else if(format.indexOf("s") != -1)
							str = str.replace("s",date.seconds.toString());
						return str;
					}

					public static getBitValue(value:number,fromBit:number = 0,toBit:number = 31):number
					{
						return toBit - fromBit + 1 < 32?(value >>> fromBit) & ((1 << (toBit - fromBit + 1)) - 1):value;
					}

					public static getBitValueByLen(value:number,fromBit:number = 0,len:number = 32):number
					{
						return len < 32?(value >>> fromBit) & ((1 << len) - 1):value;
					}

					public static getNumerFormat(value:number,wanStr:string = "万"):string
					{
						var str:string = flash.String(value);
						var len:number = flash.checkInt(str.length);
						var wStr:string = str.substr(0,len - 4) + wanStr;
						if(len >= 5)
							return wStr;
						else
							return str;
					}

					public static setHintNoTipFlag(tabID:number,value:boolean)
					{
						tabID = flash.checkInt(tabID);

						com.txjy.s01.utils.CommonUtil.hintNoTipDic.setItem(tabID,value);
					}

					public static getHintNoTipFlag(tabID:number):boolean
					{
						tabID = flash.checkInt(tabID);

						return com.txjy.s01.utils.CommonUtil.hintNoTipDic.getItem(tabID);
					}

					public static hintNoTipDic:flash.Dictionary;
					public static showHint(tabID:number,callBack:Function = null,...args):number
					{
						var textInfo:sheetutil.TextInfo = <any>SheetUtil.getTextInfo(tabID);
						var chatUnit:com.txjy.s01.model.social.ChatUnit;
						if(textInfo)
						{
							var str:string = <any>textInfo["content"];
							if((flash.As3is(args[0],Array)) && (flash.As3is(args[1],Array)))
							{
								var si:number = flash.checkInt(0);
								var sidx:number = flash.checkInt(str.indexOf("{" + si + "}"));
								while(sidx != -1)
								{
									if(str.substr(sidx - 2,2) == com.txjy.s01.utils.StrParseUtil.PLYAER + "|" || str.substr(sidx - 3,3) == com.txjy.s01.utils.StrParseUtil.UNITNAME + "|")
									{
										args[0].splice(si,0,args[1].shift());
									}
									sidx = flash.checkInt(str.indexOf("{" + (++si) + "}"));
								}
								args[0] = args[0].concat(args[1]);
								args.pop();
								args = args[0];
							}
							else if((flash.As3is(args[0],Array)) && args.length == 1)
							{
								args = args[0];
							}
							if(textInfo["type"] == 1)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								com.txjy.s01.utils.UIUtil.pushBubText(str);
							}
							else if(textInfo["type"] == 2)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								return Alert.show(str,callBack);
							}
							else if(textInfo["type"] == 3)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								if(com.txjy.s01.utils.CommonUtil.hintNoTipDic.getItem(tabID))
								{
									callBack(Alert.OK);
								}
								else
								{
									return Alert.show(str,onHintAlertCallBackNoTip,true,Alert.OK | Alert.CANCEL | Alert.NO_TIP);
									function onHintAlertCallBackNoTip (type:number,noTipSelect:boolean)
									{
										callBack(type);
										if(noTipSelect)
											com.txjy.s01.utils.CommonUtil.hintNoTipDic.setItem(tabID,true);
									};
								}
							}
							else if(textInfo["type"] == 4)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args,false);
								if(SysCommon.getInstance().getNewStoryState() == StoryDef.NEW_STORY_STATE_ALL_END)
									com.txjy.s01.utils.UIUtil.pushLampText(str);
							}
							else if(textInfo["type"] == 5)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								chatUnit = new ChatUnit();
								chatUnit["channel"] = SocialDef.CHANNEL_RUMOR;
								chatUnit["showChannel"] = SocialDef.CHANNEL_WORLD;
								chatUnit["content"] = str;
								chatUnit["chatFormat"] = SocialDef.FORMAT2;
								SysSocial.getInstance().clientAddChatUnit(chatUnit);
							}
							else if(textInfo["type"] == 6)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								return Alert.show(str,onHintAlertCallBack,true,Alert.OK | Alert.CANCEL);
								function onHintAlertCallBack (type:number)
								{
									callBack(type);
								};
							}
							else if(textInfo["type"] == 9)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								chatUnit = new ChatUnit();
								chatUnit["channel"] = SocialDef.CHANNEL_SYS;
								chatUnit["showChannel"] = SocialDef.CHANNEL_SYS;
								chatUnit["content"] = str;
								chatUnit["chatFormat"] = SocialDef.FORMAT2;
								SysSocial.getInstance().clientAddChatUnit(chatUnit);
							}
							else if(textInfo["type"] == 10)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								com.txjy.s01.utils.UIUtil.pushBub2Text(com.txjy.s01.utils.UIUtil.BC_TYPE_OTHER,[str]);
							}
							else if(textInfo["type"] == 11)
							{
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args,false);
								if(SysCommon.getInstance().getNewStoryState() == StoryDef.NEW_STORY_STATE_ALL_END)
									com.txjy.s01.utils.UIUtil.pushLampText(str);
								str = com.txjy.s01.utils.CommonUtil.parseNoticToHtmlStr(textInfo,args);
								chatUnit = new ChatUnit();
								chatUnit["channel"] = SocialDef.CHANNEL_RUMOR;
								chatUnit["showChannel"] = SocialDef.CHANNEL_WORLD;
								chatUnit["content"] = str;
								chatUnit["chatFormat"] = SocialDef.FORMAT2;
								SysSocial.getInstance().clientAddChatUnit(chatUnit);
							}
						}
						return -1;
					}

					public static parseNoticToHtmlStr(textInfo:sheetutil.TextInfo,args:any,needLink:boolean = true):string
					{
						var _arguments__ = [];
						for(var _arguments__key in arguments)
						{
							_arguments__ = arguments[_arguments__key];
						}
						var str:string = <any>textInfo["content"];
						if(needLink)
						{
							str = StringUtil.substitute(str,args);
							str = str.replace(com.txjy.s01.utils.StrParseUtil.REPLACER_REGEXP,function ():string
							{
								return com.txjy.s01.utils.StrParseUtil.parsePlayerNotice(_arguments__[0]);
							});
							str = str.replace(new RegExp("{","g"),"");
							str = str.replace(new RegExp("}","g"),"");
							if(SystemConfig.IS_LOCAL_TEST)
								str += "(" + textInfo["tabID"] + ")";
							return str;
						}
						else
						{
							str = StringUtil.substitute(str,args);
							str = str.replace(com.txjy.s01.utils.StrParseUtil.REPLACER_REGEXP,function ():string
							{
								return com.txjy.s01.utils.StrParseUtil.parsePlayerNoticeNoLink(_arguments__[0]);
							});
							str = str.replace(new RegExp("{","g"),"");
							str = str.replace(new RegExp("}","g"),"");
							if(SystemConfig.IS_LOCAL_TEST)
								str += "(" + textInfo["tabID"] + ")";
							return str;
						}
					}

					public static payNoTipDic:flash.Dictionary;
					public static showPayBox(payType:number,common:number,callBack:Function,...args)
					{
						payType = flash.checkInt(payType);

						common = flash.checkInt(common);

						var payInfo:sheetutil.PayInfo = <any>SysCommon.getInstance().getPayInfo(payType,common);
						var attrInfo:sheetutil.AttrIndexInfo = <any>SysGeneral.getInstance().getAttrIndexInfoByStr(payInfo["payAttr1"]);
						var cost:number = flash.checkInt(com.txjy.s01.utils.CommonUtil.getPayCost(payType,common,args[0]));
						var noTipFlag:number = flash.checkInt(payInfo["noTipFlag"]);
						if(noTipFlag == 0)
							noTipFlag = flash.checkInt(payType);
						if(com.txjy.s01.utils.CommonUtil.payNoTipDic.getItem(noTipFlag))
						{
							if(attrInfo["tabID"] == GeneralDef.ENUM_PLAYER_RMB && cost > SysGeneral.getInstance().mainPlayer.rmb)
								com.txjy.s01.utils.CommonUtil.showHint(1122);
							else if(attrInfo["tabID"] == GeneralDef.ENUM_PLAYER_GOLD && cost > SysGeneral.getInstance().mainPlayer.gold)
								com.txjy.s01.utils.CommonUtil.showHint(1001);
							else
								callBack();
						}
						else
						{
							var str:string = <any>payInfo["desc"];
							args[0] = cost;
							str = StringUtil.substitute(str,args);
							Alert.show(str,onPayAlertCallBack,true,Alert.OK | Alert.CANCEL | Alert.NO_TIP);
							function onPayAlertCallBack (type:number,noTipSelect:boolean)
							{
								if(type == Alert.OK)
								{
									if(attrInfo["tabID"] == GeneralDef.ENUM_PLAYER_RMB && cost > SysGeneral.getInstance().mainPlayer.rmb)
										com.txjy.s01.utils.CommonUtil.showHint(1122);
									else if(attrInfo["tabID"] == GeneralDef.ENUM_PLAYER_GOLD && cost > SysGeneral.getInstance().mainPlayer.gold)
										com.txjy.s01.utils.CommonUtil.showHint(1001);
									else
										callBack();
								}
								if(noTipSelect)
									com.txjy.s01.utils.CommonUtil.payNoTipDic.setItem(noTipFlag,true);
							};
						}
					}

					public static getPayCost(payType:number,common:number,param:number):number
					{
						payType = flash.checkInt(payType);

						common = flash.checkInt(common);

						param = flash.checkInt(param);

						var payInfo:sheetutil.PayInfo = <any>SysCommon.getInstance().getPayInfo(payType,common);
						var cost:number = flash.checkInt(payInfo["payAttrNum1"]);
						if(payInfo["type"] == CommonDef.PAY_TYPE_ARENA_COUNT)
						{
							var addTime:number = flash.checkInt(param);
							cost = flash.checkInt((addTime + 1) * cost);
						}
						else if(payInfo["type"] == CommonDef.PAY_TYPE_ARENA_CD || payInfo["type"] == CommonDef.PAY_TYPE_CAMPAIGN_HOOK_TIME || payInfo["type"] == CommonDef.PAY_TYPE_CLEAR_ROB_CD || payInfo["type"] == CommonDef.PAY_TYPE_STREN_ROB_CD || payInfo["type"] == CommonDef.PAY_TYPE_LOSER_CD || payInfo["type"] == CommonDef.PAY_TYPE_OLDBATTLEFIELD_CD_TIME)
						{
							var cdTime:number = flash.checkInt(param);
							cost = flash.checkInt(Math.ceil(cdTime / 60) * cost);
						}
						else if(payInfo["type"] == CommonDef.PAY_TYPE_FASTWORK_CAMPAIGN_OVER)
						{
							var workTime:number = flash.checkInt(param);
							cost = flash.checkInt(Math.ceil(workTime / 600) * cost);
						}
						else if(payInfo["type"] == CommonDef.PAY_TYPE_FRIEND_GOODLUCK)
						{
							var payWishInfo:sheetutil.PayInfo = <any>SysCommon.getInstance().getPayInfo(CommonDef.PAY_TYPE_FRIEND_GOODLUCK,1);
							cost = flash.checkInt(param * payWishInfo["payAttrNum1"]);
						}
						else if(payInfo["type"] == CommonDef.PAY_TYPE_ADD_CAMPAIGN_NUM)
						{
							var payAddCampaignInfo:sheetutil.PayInfo = <any>SysCommon.getInstance().getPayInfo(CommonDef.PAY_TYPE_ADD_CAMPAIGN_NUM,2);
							cost = flash.checkInt(cost + param * payAddCampaignInfo["payAttrNum1"]);
						}
						else if(payInfo["type"] == CommonDef.PAY_TYPE_DUPLICATE_HOOK_SPEEDUP)
						{
							var hookTime:number = flash.checkInt(param);
							cost = flash.checkInt(Math.ceil(hookTime / 60) * cost);
						}
						return cost;
					}

					public static showRewardBc2(attrs:Array<any> = null,items:Array<any> = null,title:string = null,reason:number = -99,type:number = -1)
					{
						SysEffect.getInstance().playEffect(EffectDef.EFFECT_TYPE_BC1,true,new AwardBCEffect(EffectDef.EFFECT_TYPE_BC1,com.txjy.s01.utils.CommonUtil.getRwardBcHTMLStrArr(attrs,items,title,reason,type)));
					}

					public static getRwardBcHTMLStrArr(attrs:Array<any> = null,items:Array<any> = null,title:string = null,reason:number = -99,type:number = -1,size:number = 24,hasBold:boolean = true):Array<any>
					{
						var strs:Array<any> = [];
						var str:string;
						var arenaItem:com.txjy.s01.model.item.Item;
						var item:com.txjy.s01.model.item.Item;
						if(reason >= 0 && SystemConfig.IS_LOCAL_TEST)
							strs.push("来源：" + reason);
						if(title)
							strs.push(title);
						if(attrs)
						{
							for(var attr_key_a in attrs)
							{
								var attr:com.txjy.s01.model.general.Attr = attrs[attr_key_a];
								if(attr)
								{
									var attrColor:string = '#02fc12';
									if(attr["info"].itemID != 0)
									{
										var itemInfo:sheetnoutil.ItemInfo = <any>SheetUtil.getItemInfo(attr["info"].itemID);
										attrColor = com.txjy.s01.utils.CssUtil.getStyle("quality_" + itemInfo["quality"])["color"];
									}
									if(hasBold)
										str = "<b><font size='" + size + "' color='" + attrColor + "'>" + attr["info"].name + " </font><font size='" + size + "' color='#ffde00'>×" + attr["value"] + "</font></b>";
									else
										str = "<font size='" + size + "' color='" + attrColor + "'>" + attr["info"].name + " </font><font size='" + size + "' color='#ffde00'>×" + attr["value"] + "</font>";
									strs.push(str);
								}
							}
						}
						if(type == 7 && items.length >= 1)
							arenaItem = items.pop();
						if(items)
						{
							var item_key_a;
							for(item_key_a in items)
							{
								item = items[item_key_a];
								if(item)
								{
									if(item["bigType"] == ItemDef.ITEM_BIG_TYPE_GENERAL)
									{
										if(hasBold)
											str = "<b><font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + item["info"].quality)["color"] + "'>" + item["info"].name + " </font><font size='" + size + "' color='#ffde00'> 加入队伍</font></b>";
										else
											str = "<font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + item["info"].quality)["color"] + "'>" + item["info"].name + " </font><font size='" + size + "' color='#ffde00'> 加入队伍</font>";
									}
									else if(item["bigType"] == ItemDef.ITEM_BIG_TYPE_PETS)
									{
										if(hasBold)
											str = "<b><font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + item["info"].quality)["color"] + "'>" + item["info"].name + " </font><font size='" + size + "' color='#ffde00'>(" + com.txjy.s01.utils.CommonUtil.formatTime(item["num"],"h小时") + ")</font></b>";
										else
											str = "<font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + item["info"].quality)["color"] + "'>" + item["info"].name + " </font><font size='" + size + "' color='#ffde00'>(" + com.txjy.s01.utils.CommonUtil.formatTime(item["num"],"h小时") + ")</font>";
									}
									else
									{
										if(hasBold)
											str = "<b><font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + item["info"].quality)["color"] + "'>" + item["info"].name + " </font><font size='" + size + "' color='#ffde00'>×" + item["num"] + "</font></b>";
										else
											str = "<font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + item["info"].quality)["color"] + "'>" + item["info"].name + " </font><font size='" + size + "' color='#ffde00'>×" + item["num"] + "</font>";
									}
									strs.push(str);
								}
							}
						}
						if(arenaItem)
						{
							strs.push("<b>战利品</b>");
							if(hasBold)
								str = "<b><font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + arenaItem["info"].quality)["color"] + "'>" + arenaItem["info"].name + " </font><font size='" + size + "' color='#ffde00'>×" + arenaItem["num"] + "</font></b>";
							else
								str = "<font size='" + size + "' color='" + com.txjy.s01.utils.CssUtil.getStyle("quality_" + arenaItem["info"].quality)["color"] + "'>" + arenaItem["info"].name + " </font><font size='" + size + "' color='#ffde00'>×" + arenaItem["num"] + "</font>";
							strs.push(str);
						}
						return strs;
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.CommonUtil.hintNoTipDic = new flash.Dictionary();
com.txjy.s01.utils.CommonUtil.payNoTipDic = new flash.Dictionary();
