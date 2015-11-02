/**
 *
 * @author 
 *
 */
module game{
    export class SysTest extends mana.core.SysManager {
        public constructor() {
            super();
        }

        protected onSecond(): void {
            super.onSecond();
            console.log("one second pass");
            console.log(egret.getTimer());
        }
    }
    export var sysTest: SysTest = SysTest.getInstance();
}

