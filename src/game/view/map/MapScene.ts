module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class MapScene extends mana.comp.BaseScene {
    	
    	
		constructor() {
            super(1);
            this.skinName = "MapSceneSkin";
		}
		
		btnTest1Tap(){
            boxUtil.displayBox(1);
		}
		
        btnTest2Tap() {
            game.ui.Alert.show("t<b>加粗</b>t <font color='#ff0000'>content</font>\na<i>斜体</i>aa <font size='30'>bbb</font>");
            game.ui.Alert.show("aaaa",null,true,game.ui.Alert.OK | game.ui.Alert.CANCEL);
            game.ui.Alert.show("bbbb",null,true,game.ui.Alert.YES | game.ui.Alert.NO);
            game.ui.Alert.show("CCCC",null,true,game.ui.Alert.YES);
        }
	}
}
