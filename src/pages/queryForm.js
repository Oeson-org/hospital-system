import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';
import {  Box,  Container,  Grid,  Typography } from '@mui/material';
import { TheQueryForm } from '../components/query/query-form-details';

const QueryForm = () => (
    <>
      <Head>
        <title>
          Query Form
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
            Create a New Query
          </Typography>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <TheQueryForm/>
          </Grid>
  
        </Container>
      </Box>
    </>
);
 
QueryForm.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
  
export default QueryForm;



