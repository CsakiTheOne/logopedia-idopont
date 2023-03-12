import { Container, Stack } from '@mui/material';

function Page(props: any) {
    return <div>
        {props.header}
        <Container style={{paddingTop: 16}}>
            <Stack spacing={2}>
                {props.children}
            </Stack>
        </Container>
    </div>;
}

export default Page;
