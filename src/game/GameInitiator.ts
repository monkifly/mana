
module game {

	export class GameInitiator extends egret.EventDispatcher{
		constructor(){
			super();
        }

        private curLoadIndex: number;
        private urlLoader: egret.URLLoader = new egret.URLLoader();
		
        public startup(): void {
            this.curLoadIndex = 0;
//            this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
//            this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onLoadSheetComplete, this);

//            this.loadASheet();
//            pomelo.connect("wxhj.org",3010,function() { console.log("server connected!");},this);
            
            this.enterGame();
        }

//        private loadASheet(): void {
//            var fileName: string = SheetDef.sheetNames[this.curLoadIndex];
//            this.urlLoader.load(new egret.URLRequest(Config.Sheet_Url + fileName+".csv"));
//        }
		
//		private onLoadSheetComplete(event:Event):void{
//			var urlLoader:egret.URLLoader = <egret.URLLoader><any> (event.currentTarget);
//			var files:any = {};
//            var className: string = SheetDef.sheetNames[this.curLoadIndex];
//
//            SheetUtil.setFile(className, urlLoader.data);
//            if (this.curLoadIndex == SheetDef.sheetNames.length - 1) {
//                this.curLoadIndex = 0;
//                this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
//                this.urlLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadSheetComplete, this);
//
//                this.enterGame();
//            } else {
//                this.curLoadIndex++;
//                this.loadASheet();
//            }
//        }
        
        private enterGame(){
            initUtils();
            initSystems();
            var str: string = "{0}adfas{1}";
            var str1 = stringUtil.substitute(str,1,99);
            var str2 = stringUtil.substitute(str,[1,"-----2341"]);
            console.log(str1);
            console.log(str2);

//            sysTest.startSecondTicker();
            console.log(commonUtil.formatTime(562));
            console.log(commonUtil.formatDate("1999-10-20 12:02:28"));
            console.log(commonUtil.formatDate(523412341234));

            sceneUtil.setSceneRoot(layerUtil.getLayer(LayerDef.SCENE));
            sceneUtil.setGetSceneClass(getSceneClass);
            sceneUtil.runScene(SceneDef.MAP);

            boxUtil.setGetBoxClass(getBoxClass);

            var mainUI: MainUI = new MainUI();
            layerUtil.addChild(mainUI,LayerDef.BASE_UI);


            var aTeam:FightTeam = new FightTeam();
            var dTeam:FightTeam = new FightTeam();

            var role:FightRole;
            var roleInfo:RoleInfo;
            var weapon:FightWeapon;
            var weaponInfo:WeaponInfo;

            for(var i=0; i<3; ++i){
                role = new FightRole();
                roleInfo = new RoleInfo();
                role.info = roleInfo;
                role.name = "atk" + i;
                role.speed = 100+i;
                weapon = new FightWeapon();
                weaponInfo = new WeaponInfo();
                weapon.info = weaponInfo;
                role.addWeapon(weapon);
                aTeam.addRole(role);

                role = new FightRole();
                roleInfo = new RoleInfo();
                role.info = roleInfo;
                role.name = "def" + i;
                weapon = new FightWeapon();
                weaponInfo = new WeaponInfo();
                weapon.info = weaponInfo;
                role.addWeapon(weapon);
                dTeam.addRole(role);
            }

            var fightResult:FightResult = sysFight.startFight(aTeam, dTeam);
            console.log(sysFight.getFightLog(fightResult));
//            console.log(SheetUtil.getRoleInfo(1).name);
        }
    }
}