module mana.comp {
    export class IcoLabel extends eui.Image{
        private _textSource:string;

        public set text(icoSource){
            this._textSource = icoSource;
            this.source = this._textSource;
        }

        public get text(){
            return this._textSource;
        }
    }
}
