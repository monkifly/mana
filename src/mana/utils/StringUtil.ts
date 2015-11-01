module mana {
	export module utils {
		export class StringUtil extends egret.HashObject {

			public static NEWLINE_TOKENS:Array<any>;
			public static WHITESPACE_TOKENS:Array<any>;
			public static replaceStr(content:string,reg:string,replacer:string):string
			{
				var myPattern:RegExp = new RegExp(reg,"g");
				return content.replace(myPattern,replacer);
			}

			public static substitute(str:string,...rest):string
			{
				if(str == null)
					return '';
				var len:number = flash.checkUint(rest.length);
				var args:Array<any>;
				if(len == 1 && flash.As3is(rest[0],Array))
				{
					args = </*Array*/any>flash.As3As(rest[0],Array);
					len = flash.checkUint(args.length);
				}
				else
				{
					args = rest;
				}
				for(var i:number = flash.checkInt(0);i < len; i++)
				{
					str = str.replace(new RegExp("\\{" + i + "\\}","g"),args[i]);
				}
				return str;
			}

			public static count(haystack:string,needle:string,offset:number = 0,length:number = 0):number
			{
				if(length === 0)
					length = haystack.length;
				var result:number = <any>0;
				haystack = haystack.slice(offset,length);
				while(haystack.length > 0 && haystack.indexOf(needle) != -1)
				{
					haystack = haystack.slice((haystack.indexOf(needle) + needle.length));
					result++;
				}
				return result;
			}

			public static trim(str:string,charList:Array<any> = null):string
			{
				var list:Array<any>;
				if(charList)
				{
					list = charList;
				}
				else
				{
					list = mana.utils.StringUtil.WHITESPACE_TOKENS.concat(mana.utils.StringUtil.NEWLINE_TOKENS);
				}
				str = mana.utils.StringUtil.trimLeft(str,list);
				str = mana.utils.StringUtil.trimRight(str,list);
				return str;
			}

			public static trimLeft(str:string,charList:Array<any> = null):string
			{
				var list:Array<any>;
				if(charList)
					list = charList;
				else
					list = mana.utils.StringUtil.WHITESPACE_TOKENS.concat(mana.utils.StringUtil.NEWLINE_TOKENS);
				while(list.toString().indexOf(str.substr(0,1)) > -1 && str.length > 0)
				{
					str = str.substr(1);
				}
				return str;
			}

			public static trimRight(str:string,charList:Array<any> = null):string
			{
				var list:Array<any>;
				if(charList)
					list = charList;
				else
					list = mana.utils.StringUtil.WHITESPACE_TOKENS.concat(mana.utils.StringUtil.NEWLINE_TOKENS);
				while(list.toString().indexOf(str.substr(str.length - 1)) > -1 && str.length > 0)
				{
					str = str.substr(0,str.length - 1);
				}
				return str;
			}

			public static getByteLength(str:string):number
			{
				if(<any>!str || str == "")
					return 0;
				var ba:flash.ByteArray = new flash.ByteArray();
				ba.endian = flash.Endian.LITTLE_ENDIAN;
				ba.writeMultiByte(str,"gb2312");
				return ba.length;
			}

		}
	}
}

mana.utils.StringUtil.NEWLINE_TOKENS = new Array('\n','\r');
mana.utils.StringUtil.WHITESPACE_TOKENS = new Array(' ','\t');
