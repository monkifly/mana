module mana {
	export module utils {
		export class InstanceCacheUtil extends egret.HashObject {

			public static cacheList:Array<any>;
			public static recycleInstance(classRefer:any,instance:any,maxNum:number)
			{
				maxNum = flash.checkInt(maxNum);

				if(<any>!(flash.As3is(instance,null,"classRefer")))
				{
					throw new flash.Error("instance: " + instance + " Class: " + classRefer).message;
					return ;
				}
				if(<any>!mana.utils.InstanceCacheUtil.cacheList[classRefer])
				{
					mana.utils.InstanceCacheUtil.cacheList[classRefer] = new Array();
				}
				var instances:Array<any> = <any>mana.utils.InstanceCacheUtil.cacheList[classRefer];
				if(instances.length < maxNum)
				{
					instances.push(instance);
				}
			}

			public static createInstance(classRefer:any):any
			{
				if(<any>!mana.utils.InstanceCacheUtil.cacheList[classRefer])
				{
					return new classRefer();
				}
				var instances:Array<any> = <any>mana.utils.InstanceCacheUtil.cacheList[classRefer];
				if(instances.length > 0)
				{
					return instances.shift();
				}
				return new classRefer();
			}

		}
	}
}

mana.utils.InstanceCacheUtil.cacheList = new Array();
