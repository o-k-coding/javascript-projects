import { Queries, Mutations } from '../lib/graphql-query-mutation';
import { useState } from 'react';
import { useQuery, useMutation } from 'graphql-hooks';
import { useRouter } from 'next/router';
import { Typography, Button, Grid, TextField } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import Content from '../components/Content';

export default function SinglePage({ id }) {
  // for your textfield
  const [newTitle, setNewTitle] = useState('');

  // edit mode on and off
  const [editTitle, setEditTitle] = useState(false);
  const { data, refetch } = useQuery(Queries.Page.getOne, {
    variables: { id },
  });
  const [updatePage] = useMutation(Mutations.Page.updatePage);
  const [deletePage] = useMutation(Mutations.Page.deletePage);
  const router = useRouter();

  console.log('data', data);
  const page = data?.page?.data;
  if (!page) return <div>Loading</div>;
  const { title, content_blocks: contentBlocks } = page?.attributes;
  console.log('page', page);

  const updateTitle = async () => {
    // Update page with new title
    await updatePage({ variables: { id, title: newTitle } });
    // set edit mode to false
    setEditTitle(false);
    setNewTitle('');
    // Get the latest data
    refetch();
  };

  const remove = async () => {
    await deletePage({ variables: { id } });
    //redirect to homepage after deletion.
    router.push(`/`);
  };

  return (
    <Grid container>
      <Breadcrumbs id={id} title={title} />
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          {editTitle ? (
            <Grid item>
              <TextField
                label='New Title'
                variant='outlined'
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
              />
              <Button
                variant='outlined'
                color='primary'
                onClick={updateTitle}
                style={{ marginLeft: 20 }}
              >
                Save
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Typography variant='h3'>{title}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => setEditTitle(true)}
            style={{ marginRight: 20 }}
          >
            Edit Title
          </Button>
          <Button variant='outlined' color='secondary' onClick={remove}>
            Delete
          </Button>
        </Grid>
      </Grid>
      <Content
        pageId={id}
        refetchPage={refetch}
        contentBlocks={contentBlocks?.data}
      />
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id },
  };
}
