module game{
    export class FightRole{

        public owner: FightTeam;
        public hp: number;
        public hp2: number;
        private _totalWeapons: Array<FightWeapon> = [];
        private _curWeapons: Array<FightWeapon> = [];
        
        public constructor() {
        }
        
        public checkEntranceWeapon(): void {
            while(this._curWeapons.length < FightDef.NUM_ENTRANCE_WEAPON) {
                var ran: number = mathUtil.randomInt(this._totalWeapons.length);
                var ranWeapon: FightWeapon = this._totalWeapons[ran];
                this._curWeapons.push(ranWeapon);
            }
        }

        public getCanUseWeapon(): Array<FightWeapon> {
            var ary: Array<FightWeapon> = [];

            ary.push(this._curWeapons.shift());

            return ary;
        }
        
        public isDie():boolean{
            return this.hp == 0;
        }
    }
}