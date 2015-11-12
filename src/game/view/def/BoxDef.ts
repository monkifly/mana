module game {
    export class BoxDef {
        private static boxBegin: number = 0;
        public static BOX_BEG: number = BoxDef.boxBegin;
        public static BOX_1: number = BoxDef.boxBegin++;//
        
        public static BOX_END: number = BoxDef.boxBegin++;//结束
    }
    
    export function getBoxClass(boxID:number):any{
        if(boxID == BoxDef.BOX_1) {
            return IcoTextBox;
        }
        return null;
    }
}