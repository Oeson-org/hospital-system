import { format } from 'date-fns';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { appointments } from '../../__mocks__/appointments'

export const Appointments = (props) => (

  <Card {...props}>
    <CardHeader title="Appointments" />
    <PerfectScrollbar>
      <Box sx={{ maxWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Appoiment Ref
              </TableCell>
              <TableCell>
                Patient Name
              </TableCell>
              <TableCell sortDirection="asc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="asc"
                  // onClick={''}
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                hover
                key={appointment.id}
              >
                <TableCell>
                  {appointment.ref}
                </TableCell>
                <TableCell>
                  {appointment.customer.name}
                </TableCell>
                <TableCell>
                  {format(appointment.createdAt, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(appointment.status === 'Finished' && 'success')
                      || (appointment.status === 'Canceled' && 'error')
                      || 'warning'}
                  >
                    {appointment.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 3
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
        href="/queries"
      >
        View all
      </Button>
    </Box>
  </Card >
);
