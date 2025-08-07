import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportDataRow {
  [key: string]: any;
}

// This function now expects data objects where keys are the column headers
export const exportToCsv = (data: ExportDataRow[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

// This function now expects data objects where keys are the column headers
export const exportToXlsx = (data: ExportDataRow[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
};

// This function now derives headers and rows from the data objects
export const exportToPdf = (data: ExportDataRow[], filename: string) => {
  const doc = new jsPDF('landscape'); // Changed to landscape
  if (data.length === 0) {
    doc.save(`${filename}.pdf`);
    return;
  }

  const tableColumn = Object.keys(data[0]);
  const tableRows: any[][] = data.map(item => Object.values(item));

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });
  doc.save(`${filename}.pdf`);
};