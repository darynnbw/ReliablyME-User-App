import React, { useState, useCallback } from 'react';
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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { exportToCsv, exportToPdf } from '../utils/exportUtils';

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
  responses?: { date: string; answer: string }[];
  isOverdue?: boolean;
}

interface ExportWizardModalProps {
  open: boolean;
  onClose: () => void;
  data: Commitment[];
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

const ExportWizardModal: React.FC<ExportWizardModalProps> = ({ open, onClose, data }) => {
  const [step, setStep] = useState(1); // 1: Choose Format, 2: Select Fields, 3: Preview, 4: Confirm & Download
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('csv');
  const [selectedFields, setSelectedFields] = useState<string[]>(allExportFields.map(f => f.id));
  const [previewContent, setPreviewContent] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);

  const handleClose = useCallback(() => {
    setStep(1);
    setSelectedFormat('csv');
    setSelectedFields(allExportFields.map(f => f.id));
    setPreviewContent('');
    setIsExporting(false);
    onClose();
  }, [onClose]);

  const handleNext = () => {
    if (step === 2) {
      generatePreview();
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFormat(event.target.value as 'csv' | 'pdf');
  };

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldId) ? prev.filter(id => id !== fieldId) : [...prev, fieldId]
    );
  };

  const handleSelectAllFields = () => {
    setSelectedFields(allExportFields.map(f => f.id));
  };

  const handleDeselectAllFields = () => {
    setSelectedFields([]);
  };

  const generatePreview = () => {
    // This is a simplified preview. For a real app, you might render a small table.
    // For now, just show a summary of selected fields and format.
    const previewLines: string[] = [];
    previewLines.push(`Export Format: ${selectedFormat.toUpperCase()}`);
    previewLines.push(`Selected Fields: ${selectedFields.map(id => allExportFields.find(f => f.id === id)?.label || id).join(', ')}`);
    previewLines.push(`Number of records: ${data.length}`);
    previewLines.push('\n--- Sample Data (first 2 records) ---');

    const sampleData = data.slice(0, 2);
    sampleData.forEach((record, index) => {
      previewLines.push(`\nRecord ${index + 1}:`);
      selectedFields.forEach(field => {
        let value: any = (record as any)[field];
        if (field === 'nudgesInfo' && record.type === 'nudge') {
          value = `${record.nudgesLeft || 0} of ${record.totalNudges || 0} nudges left`;
        } else if (field === 'responses' && record.responses) {
          value = record.responses.map(r => `${r.date}: ${r.answer}`).join('; ');
        } else if (field === 'isOverdue') {
          value = record.isOverdue ? 'Yes' : 'No';
        } else if (field === 'isExternal') {
          value = record.isExternal ? 'Yes' : 'No';
        } else if (field === 'description' && record.description.length > 100) {
          value = record.description.substring(0, 97) + '...'; // Truncate for preview
        } else if (field === 'explanation' && record.explanation && record.explanation.length > 100) {
          value = record.explanation.substring(0, 97) + '...'; // Truncate for preview
        }
        if (value !== undefined && value !== null && value !== '') {
          previewLines.push(`  ${allExportFields.find(f => f.id === field)?.label || field}: ${value}`);
        }
      });
    });

    setPreviewContent(previewLines.join('\n'));
  };

  const handleDownload = async () => {
    setIsExporting(true);
    const mappedData = data.map(item => {
      const row: { [key: string]: any } = {};
      selectedFields.forEach(field => {
        switch (field) {
          case 'nudgesInfo':
            row[field] = item.type === 'nudge' ? `${item.nudgesLeft || 0} of ${item.totalNudges || 0} nudges left` : '';
            break;
          case 'responses':
            row[field] = item.responses ? item.responses.map(r => `${r.date}: ${r.answer}`).join('; ') : '';
            break;
          case 'isOverdue':
            row[field] = item.isOverdue ? 'Yes' : 'No';
            break;
          case 'isExternal':
            row[field] = item.isExternal ? 'Yes' : 'No';
            break;
          default:
            row[field] = (item as any)[field] || '';
        }
      });
      return row;
    });

    const headers = selectedFields.map(id => allExportFields.find(f => f.id === id)?.label || id);

    if (selectedFormat === 'csv') {
      exportToCsv(mappedData, 'Commitment_Portfolio', headers);
    } else if (selectedFormat === 'pdf') {
      exportToPdf(mappedData, 'Commitment_Portfolio', headers);
    }
    setIsExporting(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          maxWidth: '700px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '24px' }}>
            Export Wizard - Step {step}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mb: 2, borderColor: '#e0e0e0' }} />

      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {step === 1 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Choose Export Format
            </Typography>
            <RadioGroup value={selectedFormat} onChange={handleFormatChange}>
              <FormControlLabel value="csv" control={<Radio />} label="CSV (Comma Separated Values)" />
              <FormControlLabel value="pdf" control={<Radio />} label="PDF (Portable Document Format)" />
            </RadioGroup>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Select Fields to Include
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Button onClick={handleSelectAllFields} size="small" sx={{ mr: 1 }}>Select All</Button>
              <Button onClick={handleDeselectAllFields} size="small">Deselect All</Button>
            </Box>
            <FormGroup>
              <Grid container spacing={1}>
                {allExportFields.map(field => (
                  <Grid item xs={12} sm={6} key={field.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFields.includes(field.id)}
                          onChange={() => handleFieldToggle(field.id)}
                        />
                      }
                      label={field.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </Box>
        )}

        {step === 3 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Preview Export
            </Typography>
            <Box
              sx={{
                bgcolor: '#f8f9fa',
                p: 2,
                borderRadius: 2,
                border: '1px solid #e9ecef',
                maxHeight: 300,
                overflowY: 'auto',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                fontSize: '0.85rem',
                color: '#333',
              }}
            >
              {previewContent}
            </Box>
          </Box>
        )}

        {step === 4 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Confirm and Download
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Your export is ready. Click 'Download' to save the file.
            </Typography>
            {isExporting && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <CircularProgress size={24} />
                <Typography variant="body2" sx={{ ml: 2 }}>Preparing your file...</Typography>
              </Box>
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 3 }}>
          {step > 1 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ textTransform: 'none', px: 3, borderRadius: 1 }}
            >
              Back
            </Button>
          )}
          {step < 4 && (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={step === 2 && selectedFields.length === 0}
              sx={{
                ml: 'auto',
                bgcolor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                px: 3,
                borderRadius: 1,
                '&:hover': { bgcolor: '#1565c0' },
              }}
            >
              Next
            </Button>
          )}
          {step === 4 && (
            <Button
              variant="contained"
              onClick={handleDownload}
              disabled={isExporting}
              sx={{
                ml: 'auto',
                bgcolor: '#4caf50',
                color: 'white',
                textTransform: 'none',
                px: 3,
                borderRadius: 1,
                '&:hover': { bgcolor: '#388e3c' },
              }}
            >
              Download
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ExportWizardModal;