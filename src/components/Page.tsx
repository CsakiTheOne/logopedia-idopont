import { Container, Stack } from '@mui/material';
import React from 'react';

function Page(props: any) {
    return <div>
        {props.header}
        <Container style={{paddingTop: 16}} maxWidth='md'>
            <Stack spacing={2}>
                {props.children}
            </Stack>
        </Container>
    </div>;
}

export default Page;
