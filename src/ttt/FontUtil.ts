module com {
	export module txjy {
		export module s01 {
			export module utils {
				export class FontUtil extends egret.HashObject {

					public static _isInit:boolean = false;
					public static _loaderAssist:mana.loader.LoaderAssist;
					public static _eventDispatcher:egret.EventDispatcher;
					public static _className:string;
					public static _fontDic:flash.Dictionary;
					public static initUtil(version:string,className:string)
					{
						com.txjy.s01.utils.FontUtil.setVersion(version);
						com.txjy.s01.utils.FontUtil._className = className;
						if(<any>!com.txjy.s01.utils.FontUtil._isInit)
						{
							com.txjy.s01.utils.FontUtil._isInit = true;
							com.txjy.s01.utils.FontUtil._loaderAssist["addEventListener"](LoaderEvent.MISSION_COMPLETE,com.txjy.s01.utils.FontUtil.onMissionComplete);
						}
					}

					public static addEventListener(type:string,listener:Function,useCapture:boolean = false,priority:number = 0,useWeakReference:boolean = false)
					{
						com.txjy.s01.utils.FontUtil._eventDispatcher.addEventListener(type,listener,null,useCapture,priority);
					}

					public static setVersion(version:string)
					{
						com.txjy.s01.utils.FontUtil._loaderAssist["version"] = version;
					}

					public static loadFontFile(key:string,url:string,version:string = null)
					{
						if(<any>!com.txjy.s01.utils.FontUtil._fontDic.getItem(url))
							com.txjy.s01.utils.FontUtil._loaderAssist["loadMission"](new LoaderMission(url,version,key,0,0,new flash.ApplicationDomain(flash.ApplicationDomain.currentDomain)));
						else
							com.txjy.s01.utils.FontUtil._eventDispatcher.dispatchEvent(new CusEvent(key));
					}

					private static onMissionComplete(event:mana.loader.LoaderEvent)
					{
						com.txjy.s01.utils.FontUtil._fontDic.setItem(event["mission"].path,event["mission"].path);
						try 
						{
							flash.Font["registerFont"](<any>event["mission"].applicationDomain.getDefinition(com.txjy.s01.utils.FontUtil._className));
						}
						catch(e)
						{}
						com.txjy.s01.utils.FontUtil._eventDispatcher.dispatchEvent(new CusEvent(event["mission"].data));
					}

				}
			}
		}
	}
}

com.txjy.s01.utils.FontUtil._loaderAssist = LoaderManager.getInstance().createLoaderAssist("FontUtil.loaderAssist");
com.txjy.s01.utils.FontUtil._eventDispatcher = new egret.EventDispatcher();
com.txjy.s01.utils.FontUtil._fontDic = new flash.Dictionary();
