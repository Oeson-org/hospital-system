import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { QueryListResults } from '../components/query/query-list-results';
import { QueryListToolbar } from '../components/query/query-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { queries } from '../__mocks__/queries';

const Queries = () => (
  <>
    <Head>
      <title>
        Queries
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={true}>
        <QueryListToolbar />
        <Box sx={{ mt: 2 }}>
          <QueryListResults queries={queries} />
        </Box>
      </Container>
    </Box>
  </>
);
Queries.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Queries;
