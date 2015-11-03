module mana.event {
    export class CompEvent extends egret.Event {
        public static BOX_OPENED: string = "BOX_OPENED";
        public static BOX_CLOSED: string = "BOX_CLOSED";
        public constructor(type: string,data: any = null,bubbles: boolean = false,cancelable: boolean = false) {
            super(type,bubbles,cancelable,data);
        }
    }
}