module mana.utils {
    export class StyleUtil extends BaseUtil{
        private styleUnits: any = {};
        constructor() {
            super();
        }

        public setStyleUnit(key:number, color: number,size: number = NaN){
            var su: StyleUnit = new StyleUnit();
            su.color = color;
            su.size = size;
            this.styleUnits[key] = su;
		}
		
		public getStyleUnit(key:number):StyleUnit{
            return this.styleUnits[key];
		}
		
	}
	
	export class StyleUnit{
        public color: number;
        public size: number;
	}
}


