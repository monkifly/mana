module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class SysFight extends mana.core.SysManager{
    	
        private bout: number = 0;
        private aTeam:FightTeam;
        private dTeam:FightTeam;
        private atkedRolesInBout: Array<FightRole> = [];
        private allLiveRoles: Array<FightRole> = [];

		public constructor() {
            super();
		}
		
		public startFight(aTeam:FightTeam, dTeam:FightTeam):FightResult{
            this.bout = 1;
            this.atkedRolesInBout.length = 0;
            this.allLiveRoles.length = 0;
            this.aTeam = aTeam;
            this.dTeam = dTeam;

            for(var i=0; i<this.aTeam.liveRoles.length; ++i){
                this.allLiveRoles.push(this.aTeam.liveRoles[i]);
            }
            for(var i=0; i<this.dTeam.liveRoles.length; ++i){
                this.allLiveRoles.push(this.dTeam.liveRoles[i]);
            }

            var result:FightResult = new FightResult();
            aTeam.enterFight();
            dTeam.enterFight();

            while(1){
                var fightBout:FightBout = this.exeBout();
                result.bouts.push(fightBout);
                if(aTeam.isAllDie() || dTeam.isAllDie()){
                    break;
                }
                this.nextBout();
            }

            if(aTeam.isAllDie()){
                console.log("fail");
            }else{
                console.log("win");
            }

            return result;
		}
		
		private exeBout():FightBout{
            var fightBout:FightBout = new FightBout();
            var allRoleAtked: boolean = false;
            fightBout.bout = this.bout;
            while(!allRoleAtked){
                var atkRole: FightRole = this.getAtkRole();
                if(!atkRole) break;

                var defRole: FightRole = this.getDefRole(atkRole);//可以扩展成1打多的情况
                if(!defRole) break;

                var fightAtkUnit:FightAtkUnit = this.exeAttack(atkRole,defRole);
                fightBout.atkUnits.push(fightAtkUnit);

                allRoleAtked = true;
                for(var i = 0;i < this.allLiveRoles.length;++i){
                    if(!this.isRoleAtked(this.allLiveRoles[i])){
                        allRoleAtked = false;
                        break;
                    }
                }
            }
            return fightBout;
		}

		private nextBout():void{
            this.bout++;
            this.atkedRolesInBout.length = 0;

		}
		
		private getAtkRole():FightRole{
            var maxSpeed:number = -1;
            var maxSpeedRole:FightRole;
            var role: FightRole;
            for(var i = 0;i < this.allLiveRoles.length;++i) {
                role = this.allLiveRoles[i];
                if(this.isRoleAtked(role)){
                    continue;
                }
                if(role.speed>maxSpeed){
                    maxSpeed = role.speed;
                    maxSpeedRole = role;
                }
            }
    		
            return maxSpeedRole;
		}
		private getDefRole(atkRole:FightRole):FightRole{
            var atkTeam:FightTeam = atkRole.owner;
            var defTeam:FightTeam = this.getOtherSideTeam(atkTeam);
            var defRoles:Array<FightRole> = defTeam.liveRoles;
            var defRole:FightRole;

            if(defRoles.length<=0) return null;

            defRole = defRoles[mathUtil.randomInt(defRoles.length)];

            return defRole;
		}
		
        private exeAttack(atkRole: FightRole,defRole: FightRole):FightAtkUnit{
            var fightAtkUnit:FightAtkUnit = new FightAtkUnit();
            fightAtkUnit.atkRole = atkRole;
            fightAtkUnit.defRoles.push(defRole);

            var weapons:Array<FightWeapon> = atkRole.getCanUseWeapon();
            fightAtkUnit.hurtDatas.push(this.exeHurt(atkRole, defRole, weapons));
            atkRole.checkFightWeapons();
            this.atkedRolesInBout.push(atkRole);
            if(defRole.isDie()){
                defRole.die();
                var index:number = this.allLiveRoles.indexOf(defRole);
                this.allLiveRoles.splice(index, 1);
            }

            return fightAtkUnit;
		}

        private exeHurt(atkRole: FightRole,defRole: FightRole, weapons:Array<FightWeapon>):FightHurtData{
            var hurtData:FightHurtData = new FightHurtData();
            hurtData.atkRole = atkRole;
            hurtData.defRole = defRole;

            var weapon:FightWeapon = weapons[0];
            var damage: number = 0;
            damage = weapon.attack;
            defRole.hp -= damage;

            hurtData.weapons = weapons;
            hurtData.damage = damage;
            return hurtData;
        }
		
		private isRoleAtked(role:FightRole):boolean{
            return this.atkedRolesInBout.indexOf(role)!=-1;
		}

        private getOtherSideTeam(team:FightTeam):FightTeam{
            return this.aTeam===team?this.dTeam:this.aTeam;
        }








        public getFightLog(result:FightResult):string{
            var str:string = "";
            var fightBout:FightBout;
            var atkUnit:FightAtkUnit;
            var hurtData:FightHurtData;
            str += "战斗开始\n";
            for(var i=0; i<result.bouts.length; ++i){
                fightBout = result.bouts[i];

                str += stringUtil.substitute("第{0}回合开始\n", fightBout.bout);
                for(var k=0; k<fightBout.atkUnits.length; ++k){
                    atkUnit = fightBout.atkUnits[k];
                    for(var n=0; n<atkUnit.hurtDatas.length; ++n){
                        hurtData = atkUnit.hurtDatas[n];
                        str += stringUtil.substitute("{0}对{1}使用{2}造成{3}伤害\n",hurtData.atkRole.name, hurtData.defRole.name, hurtData.weapons[0].info.name, hurtData.damage);
                    }
                }
                str += "\n";
            }
            str += "战斗结束";

            return str;
        }
	}
}
