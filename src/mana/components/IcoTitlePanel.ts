/**
 *
 * @author 
 *
 */
module mana.comp {
    export class IcoTitlePanel extends eui.Panel{
        public icoTitleDisplay: eui.Image;
        private _icoTitle: string;
        public constructor() {
            super();
        }
        
        public set icoTitle(icoSource) {
            this._icoTitle = icoSource;
            if(this.icoTitleDisplay)
                this.icoTitleDisplay.source = this._icoTitle;
        }

        public get icoTitle() {
            return this._icoTitle;
        }
        
        protected partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
            if(instance == this.icoTitleDisplay) {
                this.icoTitleDisplay.source = this._icoTitle;
            }
        }
    }
}
