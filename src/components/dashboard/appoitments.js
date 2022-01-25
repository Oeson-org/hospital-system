import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
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

const appoitments = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

export const Appoitments = (props) => (
  <Card {...props}>
    <CardHeader title="Appointments" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Appoiment Ref
              </TableCell>
              <TableCell>
                Doctor
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
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
            {appoitments.map((appoitment) => (
              <TableRow
                hover
                key={appoitment.id}
              >
                <TableCell>
                  {appoitment.ref}
                </TableCell>
                <TableCell>
                  {appoitment.customer.name}
                </TableCell>
                <TableCell>
                  {format(appoitment.createdAt, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(appoitment.status === 'delivered' && 'success')
                      || (appoitment.status === 'refunded' && 'error')
                      || 'warning'}
                  >
                    {appoitment.status}
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
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
