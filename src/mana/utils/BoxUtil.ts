module mana.utils {
    export class BoxUtil extends BaseUtil {
        public  _boxs: Array<any> = [];
        
        private getBoxClass: Function;
		/***
		 * 设置一个通过boxID获得对应类名的方法
		 * */
        public setGetBoxClass(fun: Function): void {
            this.getBoxClass = fun;
        }
        public  displayBox(boxID: number,data: any = null,reverse: boolean = true,triggerType: number = 0,layer: number = -1) {
            var box: mana.comp.BaseBox = this.getBox(boxID);
            if(box) {
                box.data = data;
                box.triggerType = triggerType;
                this.showBox(box,reverse,layer);
            }
        }

        public  hasBox(boxID: number): boolean {
            return this._boxs[boxID] != null;
        }

        public  getBox(boxID: number): mana.comp.BaseBox {
            var box: mana.comp.BaseBox = this._boxs[boxID];
            if(!box){
                var boxClass: any = this.getBoxClass(boxID);
                box = new boxClass();
                box.addEventListener(mana.event.CompEvent.BOX_CLOSED,this.onBoxClosed,this);
                this._boxs[boxID] = box;
            }
            return box;
        }

        public  isBoxShowed(boxID: number): boolean {
            if(<any>!this.hasBox(boxID))
                return false;
            return this.getBox(boxID).isShowed;
        }

        public  hasBoxShow(): boolean {
            for(var i: number = 0;i < this._boxs.length;++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(box && box.isShowed)
                    return true;
            }
            return false;
        }

        public  closeBox(boxID: number) {
            var box: mana.comp.BaseBox = this.getBox(boxID);
            if(box && box.isShowed)
                box.close();
        }

        public  closeBoxByTrigger(triggers: Array<any>) {
            for(var i: number = 0;i < this._boxs.length;++i) {
                var box: mana.comp.BaseBox = this._boxs[i];
                if(box && triggers.indexOf(box.triggerType) != -1)
                    box.close();
            }
        }

        public  closeAllBox(includeScence: boolean = true) {
            for(var i: number = 0;i < this._boxs.length;++i) {
                var box: mana.comp.BaseBox = this._boxs[i];
                if(box)
                    box.close();
            }
        }

        public  closeAllBoxExcept(boxIDs: Array<any>) {
            for(var i: number = 0; i < this._boxs.length; ++i) {
                if(boxIDs.indexOf(i) == -1) {
                    var box: mana.comp.BaseBox = this._boxs[i];
                    if(box)
                        box.close();
                }
            }
        }

        public  autoCloseOther(selfBox: mana.comp.BaseBox) {
            for(var i: number = 0; i < this._boxs.length; ++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(box == selfBox)
                    continue;
                if(box && box.autoCloseByOther && this.isBoxShowed(i))
                    box.close();
            }
        }

        public  showBox(box: mana.comp.BaseBox,reverse: boolean = true,layer: number = -1) {
            if(<any>!reverse || <any>!box.isShowed) {
                var layerUtil: mana.utils.LayerUtil = mana.utils.LayerUtil.getInstance();
                box.open(layerUtil.getLayer(layer));
            }
            else
                box.close();
        }

        private onBoxClosed(event: mana.event.CompEvent) {
            var box: mana.comp.BaseBox = <mana.comp.BaseBox>event.currentTarget;
            box.removeEventListener(mana.event.CompEvent.BOX_CLOSED,this.onBoxClosed,this);
            var index: number = this._boxs.indexOf(box);
            this._boxs[index] = null;
        }

    }
}