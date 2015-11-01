module mana {
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

			public static formatDate(timeOrDate:any,format:string = "yyyy/nn/dd hh:mm:ss"):string
			{
				var date:flash.As3Date;
				var str:string = format;
				if(flash.As3is(timeOrDate,flash.As3Date))
				{
					date = timeOrDate;
				}
				else
				{
					date = new flash.As3Date(timeOrDate);
				}
				var yearStr:string = flash.String(date.fullYear);
				if(format.indexOf("yyyy") != -1)
					str = str.replace("yyyy",yearStr);
				else if(format.indexOf("yy") != -1)
					str = str.replace("yy",yearStr.substr(yearStr.length - 2,2));
				if(format.indexOf("nn") != -1)
					str = str.replace("nn",flash.String(date.month + 1 > 9?date.month + 1:"0" + (date.month + 1)));
				else if(format.indexOf("n") != -1)
					str = str.replace("n",(date.month + 1).toString());
				if(format.indexOf("dd") != -1)
					str = str.replace("dd",flash.String(date.date > 9?date.date:"0" + date.date));
				else if(format.indexOf("d") != -1)
					str = str.replace("d",date.date.toString());
				if(format.indexOf("hh") != -1)
					str = str.replace("hh",flash.String(date.hours > 9?date.hours:"0" + date.hours));
				else if(format.indexOf("h") != -1)
					str = str.replace("h",date.hours.toString());
				if(format.indexOf("mm") != -1)
					str = str.replace("mm",flash.String(date.minutes > 9?date.minutes:"0" + date.minutes));
				else if(format.indexOf("m") != -1)
					str = str.replace("m",date.minutes.toString());
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

			public static getRotation(fX:number,fY:number,tX:number,tY:number):number
			{
				var rotation:number = <any>0;
				var dx:number = tX - fX;
				var dy:number = tY - fY;
				var d:number = Math.sqrt(dx * dx + dy * dy);
				var cos:number = dx / d;
				var acos:number = Math.acos(cos);
				rotation = acos * 180 / Math.PI;
				return rotation;
			}

		}
	}
}

