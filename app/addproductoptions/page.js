"use client"

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { usePostDataMutation } from '../utils/api/apiSlice'
import { add_option } from '../utils/api/apiURLs'
import { Controller, useForm } from 'react-hook-form'
import Toast from '../_components/Toast'

const Page = () => {
  const [postData] = usePostDataMutation()
  const { control, handleSubmit, reset, setError, formState: { errors } } = useForm({
    defaultValues: {
      productName: '',
      shopFrom: '',
      color: '',
      brand: '',
      size: ''
    }
  })

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOptionSubmit = (data) => {
    postData({
      endpoint: add_option,
      body: data,
    }).unwrap().then(res => {
      reset({
        productName: '',
        shopFrom: '',
        color: '',
        brand: '',
        size: '',
      });
      setSnackbarMessage(res.message);
      setSnackbarOpen(true);
    }).catch((err) => {
      console.error('Submission failed:', err);
      const fieldErrors = err?.data?.errors || {}
      Object.entries(fieldErrors).forEach(([fieldName, message]) => {
        setError(fieldName, {
          type: 'server',
          message
        })
      })
    })
  }
  return (
    <Box className="add-options">
      <Toast open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />

      <Container>
        <Box className="page-title-box">
          <Typography className='page-title' variant='h5'>Add Product Options</Typography>
        </Box>

        <Box boxShadow={2} className="form-outer">
          <Grid container spacing={1}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Product Name"
                    variant="outlined"
                    value={field.value ?? ''}
                    error={!!errors.productName}
                    helperText={errors.productName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Controller
                name="shopFrom"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Shop From"
                    variant="outlined"
                    error={!!errors.shopFrom}
                    helperText={errors.shopFrom?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Color Name"
                    variant="outlined"
                    error={!!errors.color}
                    helperText={errors.color?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Brand Name"
                    variant="outlined"
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    label="Size"
                    variant="outlined"
                    error={!!errors.size}
                    helperText={errors.size?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box className="form-btn-center">
            <Button size='small'
              sx={{
                width: {
                  xs: '100%',  // full width on mobile
                  sm: 'auto',  // auto width on tablets and up
                },
              }} variant='contained' onClick={handleSubmit(handleOptionSubmit)}>Add Option</Button>
          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default Page