import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDeleteDataMutation, useGetDataQuery, useLazyGetDataQuery } from '../utils/api/apiSlice';
import { delete_product, options_list, product_list } from '../utils/api/apiURLs';
import { toCamelCase } from '../utils/commonFunctions';
import { Box, Card, Chip, Grid, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';




const paginationModel = { page: 0, pageSize: 5 };

export default function OptionsList({ refreshTrigger }) {

    const isValidColor = (color) => {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    };


    const productNameColumns = [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        { field: 'productName', headerName: 'Product Name', flex: 1, minWidth: 150 },
        { field: 'action', headerName: 'Action',  minWidth: 80 },

        // { field: 'shopFrom', headerName: 'Shop From', flex: 1, minWidth: 150 },
        // {
        //     field: 'color',
        //     headerName: 'Color Name',
        //     flex: 1, minWidth: 150,
        //     renderCell: (params) => {
        //         const colors = params.value?.split(/[, ]+/).map((c) => c.trim()).filter(Boolean) || [];

        //         return (
        //             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, height: "100%", alignContent: "center" }}>
        //                 {colors.map((color, idx) => {
        //                     const lower = color.toLowerCase();
        //                     const bgColor = isValidColor(lower) ? lower : '#999';

        //                     return (
        //                         <Chip
        //                             key={idx}
        //                             label={color}
        //                             size="small"
        //                             sx={{
        //                                 backgroundColor: bgColor,
        //                                 color: bgColor === 'white' || bgColor === '#fff' ? '#000' : '#fff',
        //                                 textTransform: 'capitalize',
        //                                 boxShadow: 1
        //                             }}
        //                         />
        //                     );
        //                 })}
        //             </Box>
        //         );
        //     },
        // },

        // { field: 'brand', headerName: 'Brand Name', flex: 1, minWidth: 100, },
        // {
        //     field: 'size', headerName: 'Size', width: 80, renderCell: (params) => (
        //         <Chip
        //             label={params.value.toUpperCase()}
        //             color="secondary"
        //             size="small"
        //         />
        //     ),
        // },
        // { field: 'dateTime', headerName: 'Date and Time', flex: 1.5, minWidth: 150, },

        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 0.5, minWidth: 80,
        //     sortable: false,
        //     renderCell: (params) => (
        //         <IconButton
        //             color="error"
        //             onClick={() => handleDelete(params.row._id)} // Use _id here from row
        //         >
        //             <DeleteOutlineIcon />
        //         </IconButton>
        //     ),
        // },
    ];
    const shopFromColumns = [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        { field: 'shopFrom', headerName: 'Shop From', flex: 1, minWidth: 150 },
        { field: 'action', headerName: 'Action',  minWidth: 80 },
    ]

    const { data, refetch } = useGetDataQuery({ endpoint: options_list })

    console.log("data--------", data);


    useEffect(() => {
        refetch();  // This will re-fetch product data
    }, [refreshTrigger]);

    // const productsName = data?.productNames?.map((item)=> {
    //     return item.name
    // })
    // console.log("productsName", productsName);

    const productRow = data?.productNames?.map((row, index) => {
        return { id: index+1, productName: row?.name };
    });
    const shopRow = data?.shops?.map((row, index) => {
        return { id: index+1, shopFrom: row?.name };
    });

    // console.log('rows-----', rows);

    // const rows = data?.map((item, index) => {
    //     const createdDate = new Date(item.createdAt);
    //     return {
    //         id: index + 1,
    //         _id: item._id,
    //         productName: toCamelCase(item?.productName?.name?.trim()),
    //         shopFrom: toCamelCase(item?.shopFrom?.name?.trim()),
    //         color: toCamelCase(item?.color?.name?.trim()),
    //         brand: toCamelCase(item?.brand?.name?.trim()),
    //         size: item?.size?.name,
    //         dateTime: `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`,

    //     }
    // })


    const [deleteData] = useDeleteDataMutation()

    const handleDelete = async (id) => {
        const confirmed = confirm('Are you sure you want to delete this product?');
        if (!confirmed) return
        try {
            await deleteData({ endpoint: delete_product + id }).unwrap().then(res => {
                console.log(res.message);
                refetch();
            })
        } catch (error) {
            console.log(error, "error-------");
        }
    }


    return (
        <>
            <Box className="page-title-box" mb={2}>
                <Typography className='page-title' variant='h5'>Product Option Lists</Typography>
            </Box>
            {/* <Paper > */}
            <Grid container spacing={1} mb={2}>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={productRow}
                            columns={productNameColumns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            // checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Card>
                </Grid>

                <Grid size={{ xs: 6, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={shopRow}
                            columns={shopFromColumns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            // checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Card>

                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={shopRow}
                            columns={shopFromColumns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            // checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Card>

                </Grid>
            </Grid>
            {/* </Paper> */}
        </>
    );
}
