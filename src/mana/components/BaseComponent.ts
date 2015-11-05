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

        public childrenCreated() {
            super.childrenCreated();
            this.isChildrenCreated = true;
        }
        
        protected partAdded(name:string, instance:any) {
            super.partAdded(name,instance);
            if(this[name+"Tap"]){
                instance.addEventListener(egret.TouchEvent.TOUCH_TAP,this[name + "Tap"],this);
            }
        }

        protected onEnter(): void {

        }
        protected onExit(): void {

        }
	}
}
