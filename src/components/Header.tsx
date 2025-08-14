import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Avatar,
  Typography,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Star, Plus, ChevronDown } from 'lucide-react';
import { Logout } from '@mui/icons-material';
import CommitmentActionModal from './CommitmentActionModal';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'promise' | 'request'>('promise');
  const open = Boolean(anchorEl);

  const handleCloseModal = useCallback(() => setModalOpen(false), []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type: 'promise' | 'request') => {
    setModalType(type);
    setModalOpen(true);
    handleClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // In a real app, you would handle logout logic here
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Replaced text logo with image */}
              <img
                src="/images/reliablyme-logo.png"
                alt="ReliablyME Logo"
                style={{ height: '40px', width: 'auto' }} // Adjust height as needed
              />
            </Box>
            
            <Chip
              icon={<Star size={16} />}
              label="Classic"
              variant="outlined"
              sx={{
                bgcolor: '#fff3e0',
                borderColor: '#ff7043',
                color: '#ff7043',
                '& .MuiChip-icon': {
                  color: '#ff7043',
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              endIcon={<ChevronDown size={16} />}
              onClick={handleClick}
              sx={{
                bgcolor: '#1976d2',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Create Commitment
            </Button>
            
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: anchorEl?.offsetWidth || 'auto',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem 
                onClick={() => handleMenuItemClick('promise')}
                sx={{ 
                  py: 1.5, 
                  px: 3,
                  textAlign: 'left',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <Typography sx={{ 
                  fontWeight: 500, 
                  fontSize: '18px',
                  color: '#333',
                  textAlign: 'left',
                  width: '100%'
                }}>
                  Make a Promise
                </Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => handleMenuItemClick('request')}
                sx={{ 
                  py: 1.5, 
                  px: 3,
                  textAlign: 'left',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <Typography sx={{ 
                  fontWeight: 500, 
                  fontSize: '18px',
                  color: '#333',
                  textAlign: 'left',
                  width: '100%'
                }}>
                  Request a Commitment
                </Typography>
              </MenuItem>
            </Menu>
            
            <Avatar
              sx={{
                bgcolor: '#ff7043',
                width: 40,
                height: 40,
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout} size="small">
                  <Logout sx={{ color: 'text.secondary' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <CommitmentActionModal
        open={modalOpen}
        onClose={handleCloseModal}
        type={modalType}
      />
    </>
  );
};

export default Header;