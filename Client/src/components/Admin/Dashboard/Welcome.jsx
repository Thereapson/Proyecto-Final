import * as React from 'react';
import { Box, Card, CardActions, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import computerArticleImage from './welcome_illustration.svg';

console.log(computerArticleImage)

const computer1ArticleImage = 'https://commons.wikimedia.org/wiki/File:PC_template.svg';
console.log(computer1ArticleImage)

const Welcome = () => {

    return (
        <Card
            sx={{
                background: theme =>
                    theme.palette.mode === 'dark'
                        ? '#535353'
                        : `linear-gradient(to right, #24444d 0%, #373a4e 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

                color: '#fff',
                padding: '20px',
                marginTop: 2,
                marginBottom: '1em',
            }}
        >
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Welcome to Admin Panel for CompuDevs
                    </Typography>
                    <Box maxWidth="40em">
                        <Typography variant="body1" component="p" gutterBottom>
                        This is the Admin module of a project Computer Store, it will be in constant development for include improvements and experimental functionalities.
                        </Typography>
                    </Box>
                    <CardActions
                        sx={{
                            padding: { xs: 0, xl: null },
                            flexWrap: { xs: 'wrap', xl: null },
                            '& a': {
                                marginTop: { xs: '1em', xl: null },
                                marginLeft: { xs: '0!important', xl: null },
                                marginRight: { xs: '1em', xl: null },
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            href="/"
                            startIcon={<HomeIcon />}
                        >
                            Return CompuDevs Page
                        </Button>
                        <Button
                            variant="contained"
                            href="https://github.com/Thereapson/Proyecto-Final/tree/develop"
                            startIcon={<CodeIcon />}
                        >
                            Develop Repository
                        </Button>
                    </CardActions>
                </Box>
                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    sx={{
                        background: `url(${computerArticleImage}) top right / cover`,
                        marginLeft: 'auto',
                    }}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                />
            </Box>
        </Card>
    );
};

export default Welcome;
