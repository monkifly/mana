module mana {

    export class Singleton extends BaseModel {
        private static _instanceDictionary: any = {};
	
        public constructor() {
            super();
        		var className:string = egret.getQualifiedClassName(this);
        		
        		if(Singleton._instanceDictionary[className] != null)
        			throw new Error(className+" is single instance!!!");
        		else
        			Singleton._instanceDictionary[className] = this;
        }

        public static getInstance(...args: any[]) {
            var className:string = egret.getQualifiedClassName(this);
            if(Singleton._instanceDictionary[className] != null)
        			return Singleton._instanceDictionary[className];
        			
        		var instance:any = this.create.apply(this,arguments);
        		Singleton._instanceDictionary[className] = instance;
        		return instance;
        }
	
    	public destroyInstance():void{
    		var className:string = egret.getQualifiedClassName(this);
    		
    		delete Singleton._instanceDictionary[className];
    	}
    }
}