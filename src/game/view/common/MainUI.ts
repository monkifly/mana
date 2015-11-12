module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class MainUI extends mana.comp.BaseComponent{
		constructor() {
            super();
            this.skinName = "MainUISkin";
		}
		
		btn1Tap(){
            sceneUtil.runScene(SceneDef.MAP);
		}
        btn2Tap() {
            sceneUtil.runScene(SceneDef.FIGHT);
        }
        btn3Tap() {

        }
        btn4Tap() {

        }
        btn5Tap() {

        }
	}
}
