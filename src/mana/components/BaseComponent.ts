module mana.comp {
	/**
	 *
	 * @author 
	 *
	 */
    export class BaseComponent extends eui.Component {
        public isChildrenCreated: Boolean;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onEnter,this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onExit,this);
        }

        public createChildren() {
            super.createChildren();
            this.isChildrenCreated = true;
        }

        protected onEnter(): void {

        }
        protected onExit(): void {

        }
	}
}
