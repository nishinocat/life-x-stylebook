import React, { useState } from 'react';
import { Plus, Edit, Trash2, BarChart3, Package, Bell } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useVersionStore } from '../../stores/useVersionStore';
import { useOrderStore } from '../../stores/useOrderStore';
import { formatPrice } from '../../lib/utils';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'statistics' | 'versions'>('statistics');
  const currentVersion = useVersionStore((state) => state.currentVersion);
  const versions = useVersionStore((state) => state.getVersionHistory());
  const statistics = useOrderStore((state) => state.getStatistics());
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">管理者ダッシュボード</h1>
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
                <h3 className="text-lg font-semibold text-gray-900">月平均</h3>
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(statistics.monthlyAverage)}
              </p>
              <p className="text-sm text-gray-600 mt-2">月間平均売上</p>
            </Card>
            
            {/* グラフエリア */}
            <div className="col-span-full">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">月別確定推移</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {Array.from({ length: 12 }, (_, i) => {
                    const height = Math.random() * 100 + 20;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-semibold">{Math.floor(height / 10)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {/* 商品管理 */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">商品一覧</h2>
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                新規商品追加
              </Button>
            </div>
            
            <Card className="overflow-hidden">
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
                      価格
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      突板銘木フローリング
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      床材
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥6,000 / ㎡
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        有効
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
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
                      <ul className="text-sm text-gray-600 space-y-1">
                        {version.changes.slice(0, 3).map((change) => (
                          <li key={change.id}>
                            • {change.type === 'add' ? '追加' : change.type === 'update' ? '更新' : '削除'}: 
                            {change.entityType}
                          </li>
                        ))}
                        {version.changes.length > 3 && (
                          <li>• 他 {version.changes.length - 3} 件の変更</li>
                        )}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};