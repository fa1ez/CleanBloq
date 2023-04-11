import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function LocationCard({ frequency, City, Longitude, Latitude, choosefilename , Get_Resolve}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMoreClick = () => {
   //folder-name-in-public + "/" + longitude + latitude + filetype
   choosefilename("images"+"/"+Longitude+Latitude + ".jpg");
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "rgb(105,105,105)",
    },
  }));

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "lightgrey" }}>
      <CardHeader
        title={"Detection at " + City}
        // subheader={"Expires on: " + moment().add(Duration, "day").calendar()}
        onClick={handleMoreClick}
        sx={{ cursor: "pointer" }}
      ></CardHeader>
      <CardActions disableSpacing>
        <ColorButton variant="contained" onClick={()=>{Get_Resolve(City, Longitude, Latitude,frequency)}}>Resolve</ColorButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          title="Expand"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h5" color="text.primary">
            Coordinates
          </Typography>
          <Typography variant="body1" color="text.primary" fontWeight={"bold"}>
            Longitude:
            <Typography variant="body2" color="text.primary">
              {Longitude}
            </Typography>
          </Typography>
          <Typography variant="body1" color="text.primary" fontWeight={"bold"}>
            Latitude:
            <Typography variant="body2" color="text.primary">
              {Latitude}
            </Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
