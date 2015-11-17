module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class FightTeam {
        private allRoles:Array<FightRole> = [];
        public liveRoles: Array<FightRole> = [];
        private dieRoles:Array<FightRole> = [];

		public constructor() {
    		
		}
        public addRole(role:FightRole):void{
            role.owner = this;
            this.allRoles.push(role);
            this.liveRoles.push(role);
        }

		public enterFight():void{
            var role: FightRole;
            for(var i: number = 0;i < this.liveRoles.length; ++i){
                role = this.liveRoles[i];
                role.checkFightWeapons();
            }
		}

        public resetDie():void{
            var role: FightRole;
            for(var i: number = 0;i < this.liveRoles.length;++i) {
                role = this.liveRoles[i];
                if(role.isDie()){
                    this.dieRoles.push(this.liveRoles.splice(i--,1)[0]);
                }
            }
        }

		public isAllDie():boolean{
            return this.liveRoles.length==0;
		}
	}
}
