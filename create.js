import { Box, Button, TextField,MenuItem } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import Select, { SelectChangeEvent } from '@mui/material/Select';

const currencies = [
  {
    code: '1',
    label: '$',
  },
  {
    code: '2',
    label: '€',
  },
  {
    code: '3',
    label: '£',
  },

  {
    code: '4',
    label: '£',
  },
  {
    code: '5',
    label: '£',
  },
];




const Create = () => {
  const [post, setPost] = useState(null);
  console.log(post)
  const handleFormSubmit = (values) => {
    axios
    .post('https://scp.practice.nextitltd.com/api/units', values)
    .then((response) => {
      setPost(response.data);
    });
  };

  return (
    <Box m="20px">
      

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
             
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 2" }}
              />
             <FormControl fullWidth>

             <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          
          value={values.head}
          onChange={handleChange}
          name="head"
         
         
          
       
         
        >
           
           {currencies &&
          currencies.map((currenncy, idx) => {
            return (
              <MenuItem
                key={idx}
                value={currenncy.code}
              >{`${currenncy.code} ${currenncy.label}`}</MenuItem>
            );
          })}
        </Select>
           
          </FormControl>
             
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="status"
        value={values.status}
        onChange={handleChange}
      >
        <FormControlLabel value="0" control={<Radio />} label="Female" />
        <FormControlLabel value="1" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
    </FormControl>
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  code: yup.string().required("required"),
  
  head: yup
    .string(),
    
  status: yup.string().required("required"),
 
});
const initialValues = {
  name: "",
  code: "",
  head : "",
  status: "",
 
};

export default Create;
