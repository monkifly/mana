module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class IcoTextBox extends mana.comp.BaseBox{
        panel: eui.Panel;
		public constructor() {
            super(false,1);
            this.skinName = "IcoTextTestBoxSkin";
		}
		
        public childrenCreated(){
            super.childrenCreated();
		}
		
		onEnter(){
            super.onEnter();
            console.log(this.panel.title);
            console.log(this.panel.titleDisplay);
		}
	}
}
