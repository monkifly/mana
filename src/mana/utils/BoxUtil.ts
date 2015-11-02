module mana.utils {
    export class BoxUtil extends BaseUtil {
        public  _boxs: Array<any> = [];
        public _destroyBoxs: Array<any> = [];
        public _creatingBoxIDs: Array<any> = [];
        public  displayBox(boxID: number,data: any = null,reverse: boolean = true,triggerType: number = 0,layer: number = -1) {
            var box: mana.comp.BaseBox = this.getBox(boxID);
            if(box) {
                box.data = data;
                box.triggerType = triggerType;
                this.showBox(box,reverse,layer);
            }
            else {
                this.createBox(boxID,function() {
                    this.displayBox(boxID,data,reverse,triggerType,layer);
                });
            }
        }

        public  createBox(boxID: number,callback: Function = null,...params) {
            if(this._creatingBoxIDs.indexOf(boxID) != -1)
                return;
            if(this.hasBox(boxID))
                return;
            this._creatingBoxIDs.push(boxID);
//            UILoader.getInstance().loadBox(boxID,function() {
//                var cIdx: number = flash.checkInt(this._creatingBoxIDs.indexOf(boxID));
//                this._creatingBoxIDs.splice(cIdx,1);
//                var classRef: any = <any>BoxDef.getBoxClass(boxID);
//                var box: mana.comp.BaseBox = <any>new classRef();
//                this._boxs[boxID] = box;
//                if(callback != null)
//                    callback.apply(null,params);
//            });
        }

        public  hasBox(boxID: number): boolean {
            return this._boxs[boxID] != null;
        }

        public  getBox(boxID: number): mana.comp.BaseBox {
            return this._boxs[boxID];
        }

        public  isBoxShowed(boxID: number): boolean {
            if(<any>!this.hasBox(boxID))
                return false;
            return this.getBox(boxID).isShowed;
        }

        public  hasBoxShow(): boolean {
            for(var i: number = 0;i < this._boxs.length;++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(box && box["isShowed"])
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
            for(var i: number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END;++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(box && triggers.indexOf(box["triggerType"]) != -1)
                    box["close"]();
            }
        }

        public  closeAllBox(includeScence: boolean = true) {
            for(var i: number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END;++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(<any>!includeScence && (flash.As3is(box,null,"S01SceneBox")))
                    continue;
                if(box)
                    box["close"]();
            }
        }

        public  closeAllBoxExcept(boxIDs: Array<any>) {
            for(var i: number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END;++i) {
                if(boxIDs.indexOf(i) == -1) {
                    var box: mana.comp.BaseBox = <any>this._boxs[i];
                    if(box)
                        box["close"]();
                }
            }
        }

        public  closeAllDestroyBox() {
            while(this._destroyBoxs.length) {
                var box: mana.comp.BaseBox = <any>this._destroyBoxs.shift();
                if(box)
                    box["close"]();
            }
        }

        public  closeDestroyBoxByElement(eleString: string,value: number) {
            value = flash.checkInt(value);

            for(var i: number = flash.checkInt(0);i < this._destroyBoxs.length;++i) {
                var box: mana.comp.BaseBox = <any>this._destroyBoxs[i];
                if(box && box["data"]) {
                    var dataTmp: number = 0;
                    if(box["hasOwnProperty"](eleString) && box[eleString] != null)
                        dataTmp = flash.checkInt(flash.tranint(box[eleString]));
                    else if(box["data"][eleString] != null)
                        dataTmp = flash.checkInt(flash.tranint(box["data"][eleString]));
                    if(dataTmp == value)
                        box["close"]();
                }
            }
        }

        public  autoCloseOther(selfBox: mana.comp.BaseBox) {
            for(var i: number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END;++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(box == selfBox)
                    continue;
                if(box && box["autoCloseByOther"] && this.isBoxShowed(i))
                    box["close"]();
            }
        }

        public  closeSceneBox() {
            for(var i: number = flash.checkInt(BoxDef.BOX_ID_BEGIN);i < BoxDef.BOX_ID_END;++i) {
                var box: mana.comp.BaseBox = <any>this._boxs[i];
                if(box && (flash.As3is(box,null,"S01SceneBox")))
                    box["close"]();
            }
            SceneUtil.changeScene(SceneUtil.curScene);
        }

        public  showBox(box: mana.comp.BaseBox,reverse: boolean = true,layer: number = -1) {
            if(<any>!reverse || <any>!box["isShowed"]) {
                if(layer == -1)
                    layer = flash.checkInt(LayerDef.BOX);
                box["open"](LayerUtil.getLayer(layer));
            }
            else
                box["close"]();
        }

        public  displayDistroyBox(boxID: number,data: any = null,layer: number = -1) {
//            var box: mana.comp.BaseBox;
//            UILoader.getInstance().loadBox(boxID,function() {
//                var classRef: any = <any>BoxDef.getBoxClass(boxID);
//                box = new classRef();
//                box["data"] = data;
//                box["addEventListener"](FlcEvent.BOX_CLOSED,this.onBoxClosed);
//                this._destroyBoxs.push(box);
//                this.showBox(box,false,layer);
//            });
        }

        private  onBoxClosed(event: mana.flc.event.FlcEvent) {
            var box: mana.comp.BaseBox = <mana.comp.BaseBox>event.currentTarget;
            var index: number = this._destroyBoxs.indexOf(box);
            if(index != -1)
                this._destroyBoxs.splice(index,1);
        }

    }
}