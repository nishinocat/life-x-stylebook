// カテゴリごとの選択ルール設定
export const categoryRules: Record<string, {
  selectionType: 'single' | 'multiple';
  maxSelection?: number;
  description?: string;
}> = {
  // エクステリア
  '玄関ドア': { selectionType: 'single', description: '1つのみ選択可能' },
  '屋根材': { selectionType: 'single', description: '1つのみ選択可能' },
  '外壁材': { selectionType: 'single', description: '1つのみ選択可能' },
  '破風板': { selectionType: 'single', description: '1つのみ選択可能' },
  '軒天': { selectionType: 'single', description: '1つのみ選択可能' },
  '雨樋': { selectionType: 'single', description: '1つのみ選択可能' },
  'バルコニー': { selectionType: 'single', description: '1つのみ選択可能' },
  '窓': { selectionType: 'multiple', description: '複数選択可能' },
  'シャッター': { selectionType: 'multiple', description: '複数選択可能' },
  
  // インテリア
  '床材': { selectionType: 'single', description: '1つのみ選択可能' },
  '建具': { selectionType: 'multiple', description: '複数選択可能' },
  '階段': { selectionType: 'single', description: '1つのみ選択可能' },
  '手すり': { selectionType: 'multiple', description: '複数選択可能' },
  '造作材': { selectionType: 'multiple', description: '複数選択可能' },
  '壁紙': { selectionType: 'multiple', description: '複数選択可能' },
  '照明': { selectionType: 'multiple', description: '複数選択可能' },
  'カーテン': { selectionType: 'multiple', description: '複数選択可能' },
  'カーテンレール': { selectionType: 'multiple', description: '複数選択可能' },
  
  // 水廻り
  'キッチン': { selectionType: 'single', description: '1つのみ選択可能' },
  'レンジフード': { selectionType: 'single', description: '1つのみ選択可能' },
  'ユニットバス': { selectionType: 'single', description: '1つのみ選択可能' },
  '洗面化粧台': { selectionType: 'multiple', maxSelection: 2, description: '最大2つまで選択可能' },
  'トイレ': { selectionType: 'multiple', maxSelection: 3, description: '最大3つまで選択可能' },
  'エコキュート': { selectionType: 'single', description: '1つのみ選択可能' },
  '給湯器': { selectionType: 'single', description: '1つのみ選択可能' },
  'IHクッキングヒーター': { selectionType: 'single', description: '1つのみ選択可能' },
  '食器洗い乾燥機': { selectionType: 'single', description: '1つのみ選択可能' },
  
  // デフォルト（上記以外のカテゴリ）
  'default': { selectionType: 'multiple', description: '複数選択可能' }
};

// カテゴリの選択ルールを取得
export const getCategoryRule = (categoryName: string) => {
  return categoryRules[categoryName] || categoryRules.default;
};

// カテゴリが単一選択かチェック
export const isSingleSelection = (categoryName: string): boolean => {
  const rule = getCategoryRule(categoryName);
  return rule.selectionType === 'single';
};

// カテゴリの最大選択数を取得
export const getMaxSelection = (categoryName: string): number | undefined => {
  const rule = getCategoryRule(categoryName);
  return rule.maxSelection;
};