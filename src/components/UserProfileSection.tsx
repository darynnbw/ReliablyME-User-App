import React from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Button, Menu, MenuItem } from '@mui/material';
import { Phone, TableChart, ListAlt, Download } from '@mui/icons-material';

interface UserProfileSectionProps {
  name: string;
  phone: string;
  displayMode: 'regular' | 'table';
  onToggleDisplayMode: (mode: 'regular' | 'table') => void;
  onExportCsv: () => void;
  onExportXlsx: () => void;
  showExportOptions: boolean; // New prop to control visibility of export button
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  name,
  phone,
  displayMode,
  onToggleDisplayMode,
  onExportCsv,
  onExportXlsx,
  showExportOptions,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExportCsv = () => {
    onExportCsv();
    handleMenuClose();
  };

  const handleExportXlsx = () => {
    onExportXlsx();
    handleMenuClose();
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        bgcolor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8eaed',
        mb: 4,
        gap: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 0.5 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: '1.75rem' }}>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem' }}>
            {phone}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <FormControlLabel
          control={
            <Switch
              checked={displayMode === 'table'}
              onChange={() => onToggleDisplayMode(displayMode === 'table' ? 'regular' : 'table')}
              icon={<ListAlt />}
              checkedIcon={<TableChart />}
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: '#ff7043', // Regular mode icon color
                },
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#1976d2', // Table mode icon color
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#e0e0e0', // Track color
                },
                '& .MuiSwitch-thumb': {
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                },
              }}
            />
          }
          label={displayMode === 'table' ? 'Table Mode' : 'Regular Mode'}
          labelPlacement="start"
          sx={{ m: 0 }}
        />

        {showExportOptions && (
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleMenuClick}
            sx={{
              bgcolor: '#607d8b',
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#546e7a' },
            }}
          >
            Export
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'export-button',
          }}
        >
          <MenuItem onClick={handleExportCsv}>Save as CSV</MenuItem>
          <MenuItem onClick={handleExportXlsx}>Save as XLSX</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default UserProfileSection;