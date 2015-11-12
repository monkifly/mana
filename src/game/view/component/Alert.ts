module game.ui {
    export class Alert extends egret.HashObject {
        public static OK: number = 1;
        public static CANCEL: number = 2;
        public static YES: number = 4;
        public static NO: number = 8;
        public static CLOSE: number = 16;
        public static NO_TIP: number = 32;
        public static alert_list: Array<any> = [];
        public static cur_Alert: mana.comp.BaseBox;
        public static curID: number = 0;
        public static show(content: string,finishHandler: Function = null,modal: boolean = true,buttons: number = Alert.OK): number {
            var alert: AlertBox = new AlertBox(content,finishHandler,modal,buttons,Alert.curID++);
            Alert.alert_list.push(alert);
            Alert.showNextBox();
            return alert.id;
        }

        public static showInput(content: string,finishHandler: Function = null,defaultValue: string = "",restrict: string = "0-9",modal: boolean = true): number {
            var alert: AlertInputBox = new AlertInputBox(content,finishHandler,defaultValue,restrict,modal,Alert.curID++);
            Alert.alert_list.push(alert);
            Alert.showNextBox();
            return alert.id;
        }

        public static executeAlert(id: number,type: number) {
            var alert: AlertBox;
            var alertInput: AlertInputBox;
            var tempAry: Array<any> = [Alert.cur_Alert];
            tempAry = tempAry.concat(Alert.alert_list);
            for(var i: number = 0;i < tempAry.length;++i) {
                alert = <AlertBox>tempAry[i];
                alertInput = <AlertInputBox>tempAry[i];
                if(alert && alert.id == id) {
                    alert.executeHandler(type);
                }
                else if(alertInput && alertInput.id == id) {
                    alertInput.executeHandler(type);
                }
            }
        }

        public static getAlert(id: number): mana.comp.BaseBox {
            var alert: AlertBox;
            var alertInput: AlertInputBox;
            var tempAry: Array<any> = [Alert.cur_Alert];
            tempAry = tempAry.concat(Alert.alert_list);
            for(var i: number = 0;i < tempAry.length;++i) {
                alert = <AlertBox>tempAry[i];
                alertInput = <AlertInputBox>tempAry[i];
                if(alert && alert.id == id) {
                    return alert;
                }
                else if(alertInput && alertInput.id == id) {
                    return alertInput;
                }
            }
            return null;
        }

        protected static showNextBox() {
            if(Alert.cur_Alert)
                return;
            if(Alert.alert_list.length < 1)
                return;
            Alert.cur_Alert = Alert.alert_list.shift();
            Alert.cur_Alert.addEventListener(mana.event.CompEvent.BOX_CLOSED,Alert.onBoxClose,null);
            Alert.cur_Alert.open(layerUtil.getLayer(LayerDef.ALERT));
        }

        protected static onBoxClose(event: mana.event.CompEvent) {
            if(Alert.cur_Alert) {
                Alert.cur_Alert.removeEventListener(mana.event.CompEvent.BOX_CLOSED,Alert.onBoxClose,null);
                Alert.cur_Alert = null;
            }
            Alert.showNextBox();
        }

    }

    class AlertBox extends mana.comp.BaseBox {

        private buttonFlag: number = 0;
        private handler: Function;
        private btnOk: eui.Button;
        private btnCancel: eui.Button;
        private btnYes: eui.Button;
        private btnNo: eui.Button;
        private btnClose: eui.Button;
        private cbNoTip: eui.CheckBox;
        private labelContent: eui.Label;
        public id: number = 0;
        private content: string;

        public constructor(content: string,finishHandler: Function,modal: boolean,buttons: number,idPm: number) {
            super(modal);
            this.skinName = "AlertBoxSkin";
            this.id = idPm;
            this.handler = finishHandler;
            this.buttonFlag = buttons;
            this.content = content;
        }
        
        public childrenCreated():void{
            super.childrenCreated();
            
            this.labelContent.textFlow = (new egret.HtmlTextParser).parser(this.content);
            
            if((this.buttonFlag & Alert.OK) == Alert.OK) {
                this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onConfirm,this);
            }
            else {
                this.btnOk.parent.removeChild(this.btnOk);
                this.btnOk = null;
            }
            if((this.buttonFlag & Alert.YES) == Alert.YES) {
                this.btnYes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYes,this);
            }
            else {
                this.btnYes.parent.removeChild(this.btnYes);
                this.btnYes = null;
            }
            if((this.buttonFlag & Alert.NO) == Alert.NO) {
                this.btnNo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNo,this);
            }
            else {
                this.btnNo.parent.removeChild(this.btnNo);
                this.btnNo = null;
            }
            if((this.buttonFlag & Alert.CANCEL) == Alert.CANCEL) {
                this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCancel,this);
            }
            else {
                this.btnCancel.parent.removeChild(this.btnCancel);
                this.btnCancel = null;
            }
            if((this.buttonFlag & Alert.NO_TIP) == Alert.NO_TIP) {
            }
            else {
                this.cbNoTip.parent.removeChild(this.cbNoTip);
                this.cbNoTip = null;
            }
        }

        private onConfirm(event: egret.TouchEvent) {
            this.executeHandler(Alert.OK);
        }

        private onCancel(event: egret.TouchEvent) {
            this.executeHandler(Alert.CANCEL);
        }

        private onYes(event: egret.TouchEvent) {
            this.executeHandler(Alert.YES);
        }

        private onNo(event: egret.TouchEvent) {
            this.executeHandler(Alert.NO);
        }

        public executeHandler(type: number) {
            this.closeUseEffect();
            if(this.handler != null) {
                if(!this.cbNoTip)
                    this.handler(type);
                else
                    this.handler(type,this.cbNoTip.selected);
            }
        }
    }

    class AlertInputBox extends mana.comp.BaseBox {

        private handler: Function;
        private btnOk: eui.Button;
        private btnCancel: eui.Button;
        private btnClose: eui.Button;
        private labelInput: eui.EditableText;
        public id: number = 0;
        private restrict: string;

        public constructor(content: string,finishHandler: Function,defaultValue: string,restrict: string,modal: boolean,idPm: number) {
            super(modal);

            this.id = idPm;
            this.handler = finishHandler;
        }
        
        public childrenCreated(): void {
            super.childrenCreated();


//            this._display["contentTF"].text = content;
//            this._display["inputTF"].text = defaultValue;
//            this._display["inputTF"].restrict = restrict;
            
            this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onConfirm,this);
            this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCancel,this);
        }

        private onConfirm(event: egret.TouchEvent) {
            this.executeHandler(Alert.OK);
        }

        private onCancel(event: egret.TouchEvent) {
            this.executeHandler(Alert.CANCEL);
        }

        public executeHandler(type: number) {
            this.closeUseEffect();
            if(type == Alert.OK || type == Alert.YES) {
                if(this.handler != null)
                    this.handler(this.labelInput.text);
            }
            else {
                if(this.handler != null)
                    this.handler(null);
            }
        }

    }
}