"use client"
import React, { useState } from 'react'
import { useGetDataQuery, usePostDataMutation } from './utils/api/apiSlice';
import { Alert, Autocomplete, Box, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { add_products, options_list } from './utils/api/apiURLs';
import Toast from './_components/Toast';
import { toCamelCase } from './utils/commonFunctions';
import ProductList from './_components/ProductList';


const page = () => {
  const {
    control,
    handleSubmit,
    reset, getValues, watch,
    formState: { errors, isValid },
  } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { data } = useGetDataQuery({ endpoint: options_list })

  const productNameOptions = data?.productNames?.map(item => ({
    label: toCamelCase(item.name),
    value: item._id,
  }))
  const shopFromOptions = data?.shops?.map(item => ({
    label: toCamelCase(item.name),
    value: item._id,
  }))
  const colorOptions = data?.colors?.map(item => ({
    label: toCamelCase(item.name),
    value: item._id,
  }))
  const brandOptions = data?.brands?.map(item => ({
    label: toCamelCase(item.name),
    value: item._id,
  }))
  const sizeOptions = data?.sizes?.map(item => ({
    label: item.name.toUpperCase(),
    value: item._id,
  }))

  // calculate tottal value for view only
  const qty = Number(watch("qty") || 0)
  const mrp = Number(watch("mrp") || 0)
  let total = parseFloat((qty * mrp).toFixed(2))

  const [refreshProductList, setRefreshProductList] = useState(false);

  const [postData] = usePostDataMutation()
  const handleProductSubmit = (data) => {
    postData({
      endpoint: add_products,
      body: data
    }).unwrap().then((res) => {
      setSnackbarMessage(res.message);
      setSnackbarOpen(true);
      reset()
      setRefreshProductList(prev => !prev);  // toggles the state
    }).catch((err) => {
      console.log('error message', err);
    })

  }


  return (
    <Box>

      <Toast open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />

      <Container maxWidth={false}>
        <Box className="page-title-box">
          <Typography className='page-title' variant='h5'>Add Product in Stock</Typography>
        </Box>

        <Box boxShadow={2} className="form-outer">
          <Grid container spacing={1}>
            <Grid size={{ xs: 6, md: 2 }}>
              <Controller
                name="productName"
                control={control}
                rules={{ required: 'product name is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={productNameOptions ?? []}
                    getOptionLabel={(option) => option.label}
                    value={value || null}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product Name"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Controller
                name="shopFrom"
                control={control}
                rules={{ required: 'Shop name is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={shopFromOptions ?? []}
                    getOptionLabel={(option) => option.label}
                    value={value || null}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Shop From"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Controller
                name="color"
                control={control}
                rules={{ required: 'Color is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={colorOptions ?? []}
                    getOptionLabel={(option) => option.label}
                    value={value || null}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Color Name"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Controller
                name="brand"
                control={control}
                rules={{ required: 'Brand is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={brandOptions ?? []}
                    getOptionLabel={(option) => option.label}
                    value={value || null}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand Name"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 1 }}>
              <Controller
                name="size"
                control={control}
                rules={{ required: 'Size required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Autocomplete
                    options={sizeOptions ?? []}
                    getOptionLabel={(option) => option.label}
                    value={value || null}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Size"
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 1 }}>
              <Controller
                name="qty"
                control={control}
                rules={{ required: 'Quantity required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Qty"
                    variant="outlined"
                    value={field.value ?? ''}
                    error={!!errors.qty}
                    helperText={errors.qty?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 1 }}>
              <Controller
                name="mrp"
                control={control}
                rules={{ required: 'Mrp required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="MRP"
                    variant="outlined"
                    value={field.value ?? ''}
                    error={!!errors.mrp}
                    helperText={errors.mrp?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 1 }}>
              <Controller
                name="total"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputProps={{ readOnly: true }}
                    // disabled
                    fullWidth
                    size="small"
                    label={total == 0 ? '' : "Total"}
                    variant="outlined"
                    value={total ?? ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box className="form-btn-center">
            <Button size='small' sx={{
              width: {
                xs: '100%',  // full width on mobile
                sm: 'auto',  // auto width on tablets and up
              },
            }} disabled={!isValid} variant='contained' onClick={handleSubmit(handleProductSubmit)}>Add Product</Button>
          </Box>
        </Box>

        <ProductList refreshTrigger={refreshProductList}/>

      </Container>

    </Box>
  )
}

export default page