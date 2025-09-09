import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { CartItem } from '../types/product';

// 日本語フォントの設定（実際のプロジェクトではフォントファイルを追加）
const setupJapaneseFont = (_pdf: jsPDF) => {
  // フォントの設定が必要な場合はここで行う
  // 現状はデフォルトフォントを使用
};

export const exportToExcel = (
  items: CartItem[],
  customerName: string,
  projectName: string
) => {
  // ワークブックの作成
  const wb = XLSX.utils.book_new();
  
  // ヘッダー情報
  const headerData = [
    ['工事御見積書'],
    [''],
    [`お客様名: ${customerName}`],
    [`工事名: ${projectName}`],
    [`見積作成日: ${new Date().toLocaleDateString('ja-JP')}`],
    [''],
    ['区分', 'No.', '工事内容', '数量', '単位', '見積単価', '見積金額', '備考']
  ];

  // 商品データの整形
  const productData = items.map((item, index) => [
    item.product.categoryName,
    index + 1,
    item.product.name,
    item.quantity,
    item.product.unit,
    item.product.pricing.find(p => p.planId === 'LACIE')?.price || 0,
    (item.product.pricing.find(p => p.planId === 'LACIE')?.price || 0) * item.quantity,
    item.product.description || ''
  ]);

  // 合計行
  const total = items.reduce((sum, item) => {
    const price = item.product.pricing.find(p => p.planId === 'LACIE')?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const taxAmount = Math.floor(total * 0.1);
  const totalWithTax = total + taxAmount;

  const footerData = [
    [''],
    ['', '', '', '', '', '小計', total],
    ['', '', '', '', '', '消費税(10%)', taxAmount],
    ['', '', '', '', '', '合計', totalWithTax]
  ];

  // データを結合
  const wsData = [...headerData, ...productData, ...footerData];
  
  // ワークシートの作成
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // 列幅の設定
  ws['!cols'] = [
    { wch: 15 }, // 区分
    { wch: 8 },  // No.
    { wch: 40 }, // 工事内容
    { wch: 10 }, // 数量
    { wch: 10 }, // 単位
    { wch: 15 }, // 見積単価
    { wch: 15 }, // 見積金額
    { wch: 20 }  // 備考
  ];
  
  // ワークシートをワークブックに追加
  XLSX.utils.book_append_sheet(wb, ws, '見積書');
  
  // ファイルのダウンロード
  XLSX.writeFile(wb, `見積書_${customerName}_${new Date().getTime()}.xlsx`);
};

export const exportToPDF = (
  items: CartItem[],
  customerName: string,
  projectName: string
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // 日本語フォントの設定
  setupJapaneseFont(pdf);
  
  // タイトル
  pdf.setFontSize(20);
  pdf.text('工事御見積書', 105, 20, { align: 'center' });
  
  // ヘッダー情報
  pdf.setFontSize(12);
  pdf.text(`お客様名: ${customerName}`, 20, 40);
  pdf.text(`工事名: ${projectName}`, 20, 48);
  pdf.text(`見積作成日: ${new Date().toLocaleDateString('ja-JP')}`, 20, 56);
  
  // 会社情報
  pdf.text('株式会社 Gハウス', 20, 70);
  pdf.setFontSize(10);
  pdf.text('一級建築士事務所 大阪府知事（チ）第12462号', 20, 78);
  pdf.text('宅地建物取引業 大阪府知事（4）第53697号', 20, 84);
  pdf.text('建築業許可 大阪府知事免許（般-4）第129490号', 20, 90);
  
  // テーブルデータの準備
  const tableData = items.map((item, index) => {
    const price = item.product.pricing.find(p => p.planId === 'LACIE')?.price || 0;
    return [
      (index + 1).toString(),
      item.product.categoryName,
      item.product.name,
      item.quantity.toString(),
      item.product.unit,
      price.toLocaleString(),
      (price * item.quantity).toLocaleString(),
      item.product.description || ''
    ];
  });

  // 合計計算
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.pricing.find(p => p.planId === 'LACIE')?.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  // テーブルの描画
  (pdf as any).autoTable({
    startY: 100,
    head: [['No.', '区分', '工事内容', '数量', '単位', '単価', '金額', '備考']],
    body: tableData,
    foot: [
      ['', '', '', '', '', '小計', subtotal.toLocaleString(), ''],
      ['', '', '', '', '', '消費税', tax.toLocaleString(), ''],
      ['', '', '', '', '', '合計', total.toLocaleString(), '']
    ],
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    footStyles: {
      fillColor: [245, 245, 245],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    }
  });

  // 合計金額の表示
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  const finalY = (pdf as any).lastAutoTable.finalY + 10;
  pdf.text(`総合計: ¥${total.toLocaleString()}`, 150, finalY);
  pdf.text(`(税込)`, 150, finalY + 6);
  
  // PDFのダウンロード
  pdf.save(`見積書_${customerName}_${new Date().getTime()}.pdf`);
};