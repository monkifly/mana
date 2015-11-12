module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class MapScene extends mana.comp.BaseScene {
    	
    	
		constructor() {
            super(SceneDef.MAP);
            this.skinName = "MapSceneSkin";
		}
		
		btnTest1Tap(){
            boxUtil.displayBox(BoxDef.BOX_1);
		}
		
        btnTest2Tap() {
            msgUtil.show("aaa{0}bbb{1}ccc{0}",2341,5234);
            Alert.show("t<b>加粗</b>t <font color='#ff0000'>content</font>\na<i>斜体</i>aa <font size='30'>bbb</font>");
            Alert.show("aaaa",null,true,Alert.OK | Alert.CANCEL);
            Alert.show("bbbb",null,true,Alert.YES | Alert.NO);
            Alert.show("CCCC",null,true,Alert.YES);
        }
	}
}
