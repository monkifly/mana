module mana {
	export module utils {
		export class CommonUtil extends BaseUtil {

			public formatTime(second:number,format:string = "hh:mm:ss"):string
			{
				format = format.toLocaleLowerCase();
				var hour:number = 0;
				var min:number = 0;
				var sec:number = 0;
				if(format.indexOf("h") != -1)
				{
					hour = Math.floor(second / 3600);
                    min = Math.floor((second - hour * 3600) / 60);
                    sec = second % 60;
				}
				else
				{
					if(format.indexOf("m") != -1)
					{
                        min = Math.floor(second / 60);
                        sec = Math.floor(second % 60);
					}
					else
					{
						sec = second;
					}
				}
                var str: string = format;
				if(format.indexOf("hh") != -1)
					str = str.replace("hh", (hour > 9?hour:"0" + hour).toString());
				else if(format.indexOf("h") != -1)
					str = str.replace("h",hour.toString());
				if(format.indexOf("mm") != -1)
                    str = str.replace("mm",(min > 9 ? min : "0" + min).toString());
				else if(format.indexOf("m") != -1)
					str = str.replace("m",min.toString());
				if(format.indexOf("ss") != -1)
                    str = str.replace("ss",(sec > 9 ? sec : "0" + sec).toString());
				else if(format.indexOf("s") != -1)
					str = str.replace("s",sec.toString());
				return str;
			}

			public formatDate(timeOrDate:any,format:string = "yyyy/nn/dd hh:mm:ss"):string
			{
				var date:Date;
				var str:string = format;
                if(egret.is(timeOrDate,"Date"))
				{
					date = timeOrDate;
				}
				else
				{
                    date = new Date(timeOrDate);
				}
				var yearStr:string = date.getFullYear().toString();
                var month:number = date.getMonth();
                var dateD: number = date.getDate();
                var hours: number = date.getHours();
                var minutes: number = date.getMinutes();
                var seconds: number = date.getSeconds();
				if(format.indexOf("yyyy") != -1)
					str = str.replace("yyyy",yearStr);
				else if(format.indexOf("yy") != -1)
					str = str.replace("yy",yearStr.substr(yearStr.length - 2,2));
				if(format.indexOf("nn") != -1)
					str = str.replace("nn",(month + 1 > 9?month + 1:"0" + (month + 1)).toString());
				else if(format.indexOf("n") != -1)
					str = str.replace("n",(month + 1).toString());
				if(format.indexOf("dd") != -1)
                    str = str.replace("dd",(dateD > 9 ? dateD : "0" + dateD).toString());
				else if(format.indexOf("d") != -1)
                    str = str.replace("d",dateD.toString());
				if(format.indexOf("hh") != -1)
                    str = str.replace("hh",(hours > 9 ? hours : "0" + hours).toString());
				else if(format.indexOf("h") != -1)
					str = str.replace("h",hours.toString());
				if(format.indexOf("mm") != -1)
                    str = str.replace("mm",(minutes > 9 ? minutes : "0" + minutes).toString());
				else if(format.indexOf("m") != -1)
					str = str.replace("m",minutes.toString());
				if(format.indexOf("ss") != -1)
                    str = str.replace("ss",(seconds > 9 ? seconds : "0" + seconds).toString());
				else if(format.indexOf("s") != -1)
					str = str.replace("s",seconds.toString());
				return str;
			}

			public getBitValue(value:number,fromBit:number = 0,toBit:number = 31):number
			{
				return toBit - fromBit + 1 < 32?(value >>> fromBit) & ((1 << (toBit - fromBit + 1)) - 1):value;
			}

			public getBitValueByLen(value:number,fromBit:number = 0,len:number = 32):number
			{
				return len < 32?(value >>> fromBit) & ((1 << len) - 1):value;
			}

			public getRotation(fX:number,fY:number,tX:number,tY:number):number
			{
				var rotation:number = 0;
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

