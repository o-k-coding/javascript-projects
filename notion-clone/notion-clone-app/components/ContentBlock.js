import Grid from '@mui/material/Grid';
import { sanitize } from 'dompurify';

export default function ContentBlock({ refetchPage, block }) {
  // Note we probably also want to sanitize when saving, that way we can validate the content works as well
  return (
    <Grid container direction='row' alignItems='center'>
      <Grid item>
        <div
          dangerouslySetInnerHTML={{
            __html: block ? sanitize(block.content) : '',
          }}
        ></div>
      </Grid>
    </Grid>
  );
}
