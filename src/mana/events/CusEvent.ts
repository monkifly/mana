module mana.event {
    export class CusEvent extends egret.Event {
        public constructor(type: string,data: any = null,bubbles: boolean = false,cancelable: boolean = false) {
            super(type,bubbles,cancelable,data);
        }
    }
}