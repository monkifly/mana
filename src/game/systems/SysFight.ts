module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class SysFight extends mana.core.SysManager{
    	
        private bout: number = 0;
        private atkedRolesInBout: Array<FightRole> = [];
        private allLiveRoles: Array<FightRole> = [];
    	
		public constructor() {
            super();
		}
		
		public startFight(aTeam:FightTeam, dTeam:FightTeam):void{
            this.bout = 0;
            this.atkedRolesInBout.length = 0;
            this.allLiveRoles.length = 0;
            
            
            aTeam.enterFight();
            dTeam.enterFight();
            while(!aTeam.isDie() && !dTeam.isDie()){
                this.exeBout();
                this.nextBout();
            }
		}
		
		private exeBout():void{
            var allRoleAtked: boolean = false;
            while(!allRoleAtked){
                var atkRole: FightRole = this.getAtkRole();
                var defRole: FightRole = this.getDefRole(atkRole);

                this.exeAttack(atkRole,defRole);
                
                allRoleAtked = true;
                for(var i = 0;i < this.allLiveRoles.length;++i){
                    if(!this.isRoleAtked(this.allLiveRoles[i])){
                        allRoleAtked = false;
                        break;
                    }
                }
            }
		}
		
		private nextBout():void{
            this.bout++;
		}
		
		private getAtkRole():FightRole{
            var role: FightRole;
            for(var i = 0;i < this.allLiveRoles.length;++i) {
                role = this.allLiveRoles[i];
                if(this.isRoleAtked(role)){
                    continue;
                }
            }
    		
            return role;
		}
		private getDefRole(atkRole:FightRole):FightRole{
            return null;
		}
		
        private exeAttack(atkRole: FightRole,defRole: FightRole):void{
            var damage: number = 0;
            
            damage = 10;
            defRole.hp -= damage;
		}
		
		private isRoleAtked(role:FightRole):boolean{
            return this.atkedRolesInBout.indexOf(role)!=-1;
		}
	}
}
