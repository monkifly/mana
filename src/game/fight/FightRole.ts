module game{
    export class FightRole{
        private _info:RoleInfo;
        public owner: FightTeam;
        private _name:string;
        public hp: number;
        public hp2: number;
        private _speed:number;
        private _totalWeapons: Array<FightWeapon> = [];
        private _curWeapons: Array<FightWeapon> = [];
        
        public constructor() {
        }
        
        public set info(value:RoleInfo){
            this._info = value;
            this.hp = this._info.maxHp;
        }
        public get info():RoleInfo{
            return this._info;
        }

        public get name():string{
            return this._name?this._name:this.info.name;
        }
        public set name(value:string){
            this._name = value;
        }
        public get speed():number{
            return !isNaN(this._speed)?this._speed:this.info.speed;
        }
        public set speed(value:number){
            this._speed = value;
        }

        public addWeapon(weapon:FightWeapon):void{
            this._totalWeapons.push(weapon);
        }

        public checkFightWeapons(): void {
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
            return this.hp <= 0;
        }
        public die():void{
            this.owner.resetDie();
        }
    }
}