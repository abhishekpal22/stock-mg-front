"use client"

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Pal Brothser's <span>| Stock Management</span>
          </Link>
        </Typography>

        {/* Menu Items */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Add Product
          </Button>
          <Button color="inherit" component={Link} href="/addproductoptions">
            Add Option
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
