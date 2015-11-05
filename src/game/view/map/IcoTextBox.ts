module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class IcoTextBox extends mana.comp.BaseBox{
        panel: mana.comp.IcoTitlePanel;
		public constructor() {
            super(true,1);
            this.skinName = "IcoTextTestBoxSkin";
		}
		
        public childrenCreated(){
            super.childrenCreated();
		}
		
		onEnter(){
            super.onEnter();
            console.log(this.panel.icoTitle);
            console.log(this.panel.icoTitleDisplay);
		}
	}
}
