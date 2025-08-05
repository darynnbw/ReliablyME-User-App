import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportDataRow {
  [key: string]: any;
}

export const exportToCsv = (data: ExportDataRow[], filename: string, headers: string[]) => {
  const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

export const exportToXlsx = (data: ExportDataRow[], filename: string, headers: string[]) => {
  const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
};

export const exportToPdf = (data: ExportDataRow[], filename: string, headers: string[]) => {
  const doc = new jsPDF();

  const tableColumn = headers;
  const tableRows: any[] = [];

  data.forEach(item => {
    const rowData: any[] = [];
    headers.forEach(header => {
      rowData.push(item[header]);
    });
    tableRows.push(rowData);
  });

  (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save(`${filename}.pdf`);
};