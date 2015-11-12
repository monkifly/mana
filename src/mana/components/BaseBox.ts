module mana.comp {
	export class BaseBox extends BaseComponent{
        protected _triggerType: number = 0;
        protected _modalMC: egret.Sprite;
        protected _isModal: boolean = false;
        protected _modalAlpha: number = 0.5;
        protected _closeButton: eui.Button;
        public data: any;
        public autoCloseByOther: boolean;

        public constructor(isModalPm: boolean = false,modalAlphaPm: number = 0.5) {
            super();
            this._isModal = isModalPm;
            this._modalAlpha = modalAlphaPm;
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemovedFromStage,this);
        }

        protected partAdded(name: string,instance: any) {
            super.partAdded(name,instance);
            // 设置默认的关闭按键
            if(name == "panel") {
                if(this[name]["btnClose"]){
                    this[name]["btnClose"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTap,this);
                }
            }else if(name == "btnClose"){
                this[name].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTap,this);
            }
        }
        public get modalAlpha(): number {
            return this._modalAlpha;
        }

        public set modalAlpha(value: number) {
            this._modalAlpha = value;
            if(this._isModal && this.stage)
                this.createModalMC();
        }

        public get triggerType(): number {
            return this._triggerType;
        }

        public set triggerType(value: number) {
            this._triggerType = value;
        }

        public get isModal(): boolean {
            return this._isModal;
        }

        public set isModal(value: boolean) {
            this._isModal = value;
            if(this._isModal && this.stage)
                this.createModalMC();
        }

        public get isShowed(): boolean {
            return this.stage != null;
        }

        public open(boxParent: egret.DisplayObjectContainer) {
            if(boxParent) {
                boxParent.addChild(this);
                this.exeOpenEffect();
                this.dispatchEvent(new mana.event.CompEvent(mana.event.CompEvent.BOX_OPENED));
            }
        }

        /**需要关闭特效请用closeUseEffect方法*/
        public close(): boolean {
            if(this.parent) {
                this.parent.removeChild(this);
                this.dispatchEvent(new mana.event.CompEvent(mana.event.CompEvent.BOX_CLOSED));
                return true;
            }
            return false;
        }
        
        public closeUseEffect():boolean{
            if(this.parent) {
                this.exeCloseEffect();
                return true;
            }
            return false;
        }
        
        protected exeOpenEffect():void{
            this.alpha = 0.5;
            egret.Tween.get(this).to({alpha:1},250);
        }
        /**如果子类不需要关闭效果可以覆盖此方法，方法中直接调用this.close();*/
        protected exeCloseEffect(): void {
            egret.Tween.get(this).to({ alpha: 0.5 },250).call(function(): void {
                this.close();
            },this);
        }

        protected createModalMC() {
            if(!this._modalMC) {
                this._modalMC = new egret.Sprite();
                this._modalMC.touchEnabled = true;
            }
            var layerUtil: mana.utils.LayerUtil = mana.utils.LayerUtil.getInstance();
            this._modalMC.graphics.clear();
            this._modalMC.graphics.beginFill(0x00ff00,this._modalAlpha);
            this._modalMC.graphics.drawRect(0,0,layerUtil.getWidth(),layerUtil.getHeight());
            this._modalMC.graphics.endFill();
            this.parent.addChildAt(this._modalMC,this.parent.getChildIndex(this));
        }

        protected onAddedToStage(event: egret.Event) {
            if(this.isModal) {
                this.createModalMC();
            }
        }

        protected onRemovedFromStage(event: egret.Event) {
            if(this._modalMC && this._modalMC.parent != null) {
                this._modalMC.parent.removeChild(this._modalMC);
            }
        }

        public setCloseButton(button: eui.Button = null) {
            if(this._closeButton) {
                this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTap,this);
            }
            this._closeButton = button;
            if(this._closeButton) {
                this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTap,this);
            }
        }

        protected onCloseTap(e: egret.TouchEvent) {
            this.exeCloseEffect();
        }

	}
}
