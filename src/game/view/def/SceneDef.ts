module game {
    export class SceneDef {
        private static sceneBegin: number = 0;
        public static SCENE_BEG: number = SceneDef.sceneBegin;
        public static FIGHT: number = SceneDef.sceneBegin++;//战斗
        public static MAP: number = SceneDef.sceneBegin++;//地图
        
        public static SCENE_END: number = SceneDef.sceneBegin++;//结束
    }
    
    export function getSceneClass(sceneID:number):any{
        if(sceneID == SceneDef.MAP) {
            return MapScene;
        } else if(sceneID == SceneDef.FIGHT){
            return FightScene;
        }
        return null;
    }
}