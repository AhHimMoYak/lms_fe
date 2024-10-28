import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../../styles/Main/CourseCard.css";

export default function CourseCard({ title, image, tutorName }) {
    return (
        <Card className="CourseCard">
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    className="CourseCardMedia"
                />
                <CardContent className="CourseCardContent">
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        className="CourseCardTitle"
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" className="CourseCardTutor">
                        {tutorName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
