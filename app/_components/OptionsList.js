import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteDataMutation, useGetDataQuery, } from '../utils/api/apiSlice';
import { delete_option, options_list, } from '../utils/api/apiURLs';
import { toCamelCase } from '../utils/commonFunctions';
import { Box, Card, Chip, Grid, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

const paginationModel = { page: 0, pageSize: 5 };

const OptionsList = ({ refreshTrigger }) => {

    const isValidColor = (color) => {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    };

    const renderAction = (handleDelete) => (params) => (
        <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id, params.row.type)} // Uses row._id
        >
            <DeleteOutlineIcon />
        </IconButton>
    );

    const productNameColumns = (handleDelete) => [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        { field: 'productName', headerName: 'Product Name', flex: 1, minWidth: 150 },
        {
            field: 'action', headerName: 'Action', minWidth: 80,
            sortable: false,
            renderCell: renderAction(handleDelete),
        },
    ];
    const shopFromColumns = (handleDelete) => [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        { field: 'shopFrom', headerName: 'Shop From', flex: 1, minWidth: 150 },
        {
            field: 'action', headerName: 'Action', minWidth: 80,
            sortable: false,
            renderCell: renderAction(handleDelete),
        },
    ]
    const colorColumns = (handleDelete) => [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        {
            field: 'color', headerName: 'Color', flex: 1, minWidth: 100,
            renderCell: (params) => {
                const colors = params?.value?.split(/[, ]+/).map((c) => c.trim()).filter(Boolean) || [];

                return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, height: "100%", alignContent: "center" }}>
                        {colors.map((color, idx) => {
                            const lower = color.toLowerCase();
                            const bgColor = isValidColor(lower) ? lower : '#999';

                            return (
                                <Chip
                                    key={idx}
                                    label={color}
                                    size="small"
                                    sx={{
                                        backgroundColor: bgColor,
                                        color: bgColor === 'white' || bgColor === '#fff' ? '#000' : '#fff',
                                        textTransform: 'capitalize',
                                        boxShadow: 1
                                    }}
                                />
                            );
                        })}
                    </Box>
                );
            },
        },
        {
            field: 'action', headerName: 'Action', minWidth: 80,
            sortable: false,
            renderCell: renderAction(handleDelete)
        },
    ]
    const brandColumns = (handleDelete) => [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        { field: 'brand', headerName: 'Brand Name', flex: 1, minWidth: 100, },
        {
            field: 'action', headerName: 'Action', minWidth: 80,
            sortable: false,
            renderCell: renderAction(handleDelete),
        },
    ]
    const sizeColumns = (handleDelete) => [
        { field: 'id', headerName: 'Sr.N.', width: 30 },
        { field: 'size', headerName: 'Size', flex: 1, minWidth: 100, },
        {
            field: 'action', headerName: 'Action', minWidth: 80,
            sortable: false,
            renderCell: renderAction(handleDelete),
        },
    ]

    const { data, refetch } = useGetDataQuery({ endpoint: options_list })

    useEffect(() => {
        refetch();  // This will re-fetch product data
    }, [refreshTrigger]);


    const productRow = data?.productNames?.map((row, index) => {
        return {
            id: index + 1,
            _id: row._id,
            productName: toCamelCase(row?.name),
            type: "productname"
        };
    });
    const shopRow = data?.shops?.map((row, index) => {
        return { id: index + 1, _id: row._id, shopFrom: toCamelCase(row?.name), type: "shop" };
    });
    const colorRow = data?.colors?.map((row, index) => {
        return { id: index + 1, _id: row._id, color: toCamelCase(row?.name?.trim()), type: "color" };
    });
    const brandRow = data?.brands?.map((row, index) => {
        return { id: index + 1, _id: row._id, brand: toCamelCase(row?.name), type: "brand" };
    });
    const sizeRow = data?.sizes?.map((row, index) => {
        return { id: index + 1, _id: row._id, size: row?.name.toUpperCase(), type: "size" };
    });


    const [deleteData] = useDeleteDataMutation()

    const handleDelete = async (id, type) => {
        const confirmed = confirm('Are you sure you want to delete this product?');
        if (!confirmed) return
        try {
            await deleteData({ endpoint: `${delete_option}/${type}/${id}` }).unwrap().then(res => {
                console.log(res);
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

            <Grid container spacing={2} mb={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={productRow}
                            columns={productNameColumns(handleDelete)}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            sx={{ border: 0 }}
                        />
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={shopRow}
                            columns={shopFromColumns(handleDelete)}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            sx={{ border: 0 }}
                        />
                    </Card>

                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={colorRow}
                            columns={colorColumns(handleDelete)}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            sx={{ border: 0 }}
                        />
                    </Card>

                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={brandRow}
                            columns={brandColumns(handleDelete)}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            sx={{ border: 0 }}
                        />
                    </Card>

                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <DataGrid
                            rows={sizeRow}
                            columns={sizeColumns(handleDelete)}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10, 15, 20]}
                            sx={{ border: 0 }}
                        />
                    </Card>

                </Grid>
            </Grid>
        </>
    );
}

export default OptionsList