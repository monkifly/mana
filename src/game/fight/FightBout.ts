/**
 * Created by Administrator on 2015/11/17.
 */
module game{
    export class FightBout{
        public bout:number = 0;
        public atkUnits:Array<FightAtkUnit> = [];

    }

    export class FightAtkUnit {
        public atkRole:FightRole;
        public defRoles:Array<FightRole> = [];
        public hurtDatas:Array<FightHurtData> = [];
    }

    export class FightHurtData{
        public atkRole:FightRole;
        public defRole:FightRole;
        public weapons:Array<FightWeapon>;
        public damage:number;
    }
}