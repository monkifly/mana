module mana {
	export module utils {
		export class StringUtil extends BaseUtil {
            public NEWLINE_TOKENS: Array<any> = new Array('\n','\r');
            public WHITESPACE_TOKENS: Array<any> = new Array(' ','\t');
			public replaceStr(content:string,reg:string,replacer:string):string
			{
				var myPattern:RegExp = new RegExp(reg,"g");
				return content.replace(myPattern,replacer);
			}

			public substitute(str:string,...rest):string
			{
				if(str == null)
					return '';
				var len:number = rest.length;
				var args:Array<any>;
                if(len == 1 && rest[0] instanceof Array)
				{
					args = rest[0]
					len = args.length;
				}
				else
				{
					args = rest;
				}
				for(var i:number = 0;i < len; i++)
				{
					str = str.replace(new RegExp("\\{" + i + "\\}","g"),args[i]);
				}
				return str;
			}

			public count(haystack:string,needle:string,offset:number = 0,length:number = 0):number
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

			public trim(str:string,charList:Array<any> = null):string
			{
				var list:Array<any>;
				if(charList)
				{
					list = charList;
				}
				else
				{
					list = this.WHITESPACE_TOKENS.concat(this.NEWLINE_TOKENS);
				}
				str = this.trimLeft(str,list);
				str = this.trimRight(str,list);
				return str;
			}

			public trimLeft(str:string,charList:Array<any> = null):string
			{
				var list:Array<any>;
				if(charList)
					list = charList;
				else
					list = this.WHITESPACE_TOKENS.concat(this.NEWLINE_TOKENS);
				while(list.toString().indexOf(str.substr(0,1)) > -1 && str.length > 0)
				{
					str = str.substr(1);
				}
				return str;
			}

			public trimRight(str:string,charList:Array<any> = null):string
			{
				var list:Array<any>;
				if(charList)
					list = charList;
				else
					list = this.WHITESPACE_TOKENS.concat(this.NEWLINE_TOKENS);
				while(list.toString().indexOf(str.substr(str.length - 1)) > -1 && str.length > 0)
				{
					str = str.substr(0,str.length - 1);
				}
				return str;
			}

//			public getByteLength(str:string):number
//			{
//				if(<any>!str || str == "")
//					return 0;
//				var ba:egret.ByteArray = new egret.ByteArray();
//				ba.endian = egret.Endian.LITTLE_ENDIAN;
//				ba.writeMultiByte(str,"gb2312");
//				return ba.length;
//			}

		}
	}
}
