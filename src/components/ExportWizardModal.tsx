import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  CircularProgress,
  Grid,
  Accordion, // Added Accordion
  AccordionSummary, // Added AccordionSummary
  AccordionDetails, // Added AccordionDetails
} from '@mui/material';
import { Close, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'; // Added ExpandMoreIcon
import { exportToCsv, exportToPdf, exportToXlsx } from '../utils/exportUtils';

interface Commitment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  assignee: string;
  committedDate?: string;
  approvedDate?: string;
  type?: string;
  nudgesLeft?: number;
  totalNudges?: number;
  isExternal?: boolean;
  questions?: string[];
  explanation?: string;
  responses?: { date: string; answer: string; questions?: string[] }[];
  isOverdue?: boolean;
}

interface ExportWizardModalProps {
  open: boolean;
  onClose: () => void;
  dataSources: {
    myCommitments: { [key: string]: Commitment[] };
    othersCommitments: { [key: string]: Commitment[] };
  };
}

const allExportFields = [
  { id: 'title', label: 'Badge Title' },
  { id: 'description', label: 'Commitment Description' },
  { id: 'explanation', label: 'Explanation (for Badges)' },
  { id: 'assignee', label: 'Party Involved' },
  { id: 'committedDate', label: 'Committed Date' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'approvedDate', label: 'Approved Date' },
  { id: 'type', label: 'Commitment Type' },
  { id: 'nudgesInfo', label: 'Nudges Info (for Nudges)' },
  { id: 'responses', label: 'Nudge Responses (for Nudges)' },
  { id: 'isOverdue', label: 'Overdue Status' },
  { id: 'isExternal', label: 'External Party' },
];

// Define the groups and their fields for rendering
const fieldGroupsConfig = [
  {
    id: 'badgeInfo',
    title: 'Badge Information',
    fields: ['title', 'explanation', 'approvedDate'],
    expandedByDefault: true,
  },
  {
    id: 'commitmentDetails',
    title: 'Commitment Details',
    fields: ['description', 'committedDate', 'dueDate', 'type', 'nudgesInfo', 'responses', 'isOverdue'],
    expandedByDefault: true,
  },
  {
    id: 'parties',
    title: 'Parties',
    fields: ['assignee', 'isExternal'],
    expandedByDefault: false,
  },
];

// Define the new interfaces for structured export
interface ExportDataRow {
  [key: string]: any;
}

interface ExportSection {
  type: 'data' | 'title';
  content: ExportDataRow[] | string;
  headers?: string[];
}

interface ExportSheet {
  sheetName: string;
  sections: ExportSection[];
}

