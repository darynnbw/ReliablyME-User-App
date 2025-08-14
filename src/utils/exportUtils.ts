import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportDataRow {
  [key: string]: any;
}

interface ExportSection {
  type: 'data' | 'title';
  content: ExportDataRow[] | string; // For 'data', it's rows; for 'title', it's the title string
  headers?: string[]; // Only for 'data' type, if needed for PDF
}

interface ExportSheet {
  sheetName: string;
  sections: ExportSection[]; // Changed from 'data' to 'sections'
}

// Helper to flatten sections into a single array of rows for CSV/XLSX
const flattenSectionsForTabularExport = (sections: ExportSection[]): ExportDataRow[] => {
  const flattenedData: ExportDataRow[] = [];
  sections.forEach(section => {
    if (section.type === 'title') {
      // For CSV/XLSX, a title row can just be a single cell with the title
      flattenedData.push({ 'Section Title': section.content as string });
    } else if (section.type === 'data' && Array.isArray(section.content)) {
      // Add headers if provided, then the data rows
      if (section.headers && section.headers.length > 0) {
        const headerRow: ExportDataRow = {};
        section.headers.forEach(header => {
          headerRow[header] = header; // Use header as both key and value for the header row
        });
        flattenedData.push(headerRow);
      }
      flattenedData.push(...section.content);
    }
  });
  return flattenedData;
};

export const exportToCsv = (sheets: ExportSheet[], baseFilename: string) => {
  sheets.forEach(sheet => {
    if (sheet.sections.length > 0) {
      const flattenedData = flattenSectionsForTabularExport(sheet.sections);
      if (flattenedData.length === 0) return; // Skip if no data after flattening

      const ws = XLSX.utils.json_to_sheet(flattenedData, { skipHeader: true }); // Headers are already in flattenedData
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const filename = `${baseFilename}_${sheet.sheetName.replace(/\s/g, '_')}.csv`;
      saveAs(blob, filename);
    }
  });
};

export const exportToXlsx = (sheets: ExportSheet[], baseFilename: string) => {
  const wb = XLSX.utils.book_new();
  sheets.forEach(sheet => {
    if (sheet.sections.length > 0) {
      const flattenedData = flattenSectionsForTabularExport(sheet.sections);
      if (flattenedData.length === 0) return; // Skip if no data after flattening

      const ws = XLSX.utils.json_to_sheet(flattenedData, { skipHeader: true }); // Headers are already in flattenedData
      XLSX.utils.book_append_sheet(wb, ws, sheet.sheetName);
    }
  });
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${baseFilename}.xlsx`);
};

export const exportToPdf = (sheets: ExportSheet[], baseFilename: string) => {
  const doc = new jsPDF('landscape');
  let firstSheet = true;

  sheets.forEach(sheet => {
    if (sheet.sections.length > 0) {
      if (!firstSheet) {
        doc.addPage(); // Add a new page for subsequent main sheets
      }
      firstSheet = false;

      // Main sheet title
      doc.setFontSize(18);
      doc.text(sheet.sheetName, 14, 15);
      let currentY = 25; // Starting Y position for content

      sheet.sections.forEach(section => {
        if (section.type === 'title') {
          // Add section title
          doc.setFontSize(14);
          doc.text(section.content as string, 14, currentY);
          currentY += 10; // Space after title
        } else if (section.type === 'data' && Array.isArray(section.content) && section.content.length > 0) {
          const tableColumn = section.headers || Object.keys(section.content[0]);
          const tableRows: any[][] = section.content.map(item => Object.values(item));

          (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: currentY,
            margin: { left: 14, right: 14 },
            didDrawPage: (data: any) => {
              currentY = data.cursor.y + 10; // Update currentY for next section/table
            },
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
            headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
            columnStyles: {
              // Example: adjust column width if needed
              // 0: { cellWidth: 30 },
            },
          });
          currentY = (doc as any).autoTable.previous.finalY + 10; // Update Y after table
        }
      });
    }
  });

  if (firstSheet) { // If no data was added, save an empty PDF
    doc.save(`${baseFilename}.pdf`);
  } else {
    doc.save(`${baseFilename}.pdf`);
  }
};