module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class FightWeapon extends mana.BaseModel{
        private _info: WeaponInfo;

        public set info(value: WeaponInfo) {
            this._info = value;
        }
        public get info(): WeaponInfo {
            return this._info;
        }
        
        public get attack():number{
            return this.info.attack;
        }
	}
}
