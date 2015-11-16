module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class FightTeam {
        private _roles: Array<FightRole> = [];
        private curAtkRoleIndex: number = 0;
        
		public constructor() {
    		
		}
		
		public get curAtkRole():FightRole{
            return this._roles[this.curAtkRoleIndex];
		}
		
		public enterFight():void{
            var role: FightRole;
            for(var i: number = 0;i < this._roles.length; ++i){
                role = this._roles[i];
                role.checkEntranceWeapon();
            }
		}
		
		public nextAtk():void{
            this.curAtkRoleIndex++;
            if(this.curAtkRoleIndex >= this._roles.length){
                this.curAtkRoleIndex = 0;
            }
		}
		
		public isDie():boolean{
            var role: FightRole;
            for(var i: number = 0;i < this._roles.length;++i) {
                role = this._roles[i];
                if(!role.isDie()){
                    return false;
                }
            }
            return true;
		}
	}
}
