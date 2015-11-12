module game {
    export class LayerDef {
        private static layerBegin: number = 0;
        public static LAYER_BEG: number = LayerDef.layerBegin;
        public static SCENE: number = LayerDef.layerBegin++;//场景
        public static SCENE_BOX: number = LayerDef.layerBegin++;//场景全屏面板
        public static BASE_UI: number = LayerDef.layerBegin++;//基本UI
        public static BOX: number = LayerDef.layerBegin++;//弹出框
        public static FIGHT: number = LayerDef.layerBegin++;//战斗层
        public static TIP: number = LayerDef.layerBegin++;//TIP
        public static STORY: number = LayerDef.layerBegin++;//剧情层
        public static ALERT: number = LayerDef.layerBegin++;//提示框
        public static WEAK_GUIDE: number = LayerDef.layerBegin++;//新手指引
        public static SYSTEM_UI: number = LayerDef.layerBegin++;//系统UI
        public static MOUSE_UI: number = LayerDef.layerBegin++;//鼠标动画
        
        public static LAYER_END: number = LayerDef.layerBegin++;//结束
    }
}