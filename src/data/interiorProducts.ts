// インテリア（内装）製品データ
import type { Product } from '../types/product';

export const interiorProducts: Product[] = [
  // ダイニングテーブル
  {
    id: 'int-001',
    categoryId: 'dining-table',
    categoryName: '家具',
    subcategory: 'ダイニングテーブル',
    name: 'Gハウスオリジナル ダイニングテーブル',
    manufacturer: 'Gハウス',
    modelNumber: 'GH-DT-001',
    unit: 'piece',
    isOption: true,
    description: 'メラミン化粧板天板、スチール脚、コンセント付き',
    variants: [
      {
        id: 'v1',
        color: 'NTナチュラル×スクエア・ブラック',
        images: []
      },
      {
        id: 'v2',
        color: 'BRブラウン×スクエア・ブラック',
        images: []
      },
      {
        id: 'v3',
        color: 'DRダーク×スクエア・ブラック',
        images: []
      },
      {
        id: 'v4',
        color: 'DUダストグレー×スクエア・ホワイト',
        images: []
      },
      {
        id: 'v5',
        color: 'KRカブリード×ラウンド・ブラック',
        images: []
      },
      {
        id: 'v6',
        color: 'FMファインモルタル×ラウンド・ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 130000 },
      { plan: 'HOURS', price: 140000 }
    ]
  },

  // ニッチ
  {
    id: 'int-002',
    categoryId: 'niche',
    categoryName: '造作',
    subcategory: 'リモコンニッチ',
    name: 'リモコンニッチ パターンB',
    manufacturer: 'Gハウス',
    modelNumber: 'GH-NICHE-B',
    unit: 'piece',
    isOption: false,
    description: '壁埋め込み型リモコンニッチ',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      },
      {
        id: 'v2',
        color: 'ナチュラルバーチ',
        images: []
      },
      {
        id: 'v3',
        color: 'アッシュウォールナット',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // フローリング
  {
    id: 'int-003',
    categoryId: 'flooring',
    categoryName: '床材',
    subcategory: 'ライブナチュラルMSX',
    name: 'ブラックチェリー',
    manufacturer: '朝日ウッドテック',
    modelNumber: 'MSX-BCH',
    unit: 'sqm',
    isOption: false,
    description: '突き板フローリング、マット塗装',
    variants: [
      {
        id: 'v1',
        color: 'ブラックチェリー',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },
  {
    id: 'int-004',
    categoryId: 'flooring',
    categoryName: '床材',
    subcategory: 'ライブナチュラルMSX',
    name: 'ハードメイプル',
    manufacturer: '朝日ウッドテック',
    modelNumber: 'MSX-HMP',
    unit: 'sqm',
    isOption: false,
    description: '突き板フローリング、マット塗装',
    variants: [
      {
        id: 'v1',
        color: 'ハードメイプル',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },
  {
    id: 'int-005',
    categoryId: 'flooring',
    categoryName: '床材',
    subcategory: 'ライブナチュラルMSX',
    name: 'シカモア',
    manufacturer: '朝日ウッドテック',
    modelNumber: 'MSX-SYC',
    unit: 'sqm',
    isOption: false,
    description: '突き板フローリング、マット塗装',
    variants: [
      {
        id: 'v1',
        color: 'シカモア',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },
  {
    id: 'int-006',
    categoryId: 'flooring',
    categoryName: '床材',
    subcategory: 'ライブナチュラルMSX',
    name: 'ブラックウォルナット',
    manufacturer: '朝日ウッドテック',
    modelNumber: 'MSX-BWN',
    unit: 'sqm',
    isOption: false,
    description: '突き板フローリング、マット塗装',
    variants: [
      {
        id: 'v1',
        color: 'ブラックウォルナット',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },
  {
    id: 'int-007',
    categoryId: 'flooring',
    categoryName: '床材',
    subcategory: 'ライブナチュラルMSX',
    name: 'オーク',
    manufacturer: '朝日ウッドテック',
    modelNumber: 'MSX-OAK',
    unit: 'sqm',
    isOption: false,
    description: '突き板フローリング、マット塗装',
    variants: [
      {
        id: 'v1',
        color: 'オーク',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // 室内ドア
  {
    id: 'int-008',
    categoryId: 'interior-door',
    categoryName: '建具',
    subcategory: 'スタンダードレーベル',
    name: 'PAデザイン',
    manufacturer: 'LIXIL',
    modelNumber: 'PA',
    unit: 'piece',
    isOption: false,
    description: 'ハイドア標準（H2400）',
    variants: [
      {
        id: 'v1',
        color: 'ソフトウォールナット',
        images: []
      },
      {
        id: 'v2',
        color: 'ウォールナット',
        images: []
      },
      {
        id: 'v3',
        color: 'チェリー',
        images: []
      },
      {
        id: 'v4',
        color: 'グレージュアッシュ',
        images: []
      },
      {
        id: 'v5',
        color: 'イタリアオーク',
        images: []
      },
      {
        id: 'v6',
        color: 'メープル',
        images: []
      },
      {
        id: 'v7',
        color: 'ホワイトオーク',
        images: []
      },
      {
        id: 'v8',
        color: 'ホワイトアッシュ',
        images: []
      },
      {
        id: 'v9',
        color: 'しっくいホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // 階段
  {
    id: 'int-009',
    categoryId: 'stairs',
    categoryName: '階段',
    subcategory: '階段踏板/蹴込板',
    name: '階段セット',
    manufacturer: 'LIXIL',
    modelNumber: 'STAIRS-SET',
    unit: 'set',
    isOption: false,
    description: '踏板・蹴込板セット',
    variants: [
      {
        id: 'v1',
        color: 'しっくいホワイト',
        images: []
      },
      {
        id: 'v2',
        color: 'ソイルブラック',
        images: []
      },
      {
        id: 'v3',
        color: 'パールグレー',
        images: []
      },
      {
        id: 'v4',
        color: 'ゴム集成クリア塗装',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // 収納棚
  {
    id: 'int-010',
    categoryId: 'storage',
    categoryName: '収納',
    subcategory: '収納棚',
    name: '枕棚+PH',
    manufacturer: 'Panasonic',
    modelNumber: 'STORAGE-A',
    unit: 'piece',
    isOption: false,
    description: '標準：枕棚+パイプハンガー（各寝室1カ所、横幅2730迄）',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // スイッチ/コンセント
  {
    id: 'int-011',
    categoryId: 'electrical',
    categoryName: '電気設備',
    subcategory: 'スイッチ/コンセント',
    name: 'コスモワイド21',
    manufacturer: 'Panasonic',
    modelNumber: 'COSMO-WIDE21',
    unit: 'piece',
    isOption: false,
    description: 'スクエアタイプ/ホワイト',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // 換気システム
  {
    id: 'int-012',
    categoryId: 'ventilation',
    categoryName: '換気',
    subcategory: '換気システム',
    name: '第一種換気システム',
    manufacturer: 'Panasonic',
    modelNumber: 'FY-GPP024-W',
    unit: 'set',
    isOption: false,
    description: '熱交換ユニット、給気グリル、排気グリル',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // エアコン
  {
    id: 'int-013',
    categoryId: 'aircon',
    categoryName: '空調',
    subcategory: 'エアコン',
    name: 'Eシリーズ 6畳用',
    manufacturer: 'ダイキン',
    modelNumber: 'S225ATES-W',
    unit: 'piece',
    isOption: true,
    description: '100V対応、施工費含む',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 110000 },
      { plan: 'HOURS', price: 110000 }
    ]
  },
  {
    id: 'int-014',
    categoryId: 'aircon',
    categoryName: '空調',
    subcategory: 'エアコン',
    name: 'Eシリーズ 10畳用',
    manufacturer: 'ダイキン',
    modelNumber: 'S285ATES-W',
    unit: 'piece',
    isOption: true,
    description: '100V対応、施工費含む',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 150000 },
      { plan: 'HOURS', price: 150000 }
    ]
  },
  {
    id: 'int-015',
    categoryId: 'aircon',
    categoryName: '空調',
    subcategory: 'エアコン',
    name: 'Eシリーズ 14畳用',
    manufacturer: 'ダイキン',
    modelNumber: 'S405ATEP-W',
    unit: 'piece',
    isOption: true,
    description: '200V対応、施工費含む',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 192000 },
      { plan: 'HOURS', price: 192000 }
    ]
  },

  // アクセントクロス
  {
    id: 'int-016',
    categoryId: 'wallpaper',
    categoryName: '壁材',
    subcategory: 'アクセントクロス',
    name: 'サンゲツ厳選カタログ',
    manufacturer: 'サンゲツ',
    modelNumber: 'SANGETSU-SELECT',
    unit: 'sqm',
    isOption: false,
    description: '標準アクセントクロス',
    variants: [
      {
        id: 'v1',
        color: '厳選カタログから選択',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 0 },
      { plan: 'HOURS', price: 0 }
    ]
  },

  // アクセントタイル
  {
    id: 'int-017',
    categoryId: 'tile',
    categoryName: '壁材',
    subcategory: 'アクセントタイル',
    name: 'セメンティング',
    manufacturer: '名古屋モザイク',
    modelNumber: 'ORG-U7810',
    unit: 'sqm',
    isOption: true,
    description: '598×298×9mm角平',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト系',
        images: []
      },
      {
        id: 'v2',
        color: 'グレー系',
        images: []
      },
      {
        id: 'v3',
        color: 'ブラウン系',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 30000 },
      { plan: 'HOURS', price: 30000 }
    ]
  },
  {
    id: 'int-018',
    categoryId: 'tile',
    categoryName: '壁材',
    subcategory: 'アクセントタイル',
    name: 'モデネーゼ',
    manufacturer: '名古屋モザイク',
    modelNumber: 'XCV-U3200',
    unit: 'sqm',
    isOption: true,
    description: '600×298×10mm角平',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト系',
        images: []
      },
      {
        id: 'v2',
        color: 'グレー系',
        images: []
      },
      {
        id: 'v3',
        color: 'ベージュ系',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 28000 },
      { plan: 'HOURS', price: 28000 }
    ]
  },
  {
    id: 'int-019',
    categoryId: 'tile',
    categoryName: '壁材',
    subcategory: 'アクセントタイル',
    name: 'ラヴィータ',
    manufacturer: '名古屋モザイク',
    modelNumber: 'MSY-U9100',
    unit: 'sqm',
    isOption: true,
    description: '600×298×8mm角平',
    variants: [
      {
        id: 'v1',
        color: 'ホワイト系',
        images: []
      },
      {
        id: 'v2',
        color: 'グレー系',
        images: []
      },
      {
        id: 'v3',
        color: 'ブラウン系',
        images: []
      }
    ],
    pricing: [
      { plan: 'LACIE', price: 22000 },
      { plan: 'HOURS', price: 22000 }
    ]
  }
];