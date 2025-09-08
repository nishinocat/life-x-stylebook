import React, { useState } from 'react';
import { Plus, Edit, Trash2, BarChart3, Package, Bell, Search, TrendingUp } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ProductForm } from './ProductForm';
import { useVersionStore } from '../../stores/useVersionStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { useProductStore } from '../../stores/useProductStore';
import { useStatisticsStore } from '../../stores/useStatisticsStore';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types/product';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'statistics' | 'adoption' | 'versions'>('products');
  const [productCategory, setProductCategory] = useState<'exterior' | 'interior' | 'water'>('exterior');
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  
  const currentVersion = useVersionStore((state) => state.currentVersion);
  const versions = useVersionStore((state) => state.getVersionHistory());
  const statistics = useOrderStore((state) => state.getStatistics());
  
  // 採用統計データ
  const {
    getTopProducts,
    getCategoryStats,
    getMonthlyStats
  } = useStatisticsStore();
  
  const {
    exteriorProducts,
    interiorProducts,
    waterProducts,
    addExteriorProduct,
    updateExteriorProduct,
    deleteExteriorProduct,
    addInteriorProduct,
    updateInteriorProduct,
    deleteInteriorProduct,
    addWaterProduct,
    updateWaterProduct,
    deleteWaterProduct,
  } = useProductStore();
  
  // カテゴリに応じた商品リストを取得
  const getProductsByCategory = () => {
    switch (productCategory) {
      case 'exterior':
        return exteriorProducts;
      case 'interior':
        return interiorProducts;
      case 'water':
        return waterProducts;
      default:
        return [];
    }
  };
  
  // 検索フィルタリング
  const filteredProducts = getProductsByCategory().filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 商品の保存処理
  const handleSaveProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      id: editingProduct?.id || `${productCategory}-${Date.now()}`,
      categoryId: productData.categoryId || '',
      categoryName: productData.categoryName || '',
      subcategory: productData.subcategory || '',
      name: productData.name || '',
      manufacturer: productData.manufacturer || 'LIFE X',
      modelNumber: productData.modelNumber || '',
      unit: productData.unit || 'piece',
      isOption: productData.isOption ?? true,
      variants: productData.variants || [],
      pricing: productData.pricing || [],
      description: productData.description
    };
    
    if (editingProduct) {
      // 更新処理
      switch (productCategory) {
        case 'exterior':
          updateExteriorProduct(editingProduct.id, newProduct);
          break;
        case 'interior':
          updateInteriorProduct(editingProduct.id, newProduct);
          break;
        case 'water':
          updateWaterProduct(editingProduct.id, newProduct);
          break;
      }
    } else {
      // 新規追加処理
      switch (productCategory) {
        case 'exterior':
          addExteriorProduct(newProduct);
          break;
        case 'interior':
          addInteriorProduct(newProduct);
          break;
        case 'water':
          addWaterProduct(newProduct);
          break;
      }
    }
    
    setShowProductForm(false);
    setEditingProduct(undefined);
  };
  
  // 商品の削除処理
  const handleDeleteProduct = (productId: string) => {
    if (confirm('この商品を削除してもよろしいですか？')) {
      switch (productCategory) {
        case 'exterior':
          deleteExteriorProduct(productId);
          break;
        case 'interior':
          deleteInteriorProduct(productId);
          break;
        case 'water':
          deleteWaterProduct(productId);
          break;
      }
    }
  };
  
  // 商品の編集開始
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };
  
  // 新規商品追加開始
  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowProductForm(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LIFE X 管理ダッシュボード</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">
              現在のバージョン: <span className="font-semibold">{currentVersion}</span>
            </span>
            <span className="text-sm text-gray-600">
              最終更新: {new Date().toLocaleDateString('ja-JP')}
            </span>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              商品管理
            </div>
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'statistics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              統計ダッシュボード
            </div>
          </button>
          <button
            onClick={() => setActiveTab('adoption')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'adoption'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              採用統計
            </div>
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'versions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              バージョン履歴
            </div>
          </button>
        </div>
        
        {/* 商品管理 */}
        {activeTab === 'products' && (
          <div>
            {/* カテゴリ選択と検索バー */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setProductCategory('exterior')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    productCategory === 'exterior'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  エクステリア
                </button>
                <button
                  onClick={() => setProductCategory('interior')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    productCategory === 'interior'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  インテリア
                </button>
                <button
                  onClick={() => setProductCategory('water')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    productCategory === 'water'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  水廻り
                </button>
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="商品を検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button variant="primary" onClick={handleAddProduct}>
                  <Plus className="w-4 h-4 mr-2" />
                  新規商品追加
                </Button>
              </div>
            </div>
            
            {/* 商品リスト */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        商品名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        カテゴリ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        メーカー
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        価格 (LACIE/HOURS)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タイプ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          商品が見つかりません
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.categoryName} / {product.subcategory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.manufacturer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.pricing.find(p => p.plan === 'LACIE')?.price || 0)} / 
                            {formatPrice(product.pricing.find(p => p.plan === 'HOURS')?.price || 0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.isOption 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {product.isOption ? 'オプション' : '標準'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* 商品数の表示 */}
            <div className="mt-4 text-sm text-gray-600">
              合計 {filteredProducts.length} 件の商品
            </div>
          </div>
        )}
        
        {/* 統計ダッシュボード */}
        {activeTab === 'statistics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">年間確定数</h3>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {statistics.totalConfirmedOrders}
              </p>
              <p className="text-sm text-gray-600 mt-2">件の仕様が確定済み</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">年間売上</h3>
                <BarChart3 className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(statistics.yearlyTotal)}
              </p>
              <p className="text-sm text-gray-600 mt-2">オプション売上総額</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">平均単価</h3>
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(statistics.averageOrderValue)}
              </p>
              <p className="text-sm text-gray-600 mt-2">1件あたりの平均</p>
            </Card>
            
            <div className="md:col-span-3">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">月別売上推移</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {statistics.monthlyData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{
                          height: `${(data.total / Math.max(...statistics.monthlyData.map(d => d.total))) * 100}%`
                        }}
                      />
                      <span className="text-xs text-gray-600 mt-2">{data.month}月</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {/* バージョン履歴 */}
        {activeTab === 'versions' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">バージョン履歴</h2>
            <div className="space-y-4">
              {versions.map((version) => (
                <Card key={version.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        バージョン {version.version}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{version.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        作成者: {version.createdBy} | 
                        日時: {new Date(version.createdAt).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    {version.isActive && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        現在のバージョン
                      </span>
                    )}
                  </div>
                  {version.changes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">変更内容:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {version.changes.map((change, idx) => (
                          <li key={idx}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* 採用統計 */}
        {activeTab === 'adoption' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">商品採用統計</h2>
            
            {/* TOP採用商品 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">人気商品TOP10</h3>
              <Card className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        順位
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        商品名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        カテゴリ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        採用回数
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        売上合計
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getTopProducts(10).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          まだ採用データがありません
                        </td>
                      </tr>
                    ) : (
                      getTopProducts(10).map((product, index) => (
                        <tr key={product.productId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}位
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.categoryName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.adoptionCount}回
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.totalRevenue)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </Card>
            </div>
            
            {/* カテゴリ別統計 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getCategoryStats().map((stat) => (
                <Card key={stat.category} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{stat.category}</h3>
                    <Package className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.count}回
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    売上: {formatPrice(stat.revenue)}
                  </p>
                </Card>
              ))}
            </div>
            
            {/* 月別採用推移 */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">月別採用推移</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {getMonthlyStats().map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{
                        height: `${data.count > 0 ? (data.count / Math.max(...getMonthlyStats().map(d => d.count), 1)) * 100 : 0}%`
                      }}
                    />
                    <span className="text-xs text-gray-600 mt-2">{data.month}月</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
      
      {/* 商品フォームモーダル */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(undefined);
          }}
        />
      )}
    </div>
  );
};