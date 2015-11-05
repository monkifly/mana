module mana.comp {
    export class BaseLabel extends eui.Label {
        constructor(){
            super();
        }
        
        public set style(key:number){
            var styleUtil: mana.utils.StyleUtil = mana.utils.StyleUtil.getInstance();
            var styleUnit: mana.utils.StyleUnit = styleUtil.getStyleUnit(key);
            if(!styleUnit){
                console.warn("not found style key:" + key);
                return;
            }
            if(!isNaN(styleUnit.color)){
                this.textColor = styleUnit.color;
            } 
            if(!isNaN(styleUnit.size)) {
                this.size = styleUnit.size;
            }
        }
    }
}