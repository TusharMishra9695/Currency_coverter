import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography,Button } from '@mui/material';
import Link from 'next/link'

export default function NavBar() {
  return (<>
      <AppBar position="static">
        <Toolbar>
        <Link href="/">
          <Button variant="contained" color="secondary" component="div" style={{marginRight:"20px"}}  >
            Home 
          </Button>
          </Link>
          <Link href="/ExchangeRate">
          <Button variant="contained" color="secondary">Exchange Table</Button>
          </Link>
        </Toolbar>
      </AppBar>
      </>
  )
}