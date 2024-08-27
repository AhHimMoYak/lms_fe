import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CourseCard({ title, image, tutorName }) {
    return (
        <Card sx={{ maxWidth: 300, boxShadow: 3, borderRadius: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {tutorName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
