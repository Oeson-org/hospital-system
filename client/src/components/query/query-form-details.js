import { useState } from 'react';
import { Box,  Button,  Card,  CardContent,  CardHeader,  Divider,  Grid,  TextField } from '@mui/material';
import { types } from '../../__mocks__/queryTypes';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuid } from 'uuid';
import { db } from '../firebase/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'



export function TheQueryForm (props) {

    const [values, setValues] = useState({
        patient: '',
        email: '',
        phone: '',
        type: '',
        theDate: ''
    });  



    const handleSubmit = async (event) => {
      // let reader = new FileReader();
      // reader.onload = function(e) {
      //   this.setState({uploadedImage: values.photo});
      // };
      // reader.readAsDataURL(event.target.files[0]);
        event.preventDefault()
        try {
            await addDoc(collection(db, 'query'), {
                patientID: uuid(),
                patientName: values.patient,
                patientEmail: values.email,
                mobilePhone: values.phone,
                queryType: values.type,
                queryDate: values.theDate,
                created: Timestamp.now()
            })
            } catch (err) {
            alert(err)
            }
    }
  
    const handleChange = async (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    };

    return (
      <form
        autoComplete="off"
        noValidate
        {...props}
      >
        <Card>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                p: 2
                }}
            >
                <Button
                    color="primary"
                    variant="outlined"
                    href='/queries'
                >
                Back to all existing queries
            </Button>
          </Box>
          <CardHeader
            subheader="Create a new query below"
            title="Query"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="Please use patient full name"
                  label="Patient"
                  name="patient"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="phone"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                    fullWidth
                    select
                    label="Types"
                    onChange={handleChange}
                    required
                    variant="outlined"
                >
                    {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  type="date"
                  name="theDate"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              {/* <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid> */}
  
            </Grid>
          </CardContent>
          <Divider />
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Add Query
            </Button>
          </Box>
        </Card>
      </form>
    );
  };
  

