import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportDataRow {
  [key: string]: any;
}

interface ExportSheet {
  sheetName: string;
  data: ExportDataRow[];
}

// This function now accepts an array of sheets for multi-file CSV export
export const exportToCsv = (sheets: ExportSheet[], baseFilename: string) => {
  sheets.forEach(sheet => {
    if (sheet.data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(sheet.data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const filename = `${baseFilename}_${sheet.sheetName.replace(/\s/g, '_')}.csv`;
      saveAs(blob, filename);
    }
  });
};

// This function now accepts an array of sheets for multi-sheet XLSX export
export const exportToXlsx = (sheets: ExportSheet[], baseFilename: string) => {
  const wb = XLSX.utils.book_new();
  sheets.forEach(sheet => {
    if (sheet.data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
    }
  });
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${baseFilename}.xlsx`);
};

// This function now accepts an array of sheets for multi-table PDF export
export const exportToPdf = (sheets: ExportSheet[], baseFilename: string) => {
  const doc = new jsPDF('landscape');
  let firstTable = true;

  sheets.forEach(sheet => {
    if (sheet.data.length > 0) {
      if (!firstTable) {
        doc.addPage(); // Add a new page for subsequent tables
      }
      firstTable = false;

      const tableColumn = Object.keys(sheet.data[0]);
      const tableRows: any[][] = sheet.data.map(item => Object.values(item));

      // Add a title for each section
      doc.setFontSize(16);
      doc.text(sheet.sheetName, 14, 15); // Position title

      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20, // Start below the title
        margin: { top: 20 },
      });
    }
  });

  if (firstTable) { // If no data was added, save an empty PDF
    doc.save(`${baseFilename}.pdf`);
  } else {
    doc.save(`${baseFilename}.pdf`);
  }
};