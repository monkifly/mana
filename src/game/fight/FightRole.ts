module game{
    export class FightRole extends mana.BaseModel{
        private _totalWeapons: Array<FightWeapon>;
        private _curWeapons: Array<FightWeapon>;
    }
}