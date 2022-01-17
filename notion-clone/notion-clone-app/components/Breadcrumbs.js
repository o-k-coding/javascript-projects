import MUIBreadcrumbs from '@mui/material/Breadcrumbs';

import Link from '@mui/material/Link';

export default function Breadcrumbs({ id, title }) {
  return (
    <MUIBreadcrumbs aria-label='breadcrumb' style={{ padding: '20px 0px' }}>
      <Link color='inherit' href='/'>
        All Pages
      </Link>

      <Link color='textPrimary' href={`/${id}`} aria-current='page'>
        {title}
      </Link>
    </MUIBreadcrumbs>
  );
}
