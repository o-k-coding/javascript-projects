import { Grid, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useMutation } from 'graphql-hooks';

const Editor = dynamic(() => import('./Editor'), { ssr: false });
import ContentBlock from './ContentBlock';
import { Mutations } from '../lib/graphql-query-mutation';

// content.js

export default function Content({ pageId, refetchPage, contentBlocks = [] }) {
  const [openEditor, setOpenEditor] = useState(false);
  const [createContentBlock] = useMutation(
    Mutations.ContentBlock.createContentBlock
  );

  const addBlock = async (content) => {
    await createContentBlock({ variables: { content, pageId } });
    setOpenEditor(false);
    refetchPage();
  };
  console.log(contentBlocks);
  return (
    <Grid container direction='column'>
      <Grid item>
        {contentBlocks.map((block) => (
          <Grid item key={block.id}>
            <ContentBlock block={block?.attributes} refetchPage={refetchPage} />
          </Grid>
        ))}
      </Grid>
      <Grid item>
        {openEditor ? (
          <Editor saveBlock={addBlock} />
        ) : (
          <Button color='primary' onClick={() => setOpenEditor(true)}>
            Add content block
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
