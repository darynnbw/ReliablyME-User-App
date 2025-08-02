import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';
import { Box, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 600 }}>
          Reliably<Typography component="span" sx={{ color: '#ff7043', fontWeight: 600 }}>ME</Typography>
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Sign in to your dashboard
        </Typography>
      </Box>
      <Box sx={{ width: '100%', maxWidth: '400px', p: 4, bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="light"
        />
      </Box>
    </Box>
  );
};

export default Login;