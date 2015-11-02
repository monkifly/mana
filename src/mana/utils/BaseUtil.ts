module mana.utils {
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseUtil {
        private static _instanceDictionary: any = {};

        public constructor() {
            var className: string = egret.getQualifiedClassName(this);

            if(BaseUtil._instanceDictionary[className] != null)
                throw new Error(className + " is single instance!!!");
            else
                BaseUtil._instanceDictionary[className] = this;
        }

        public static getInstance(...args: any[]) {
            var className: string = egret.getQualifiedClassName(this);
            if(BaseUtil._instanceDictionary[className] != null)
                return BaseUtil._instanceDictionary[className];

            var Class: any = this;
            var instance: any = new Class();
            BaseUtil._instanceDictionary[className] = instance;
            return instance;
        }
	}
}
