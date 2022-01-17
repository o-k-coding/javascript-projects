import { useMutation, useQuery } from 'graphql-hooks';

import Link from 'next/link';
import {
  Typography,
  Grid,
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

import { Mutations, Queries } from '../lib/graphql-query-mutation';

import { useState } from 'react';

export default function Home() {
  const { data, refetch } = useQuery(Queries.Page.getAll);
  // These should be in a component with the dialog
  const [createPage] = useMutation(Mutations.Page.createPage);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle('');
    setOpen(false);
  };

  const addPage = async () => {
    // call the create page mutate function
    await createPage({ variables: { title } });
    // call refetch to retrieve the new list of pages
    refetch();
    // close the "create a new page" dialog
    handleClose();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const pages = data?.pages?.data;
  return (
    <section>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography variant='h3'>Welcome</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            Strapi + GQL + Next.js to create a Notion clone with block content.
          </Typography>
        </Grid>
        <Grid container direction='column' spacing={1}>
          {pages.map(pageItem)}
        </Grid>

        <Grid item>
          <Button color='primary' onClick={handleClickOpen}>
            Add page
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add New Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Title'
            type='text'
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addPage} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

const pageItem = (page, index) => (
  <Grid item key={page.id}>
    <div>
      <span>{index + 1}</span>
      <Link href={`/${page.id}`}>
        <a>{page.attributes.title}</a>
      </Link>
    </div>
  </Grid>
);

// Tells nextjs this will be static and pre rendered at build time
export async function getStaticProps() {
  return {
    props: {},
  };
}
