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
		
		public nextAtk():void{
            this.curAtkRoleIndex++;
		}
	}
}