const ExportWizardModal: React.FC<ExportWizardModalProps> = ({ open, onClose, dataSources }) => {
  const [step, setStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf' | 'xlsx'>('csv');
  const [selectedScopes, setSelectedScopes] = useState<{
    myCommitments: { [key: string]: boolean };
    othersCommitments: { [key: string]: boolean };
  }>({ myCommitments: {}, othersCommitments: {} });
  const [relevantFields, setRelevantFields] = useState(allExportFields);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({}); // State for accordion expanded status

  const totalSteps = 5; // Define total steps

  const resetState = useCallback(() => {
    setStep(1);
    setSelectedFormat('csv');
    const myCommitmentScopes = Object.keys(dataSources.myCommitments).reduce((acc, key) => ({ ...acc, [key]: false }), {});
    const othersCommitmentScopes = Object.keys(dataSources.othersCommitments).reduce((acc, key) => ({ ...acc, [key]: false }), {});
    setSelectedScopes({
      myCommitments: myCommitmentScopes,
      othersCommitments: othersCommitmentScopes,
    });
    setRelevantFields(allExportFields);
    setSelectedFields([]);
    setPreviewContent('');
    setIsExporting(false);
    // Initialize expanded groups based on config
    const initialExpanded: Record<string, boolean> = {};
    fieldGroupsConfig.forEach(group => {
      initialExpanded[group.id] = group.expandedByDefault;
    });
    setExpandedGroups(initialExpanded);
  }, [dataSources]);

  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open, resetState]);

  // Helper to format a single Commitment item into an ExportDataRow
  const formatCommitmentToRow = useCallback((item: Commitment, fieldsToInclude: string[]): ExportDataRow => {
    const row: ExportDataRow = {};
    fieldsToInclude.forEach(fieldId => {
      let value: any = (item as any)[fieldId];
      const fieldLabel = allExportFields.find(f => f.id === fieldId)?.label || fieldId;

      if (fieldId === 'nudgesInfo' && item.type === 'nudge') {
        value = `${item.nudgesLeft || 0} of ${item.totalNudges || 0} nudges left`;
      } else if (fieldId === 'responses' && item.responses) {
        value = item.responses.map(r => `${r.date}: ${r.answer}`).join('; ');
      } else if (fieldId === 'isOverdue') {
        value = item.isOverdue ? 'Yes' : 'No';
      } else if (fieldId === 'isExternal') {
        value = item.isExternal ? 'Yes' : 'No';
      }

      if (value !== undefined && value !== null) {
        row[fieldLabel] = value;
      }
    });
    return row;
  }, []);

  const getStructuredDataForExport = useCallback((): ExportSheet[] => {
    const sheets: ExportSheet[] = [];
    const columnHeaders = selectedFields.map(id => allExportFields.find(f => f.id === id)?.label || id);

    // --- My Commitments Sheet ---
    const myCommitmentsSections: ExportSection[] = [];
    for (const key in dataSources.myCommitments) {
      if (selectedScopes.myCommitments[key]) {
        const dataForTab = dataSources.myCommitments[key];
        if (dataForTab.length > 0) {
          myCommitmentsSections.push({ type: 'title', content: key });
          myCommitmentsSections.push({
            type: 'data',
            content: dataForTab.map(item => formatCommitmentToRow(item, selectedFields)),
            headers: columnHeaders,
          });
        }
      }
    }
    if (myCommitmentsSections.length > 0) {
      sheets.push({ sheetName: 'My Commitments', sections: myCommitmentsSections });
    }

    // --- Others' Commitments Sheet ---
    const othersCommitmentsSections: ExportSection[] = [];
    for (const key in dataSources.othersCommitments) {
      if (selectedScopes.othersCommitments[key]) {
        const dataForTab = dataSources.othersCommitments[key];
        if (dataForTab.length > 0) {
          othersCommitmentsSections.push({ type: 'title', content: key });
          othersCommitmentsSections.push({
            type: 'data',
            content: dataForTab.map(item => formatCommitmentToRow(item, selectedFields)),
            headers: columnHeaders,
          });
        }
      }
    }
    if (othersCommitmentsSections.length > 0) {
      sheets.push({ sheetName: 'Others\' Commitments', sections: othersCommitmentsSections });
    }

    return sheets;
  }, [dataSources, selectedScopes, selectedFields, formatCommitmentToRow]);

  useEffect(() => {
    if (step === 3) {
      const scopes = [
        ...Object.keys(selectedScopes.myCommitments).filter(k => selectedScopes.myCommitments[k]),
        ...Object.keys(selectedScopes.othersCommitments).filter(k => selectedScopes.othersCommitments[k]),
      ];

      const fields = new Set<string>(['title', 'description', 'assignee', 'committedDate', 'dueDate']);
      
      // Add fields relevant to badges (explanation, approvedDate)
      if (scopes.some(s => s.includes('Badge') || s.includes('Issued'))) {
        fields.add('explanation');
        fields.add('approvedDate');
      }

      // Determine if any selected data contains nudges to include nudge-specific fields
      const combinedData = getStructuredDataForExport().flatMap(sheet => 
        sheet.sections.flatMap(section => (section.type === 'data' ? section.content : []))
      );
      const hasNudges = combinedData.some(item => (item as Commitment).type === 'nudge');

      if (hasNudges) {
        fields.add('type'); // 'type' field itself is useful for nudges
        fields.add('nudgesInfo');
        fields.add('responses');
      }

      // Add fields relevant to unkept promises
      if (scopes.some(s => s.includes('Unkept'))) {
        fields.add('isOverdue');
      }
      fields.add('isExternal'); // Always add isExternal as it's a general property

      const newRelevantFields = allExportFields.filter(f => fields.has(f.id));
      setRelevantFields(newRelevantFields);
      setSelectedFields(newRelevantFields.map(f => f.id));
    }
  }, [step, selectedScopes, getStructuredDataForExport]); // Updated dependency

  const handleNext = () => {
    if (step === 3) {
      generatePreview();
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);
  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedFormat(event.target.value as 'csv' | 'pdf' | 'xlsx');
  const handleFieldToggle = (fieldId: string) => setSelectedFields(prev => prev.includes(fieldId) ? prev.filter(id => id !== fieldId) : [...prev, fieldId]);
  const handleSelectAllFields = () => setSelectedFields(relevantFields.map(f => f.id));
  const handleDeselectAllFields = () => setSelectedFields([]);

  const handleParentCheckboxChange = (group: 'myCommitments' | 'othersCommitments', checked: boolean) => {
    setSelectedScopes(prev => ({
      ...prev,
      [group]: Object.keys(prev[group]).reduce((acc, key) => ({ ...acc, [key]: checked }), {}),
    }));
  };

  const handleChildCheckboxChange = (group: 'myCommitments' | 'othersCommitments', key: string, checked: boolean) => {
    setSelectedScopes(prev => ({
      ...prev,
      [group]: { ...prev[group], [key]: checked },
    }));
  };

  const generatePreview = useCallback(() => {
    const dataToPreview = getStructuredDataForExport();
    const previewLines: string[] = [];
    previewLines.push(`Export Format: ${selectedFormat.toUpperCase()}`);
    previewLines.push(`Selected Fields: ${selectedFields.map(id => allExportFields.find(f => f.id === id)?.label || id).join(', ')}`);
    
    dataToPreview.forEach(sheet => {
      previewLines.push(`\n=== ${sheet.sheetName} ===`); // Main sheet title
      sheet.sections.forEach(section => {
        if (section.type === 'title') {
          previewLines.push(`\n--- ${section.content} ---`); // Sub-section title
        } else if (section.type === 'data' && Array.isArray(section.content)) {
          section.content.slice(0, 2).forEach((record, index) => { // Show first 2 records per data section
            previewLines.push(`  Record ${index + 1}:`);
            Object.entries(record).forEach(([key, value]) => {
              let displayValue = value;
              if (typeof value === 'string' && value.length > 100) displayValue = value.substring(0, 97) + '...';
              previewLines.push(`    ${key}: ${displayValue}`);
            });
          });
        }
      });
    });
    setPreviewContent(previewLines.join('\n'));
  }, [getStructuredDataForExport, selectedFormat, selectedFields]);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const sheetsToExport = getStructuredDataForExport();
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for UX
      if (selectedFormat === 'csv') exportToCsv(sheetsToExport, 'Commitment_Portfolio');
      else if (selectedFormat === 'xlsx') exportToXlsx(sheetsToExport, 'Commitment_Portfolio');
      else if (selectedFormat === 'pdf') exportToPdf(sheetsToExport, 'Commitment_Portfolio');
      onClose();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderScopeSelector = (title: string, group: 'myCommitments' | 'othersCommitments') => {
    const groupScopes = selectedScopes[group];
    const selectedCount = Object.values(groupScopes).filter(Boolean).length;
    const totalCount = Object.keys(groupScopes).length;
    const isChecked = totalCount > 0 && selectedCount === totalCount;
    const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

    return (
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={isChecked} indeterminate={isIndeterminate} onChange={(e) => handleParentCheckboxChange(group, e.target.checked)} />}
          label={<Typography variant="body1" sx={{ fontWeight: 600 }}>{title}</Typography>}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {Object.keys(groupScopes).map(key => (
            <FormControlLabel
              key={key}
              control={<Checkbox checked={groupScopes[key] || false} onChange={(e) => handleChildCheckboxChange(group, key, e.target.checked)} />}
              label={key}
            />
          ))}
        </Box>
      </Box>
    );
  };

  const isNextDisabled = () => {
    if (step === 2) {
      const myValues = Object.values(selectedScopes.myCommitments);
      const othersValues = Object.values(selectedScopes.othersCommitments);
      return ![...myValues, ...othersValues].some(Boolean);
    }
    if (step === 3) {
      return selectedFields.length === 0;
    }
    return false;
  };

  // Helper to filter relevantFields into their respective groups
  const getFieldsForGroup = (groupFields: string[]) => {
    return relevantFields.filter(field => groupFields.includes(field.id));
  };

  const handleAccordionChange = (panelId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedGroups(prev => ({
      ...prev,
      [panelId]: isExpanded,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          maxWidth: '700px',
          maxHeight: '90vh', // Adjusted max height to ensure header/footer visibility
          height: 'auto',
          display: 'flex', // Ensure flex container for content
          flexDirection: 'column', // Stack children vertically
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2, flexShrink: 0 }}> {/* flexShrink to keep it from shrinking */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>Export ({step} of {totalSteps})</Typography>
          <IconButton onClick={onClose} sx={{ color: '#666' }}><Close /></IconButton>
        </Box>
      </DialogTitle>
      <Divider sx={{ mb: 2, borderColor: '#e0e0e0', flexShrink: 0 }} /> {/* flexShrink */}
      <DialogContent sx={{
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        flex: 1, // Allows content to grow and take available space
        overflowY: 'auto', // Enables scrolling only for the content area
      }}>
        {step === 1 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Choose Export Format</Typography>
            <RadioGroup value={selectedFormat} onChange={handleFormatChange}>
              <FormControlLabel value="csv" control={<Radio />} label="CSV (Comma Separated Values)" />
              <FormControlLabel value="xlsx" control={<Radio />} label="XLSX (Excel Spreadsheet)" />
              <FormControlLabel value="pdf" control={<Radio />} label="PDF (Portable Document Format)" />
            </RadioGroup>
          </Box>
        )}
        {step === 2 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Select Data to Export</Typography>
            {renderScopeSelector('My Commitments', 'myCommitments')}
            {renderScopeSelector('Others’ Commitments', 'othersCommitments')}
          </Box>
        )}
        {step === 3 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Select Fields to Include</Typography>
            <Box sx={{ mb: 2 }}>
              <Button onClick={handleSelectAllFields} size="small" sx={{ mr: 1, px: 3 }}>Select All</Button>
              <Button onClick={handleDeselectAllFields} size="small" sx={{ px: 3 }}>Deselect All</Button>
            </Box>
            <FormGroup>
              {fieldGroupsConfig.map((group) => {
                const fieldsInThisGroup = getFieldsForGroup(group.fields);
                if (fieldsInThisGroup.length === 0) return null;

                return (
                  <Accordion
                    key={group.id}
                    expanded={expandedGroups[group.id]}
                    onChange={handleAccordionChange(group.id)}
                    sx={{
                      boxShadow: 'none',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      mb: 1.5,
                      '&:before': { display: 'none' }, // Remove default Accordion border
                      '&.Mui-expanded': {
                        margin: '1.5px 0', // Adjust margin when expanded to prevent jumping
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        minHeight: 48,
                        '& .MuiAccordionSummary-content': {
                          my: 1,
                        },
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {group.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                      <Grid container spacing={1}>
                        {fieldsInThisGroup.map(field => (
                          <Grid item xs={12} sm={6} key={field.id}>
                            <FormControlLabel
                              control={<Checkbox checked={selectedFields.includes(field.id)} onChange={() => handleFieldToggle(field.id)} />}
                              label={field.label}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </FormGroup>
          </Box>
        )}
        {step === 4 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Preview Export</Typography>
            <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 2, border: '1px solid #e9ecef', maxHeight: 300, overflowY: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#333' }}>
              {previewContent}
            </Box>
          </Box>
        )}
        {step === 5 && (
          <Box sx={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Confirm and Download</Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>Your export is ready. Click 'Download' to save the file.</Typography>
            {isExporting && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}><CircularProgress size={24} /><Typography variant="body2" sx={{ ml: 2 }}>Preparing your file...</Typography></Box>}
          </Box>
        )}
      </DialogContent>
      <Box sx={{ display: 'flex', gap: 2, mt: 'auto', pt: 3, flexShrink: 0 }}> {/* flexShrink */}
        {step > 1 && <Button variant="outlined" onClick={handleBack} sx={{ textTransform: 'none', px: 4, py: 1.5, borderRadius: 2, flex: 1 }}>Back</Button>}
        {step < 5 && <Button variant="contained" onClick={handleNext} disabled={isNextDisabled()} sx={{ bgcolor: '#1976d2', color: 'white', textTransform: 'none', px: 4, py: 1.5, borderRadius: 2, '&:hover': { bgcolor: '#1565c0' }, flex: 1 }}>Next</Button>}
        {step === 5 && <Button variant="contained" onClick={handleDownload} disabled={isExporting} sx={{ bgcolor: '#4caf50', color: 'white', textTransform: 'none', px: 4, py: 1.5, borderRadius: 2, '&:hover': { bgcolor: '#388e3c' }, flex: 1 }}>Download</Button>}
      </Box>
    </Dialog>
  );
};

export default ExportWizardModal;