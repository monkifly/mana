module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class CssUtil extends egret.HashObject {

					public static FORMAT:string;
					public static GLOBAL_FORMAT:string;
					public static styleSheet:flash.text.StyleSheet;
					public static HTML_FORMAT_0:string;
					public static HTML_FORMAT_1:string;
					public static HTML_FORMAT_2:string;
					public static HTML_FORMAT_3:string;
					public static HTML_FORMAT_4:string;
					public static HTML_FORMAT_5:string;
					public static getStyHtml(...arg):string
					{
						var reStr:string = "";
						var arr:Array<any> = </*Array*/any>flash.As3As(arg,Array);
						if(arr == null)
							return reStr;
						while(arr.length > 0)
						{
							reStr += StringUtil.substitute(com.txjy.s01.utils.CssUtil.FORMAT.concat(),arr.shift(),arr.shift());
						}
						return reStr;
					}

					public static addGlobalHtml(value:string,globalName:string = "gameglobal"):string
					{
						return StringUtil.substitute(com.txjy.s01.utils.CssUtil.GLOBAL_FORMAT.concat(),globalName,value);
					}

					public static getStyle(name:string):any
					{
						return com.txjy.s01.utils.CssUtil.styleSheet["getStyle"](name);
					}

					public static htmlColorToColor16(colorValue:string):number
					{
						if(colorValue != null)
						{
							colorValue = colorValue.slice(1,colorValue.length);
							return flash.tranint(colorValue,16);
						}
						console.log("Error:fail htmlColorToColor16!!!");
						if(SystemConfig.IS_LOCAL_TEST)
							return 0x000000;
						return 0xffffff;
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.CssUtil.FORMAT = "<span class='{0}'>{1}</span>";
com.txjy.s01.utils.CssUtil.GLOBAL_FORMAT = "<{0}>{1}</{0}>";
com.txjy.s01.utils.CssUtil.styleSheet = new StyleSheet();
com.txjy.s01.utils.CssUtil.HTML_FORMAT_0 = "<font color='{0}'>{1}</font>";
com.txjy.s01.utils.CssUtil.HTML_FORMAT_1 = "<font size='{0}' color='{1}'>{2}</font>";
com.txjy.s01.utils.CssUtil.HTML_FORMAT_2 = "<a href='event:{0}'><font color='{1}'><u>{2}</u></font></a>";
com.txjy.s01.utils.CssUtil.HTML_FORMAT_3 = "<a href='event:{0}'><u>{1}</u></a>";
com.txjy.s01.utils.CssUtil.HTML_FORMAT_4 = "<b>{0}</b>";
com.txjy.s01.utils.CssUtil.HTML_FORMAT_5 = "<font size='{0}'>{1}</font>";
