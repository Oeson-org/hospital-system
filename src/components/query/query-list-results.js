import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase'


export const QueryListResults = ({ queries, ...rest }) => {
  const [selectedQueryIds, setSelectedQueryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [theQuery, setTheQuery] = useState([])

  // useEffect(() => {
  //   const q = query(collection(db, 'query'))
  //   onSnapshot(q, (querySnapshot) => {
  //     setTheQuery(querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // },[])
  const handleSelectAll = (event) => {
    let newSelectedQueryIds;

    if (event.target.checked) {
      newSelectedQueryIds = queries.map((q) => q.id);
    } else {
      newSelectedQueryIds = [];
    }

    setSelectedQueryIds(newSelectedQueryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedQueryIds.indexOf(id);
    let newSelectedQueryIds = [];

    if (selectedIndex === -1) {
      newSelectedQueryIds = newSelectedQueryIds.concat(selectedQueryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedQueryIds = newSelectedQueryIds.concat(selectedQueryIds.slice(1));
    } else if (selectedIndex === selectedQueryIds.length - 1) {
      newSelectedQueryIds = newSelectedQueryIds.concat(selectedQueryIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedQueryIds = newSelectedQueryIds.concat(
        selectedQueryIds.slice(0, selectedIndex),
        selectedQueryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedQueryIds(newSelectedQueryIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ maxWidth: 1200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedQueryIds.length === queries.length}
                    color="primary"
                    indeterminate={
                      selectedQueryIds.length > 0
                      && selectedQueryIds.length < queries.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Queries
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.slice(0, limit).map((q) => (
                <TableRow
                  hover
                  key={q.id}
                  selected={selectedQueryIds.indexOf(q.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedQueryIds.indexOf(q.id) !== -1}
                      onChange={(event) => handleSelectOne(event, q.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {q.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {q.email}
                  </TableCell>
                  <TableCell>
                    {q.phone}
                  </TableCell>
                  <TableCell>
                    {q.query}
                  </TableCell>
                  <TableCell>
                    {/* {q.created} */}
                    {format(q.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={queries.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

QueryListResults.propTypes = {
  queries: PropTypes.array.isRequired
};
