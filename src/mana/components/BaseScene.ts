module mana.comp {
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseScene extends BaseComponent{
        private _sceneID: number;
        public get sceneID(): number {
            return this._sceneID;
        }
        constructor(sceneID: number) {
            super();
            this._sceneID = sceneID;
        }

        public createChildren() {
            super.createChildren();
            this.enterScene();
        }

        public enterScene(): void {
        }
        public exitScene(): void {

        }
        public destroy(): void {

        }
	}
}
