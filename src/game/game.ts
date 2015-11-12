module game {
    export var stringUtil: mana.utils.StringUtil;
    export var commonUtil: mana.utils.CommonUtil;
    export var layerUtil: mana.utils.LayerUtil;
    export var sceneUtil: mana.utils.SceneUtil;
    export var boxUtil: mana.utils.BoxUtil;
    export var msgUtil: game.utils.MsgUtil;
    
    export var Alert;

    export function initUtils() {
        stringUtil = mana.utils.StringUtil.getInstance();
        commonUtil = mana.utils.CommonUtil.getInstance();
        layerUtil = mana.utils.LayerUtil.getInstance();
        sceneUtil = mana.utils.SceneUtil.getInstance();
        boxUtil = mana.utils.BoxUtil.getInstance();
        
        msgUtil = game.utils.MsgUtil.getInstance();
        Alert = game.ui.Alert;
    }
    
    export var sysFight: SysFight;
    
    export function initSystems(){
        sysFight = SysFight.getInstance();
    }
}
