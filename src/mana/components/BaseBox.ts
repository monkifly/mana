module mana.comp {
	export class BaseBox extends BaseComponent{
        protected _triggerType: number = 0;
        protected _modalMC: egret.Sprite;
        protected _isModal: boolean = false;
        protected _modalAlpha: number = NaN;
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
                this.dispatchEvent(new mana.event.CompEvent(mana.event.CompEvent.BOX_OPENED));
            }
        }

        public close(): boolean {
            if(this.parent) {
                this.parent.removeChild(this);
                this.dispatchEvent(new mana.event.CompEvent(mana.event.CompEvent.BOX_CLOSED));
                return true;
            }
            return false;
        }

        protected createModalMC() {
            if(<any>!this._modalMC)
                this._modalMC = new egret.Sprite();
            var layerUtil: mana.utils.LayerUtil = mana.utils.LayerUtil.getInstance();
            this._modalMC.graphics.clear();
            this._modalMC.graphics.beginFill(0x000000,this._modalAlpha);
            this._modalMC.graphics.drawRect(0,0,1,1);
            this._modalMC.graphics.endFill();
            this._modalMC.width = layerUtil.getWidth();
            this._modalMC.height = layerUtil.getHeight();
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

        public setCloseButton(button: BaseButton = null) {
            if(this._closeButton) {
                this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTap,this);
            }
            this._closeButton = button;
            if(this._closeButton) {
                this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTap,this);
            }
        }

        protected onCloseTap(e: egret.TouchEvent) {
            this.close();
        }

	}
}
