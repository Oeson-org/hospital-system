import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Button } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

export default function Status () {
  const [status, setStatus] = useState(false); 

  return(
  <>
    <Head>
      {(!status && <title>
        Close
      </title>) || (status && <title>
        Open
      </title>) }
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
      {(!status && <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Close
        </Typography>) || 
        (status && <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Open
        </Typography>) }
        
        { !status && <Button
              component="a"
              sx={{ mt: 3 }}
              variant="outlined"
              onClick={() => setStatus(!status)}
            >
              Open Appointment
        </Button> || status && <Button
              component="a"
              sx={{ mt: 3 }}
              variant="outlined"
              onClick={() => setStatus(!status)}
            >
              Close
        </Button> }
      </Container>
    </Box>
  </>
  )
}

Status.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);