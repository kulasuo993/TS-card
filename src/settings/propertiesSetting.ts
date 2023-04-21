const propertiesSetting = {
  hearthstone: {
    //职业
    card_class: [
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Demonhunter.png',
        key: '恶魔猎手',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Druid.png',
        key: '德鲁伊',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Hunter.png',
        key: '猎人',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Mage.png',
        key: '法师',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Paladin.png',
        key: '圣骑士',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Priest.png',
        key: '牧师',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Rogue.png',
        key: '潜行者',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Shaman.png',
        key: '萨满',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Warlock.png',
        key: '术士',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Warrior.png',
        key: '战士',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/carddiv/hearthstone/occupation/Neutral.png',
        key: '中立',
      },
    ],
    fixed_attr: [
      {
        key: 'rarity',
        name: '稀有度',
        options: [
          { value: '普通', text: '普通' },
          { value: '稀有', text: '稀有' },
          { value: '史诗', text: '史诗' },
          { value: '传说', text: '传说' },
        ],
      },
      {
        key: 'cost',
        name: '法术力',
        options: [
          { value: '0', text: '0' },
          { value: '1', text: '1' },
          { value: '2', text: '2' },
          { value: '3', text: '3' },
          { value: '4', text: '4' },
          { value: '5', text: '5' },
          { value: '6', text: '6' },
          { value: '7', text: '7' },
          { value: '8', text: '8' },
          { value: '9', text: '9' },
          { value: '10', text: '10' },
          { value: '11', text: '11' },
          { value: '12', text: '12' },
          { value: '20', text: '20' },
          { value: '25', text: '25' },
        ],
      },
    ],
    custom_attr: {
      类型: {
        key: 'card_type',
        name: '类型',
        options: [
          {
            text: '生物',
            value: 'minion',
            child: '攻击力,生命值,随从类型',
          },
          {
            text: '法术',
            value: 'spell',
            child: '无',
          },
          {
            text: '武器',
            value: 'weapon',
            child: '攻击力,耐久度',
          },
          {
            text: '英雄',
            value: 'hero',
            child: '耐久度',
          },
        ],
      },
      攻击力: {
        key: 'attack',
        name: '攻击力',
        options: [
          {
            text: '0',
            value: '0',
            child: '',
          },
          {
            text: '1',
            value: '1',
            child: '',
          },
          {
            text: '2',
            value: '2',
            child: '',
          },
          {
            text: '3',
            value: '3',
            child: '',
          },
          {
            text: '4',
            value: '4',
            child: '',
          },
          {
            text: '5',
            value: '5',
            child: '',
          },
          {
            text: '6',
            value: '6',
            child: '',
          },
          {
            text: '7',
            value: '7',
            child: '',
          },
          {
            text: '8',
            value: '8',
            child: '',
          },
          {
            text: '9',
            value: '9',
            child: '',
          },
          {
            text: '10',
            value: '10',
            child: '',
          },
          {
            text: '12',
            value: '12',
            child: '',
          },
        ],
      },
      生命值: {
        key: 'health',
        name: '生命值',
        options: [
          {
            text: '1',
            value: '1',
            child: '',
          },
          {
            text: '2',
            value: '2',
            child: '',
          },
          {
            text: '3',
            value: '3',
            child: '',
          },
          {
            text: '4',
            value: '4',
            child: '',
          },
          {
            text: '5',
            value: '5',
            child: '',
          },
          {
            text: '6',
            value: '6',
            child: '',
          },
          {
            text: '7',
            value: '7',
            child: '',
          },
          {
            text: '8',
            value: '8',
            child: '',
          },
          {
            text: '9',
            value: '9',
            child: '',
          },
          {
            text: '10',
            value: '10',
            child: '',
          },
          {
            text: '12',
            value: '12',
            child: '',
          },
        ],
      },
      耐久度: {
        key: 'durability',
        name: '耐久度',
        options: [
          {
            text: '1',
            value: '1',
            child: '',
          },
          {
            text: '2',
            value: '2',
            child: '',
          },
          {
            text: '3',
            value: '3',
            child: '',
          },
          {
            text: '4',
            value: '4',
            child: '',
          },
          {
            text: '5',
            value: '5',
            child: '',
          },
          {
            text: '6',
            value: '6',
            child: '',
          },
          {
            text: '7',
            value: '7',
            child: '',
          },
          {
            text: '8',
            value: '8',
            child: '',
          },
          {
            text: '9',
            value: '9',
            child: '',
          },
          {
            text: '10',
            value: '10',
            child: '',
          },
        ],
      },
      随从类型: {
        key: 'race',
        name: '随从类型',
        options: [
          {
            text: '鱼人',
            value: '鱼人',
            child: '',
          },
          {
            text: '恶魔',
            value: '恶魔',
            child: '',
          },
          {
            text: '机械',
            value: '机械',
            child: '',
          },
          {
            text: '元素',
            value: '元素',
            child: '',
          },
          {
            text: '野兽',
            value: '野兽',
            child: '',
          },
          {
            text: '图腾',
            value: '图腾',
            child: '',
          },
          {
            text: '海盗',
            value: '海盗',
            child: '',
          },
          {
            text: '龙',
            value: '龙',
            child: '',
          },
          {
            text: '野猪人',
            value: '野猪人',
            child: '',
          },
          {
            text: '娜迦',
            value: '娜迦',
            child: '',
          },
          {
            text: '亡灵',
            value: '亡灵',
            child: '',
          },
        ],
      },
    },
  },
  tes: {
    card_class: [
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/tes/color/Strength.png',
        key: '红色',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/tes/color/Agility.png',
        key: '绿色',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/tes/color/Intelligence.png',
        key: '蓝色',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/tes/color/Endurance.png',
        key: '紫色',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/tes/color/Willpower.png',
        key: '黄色',
      },
      {
        icon: 'https://pic.iyingdi.com/yingdiimg/tes/color/Neutral.png',
        key: '无色',
      },
    ],
    fixed_attr: [
      {
        key: 'rarity',
        name: '稀有度',
        options: [
          { value: '普通', text: '普通' },
          { value: '稀有', text: '稀有' },
          { value: '史诗', text: '史诗' },
          { value: '传奇', text: '传奇' },
        ],
      },
      {
        key: 'cost',
        name: '法术力',
        options: [
          { value: '0', text: '0' },
          { value: '1', text: '1' },
          { value: '2', text: '2' },
          { value: '3', text: '3' },
          { value: '4', text: '4' },
          { value: '5', text: '5' },
          { value: '6', text: '6' },
          { value: '7', text: '7' },
          { value: '8', text: '8' },
          { value: '9', text: '9' },
          { value: '10', text: '10' },
          { value: '11', text: '11' },
          { value: '12', text: '12' },
          { value: '20', text: '20' },
        ],
      },
    ],
    custom_attr: {
      类型: {
        key: 'card_type',
        name: '类型',
        options: [
          {
            text: '生物',
            value: '生物',
            child: '攻击力,生命值,生物类型',
          },
          {
            text: '技能·装备',
            value: '法术',
            child: '无',
          },
        ],
      },
      攻击力: {
        key: 'attack',
        name: '攻击力',
        options: [
          {
            text: '1',
            value: '1',
            child: '',
          },
          {
            text: '2',
            value: '2',
            child: '',
          },
          {
            text: '3',
            value: '3',
            child: '',
          },
          {
            text: '4',
            value: '4',
            child: '',
          },
          {
            text: '5',
            value: '5',
            child: '',
          },
          {
            text: '6',
            value: '6',
            child: '',
          },
          {
            text: '7',
            value: '7',
            child: '',
          },
          {
            text: '8',
            value: '8',
            child: '',
          },
          {
            text: '9',
            value: '9',
            child: '',
          },
          {
            text: '11',
            value: '11',
            child: '',
          },
          {
            text: '12',
            value: '12',
            child: '',
          },
        ],
      },
      生命值: {
        key: 'health',
        name: '生命值',
        options: [
          {
            text: '1',
            value: '1',
            child: '',
          },
          {
            text: '2',
            value: '2',
            child: '',
          },
          {
            text: '3',
            value: '3',
            child: '',
          },
          {
            text: '4',
            value: '4',
            child: '',
          },
          {
            text: '5',
            value: '5',
            child: '',
          },
          {
            text: '6',
            value: '6',
            child: '',
          },
          {
            text: '7',
            value: '7',
            child: '',
          },
          {
            text: '8',
            value: '8',
            child: '',
          },
          {
            text: '9',
            value: '9',
            child: '',
          },
          {
            text: '11',
            value: '11',
            child: '',
          },
          {
            text: '12',
            value: '12',
            child: '',
          },
        ],
      },
      生物类型: {
        key: 'race',
        name: '生物类型',
        options: [
          {
            text: '小恶魔',
            value: '小恶魔',
            child: '',
          },
          {
            text: '爬行动物',
            value: '爬行动物',
            child: '',
          },
          {
            text: '木精灵',
            value: '木精灵',
            child: '',
          },
          {
            text: '诺德人',
            value: '诺德人',
            child: '',
          },
          {
            text: '兽人',
            value: '兽人',
            child: '',
          },
          {
            text: '红卫人',
            value: '红卫人',
            child: '',
          },
          {
            text: '蹒跚者',
            value: '蹒跚者',
            child: '',
          },
          {
            text: '牛头人',
            value: '牛头人',
            child: '',
          },
          {
            text: '迪德拉',
            value: '迪德拉',
            child: '',
          },
          {
            text: '龙',
            value: '龙',
            child: '',
          },
          {
            text: '巨人',
            value: '巨人',
            child: '',
          },
          {
            text: '狼人',
            value: '狼人',
            child: '',
          },
          {
            text: '食人魔',
            value: '食人魔',
            child: '',
          },
          {
            text: '暗精灵',
            value: '暗精灵',
            child: '',
          },
          {
            text: '高精灵',
            value: '高精灵',
            child: '',
          },
          {
            text: '布莱顿人',
            value: '布莱顿人',
            child: '',
          },
          {
            text: '鹰身女妖',
            value: '鹰身女妖',
            child: '',
          },
          {
            text: '海妖',
            value: '海妖',
            child: '',
          },
          {
            text: '灰烬生物',
            value: '灰烬生物',
            child: '',
          },
          {
            text: '怨灵',
            value: '怨灵',
            child: '',
          },
          {
            text: '卡吉特',
            value: '卡吉特',
            child: '',
          },
        ],
      },
    },
  },
};

export default propertiesSetting;
