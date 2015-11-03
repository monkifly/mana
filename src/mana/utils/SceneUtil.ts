
module mana.utils {
	export class SceneUtil extends BaseUtil{
        private _root: eui.Group;
        private lastSceneID:number=-1;
		public setSceneRoot(root:eui.Group):void{
			this._root = root;
		}
        private getSceneClass: Function;
		/***
		 * 设置一个通过sceneID获得对应类名的方法
		 * */
		public setGetSceneClass(fun:Function):void{
            this.getSceneClass = fun;
		}
		
		private _curScene:mana.comp.BaseScene;
		public get curScene():mana.comp.BaseScene{
			return this._curScene;
		}
		
        private scenes: Array<mana.comp.BaseScene> = [];
        public runScene(sceneID: number = 0,cache: Boolean = false):void{
            var sceneClass: any = this.getSceneClass(sceneID);
            var scene: mana.comp.BaseScene = this.scenes[sceneID];
            if (scene == null) {
                scene = new sceneClass(sceneID);
                if(cache)
                    this.scenes[sceneID] = scene;
            }
			
			if(this._curScene){
                this._curScene.exitScene();
			    this.lastSceneID = this._curScene.sceneID;
				this._root.removeChild(this._curScene);
            }
            egret.ExternalInterface.call("setSceneID", sceneID.toString());
			this._curScene = scene;
			if(this._curScene.isChildrenCreated)
			    this._curScene.enterScene();
			this._root.addChild(this._curScene);
        }
        public runLastScene(): void {
            if (this.lastSceneID != -1) {
                this.runScene(this.lastSceneID);
            }
        }

        public hideScene(): void {
            this._root.visible = false;
        }
        public showScene(): void {
            this._root.visible = true;
        }
        public destroyScene(sceneID: number): void {
            var scene: mana.comp.BaseScene = this.scenes[sceneID];
            if (scene != null) {
                scene.destroy();
                this.scenes[sceneID] = null;
            }
        }
        public destroyAllScene(): void {
            for(var i: number = 0; i < this.scenes.length; ++i) {
                this.destroyScene(i);
            }
        }
		
		constructor(){
            super();
		}
		
		
	}
}