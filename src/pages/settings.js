import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Button } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsPassword } from '../components/settings/settings-password';

function Settings () {


  const [showEdit, setShowEdit] = useState(false);

  return(
  <>
    <Head>
      <title>
        Settings
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Settings
        </Typography>

        <Box sx={{ pt: 3 }}>
          { showEdit && <SettingsPassword /> }
        </Box>
        { !showEdit && <Button
              component="a"
              sx={{ mt: 3 }}
              variant="outlined"
              onClick={() => setShowEdit(!showEdit)}
            >
              Set Up New Password
        </Button> || showEdit && <Button
              component="a"
              sx={{ mt: 3 }}
              variant="outlined"
              onClick={() => setShowEdit(!showEdit)}
            >
              Cancel Password Setting
        </Button> }
      </Container>
    </Box>
  </>
  )
}

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
