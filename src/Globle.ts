/**
 *
 * @author 
 *
 */
module game {
    export var stringUtil: mana.utils.StringUtil;
    export var commonUtil: mana.utils.CommonUtil;
    
    export function init(){
        stringUtil = mana.utils.StringUtil.getInstance();
        commonUtil = mana.utils.CommonUtil.getInstance();
    }
}