module mana.utils {
	export class MathUtil extends BaseUtil{
        /**
         * 返回区间[0, maxNum)的整数*/
		public randomInt(maxNum:number):number{
            return Math.floor(Math.random() * maxNum);
		}
		
		/**
         * 返回区间[minNum, maxNum]的整数*/
        public randomIntBetween(minNum:number, maxNum: number): number {
            return minNum + this.randomInt(maxNum - minNum+1);
        }
	}
}
