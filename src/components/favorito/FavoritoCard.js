import React from "react";
//import { Button, Card } from "react-bootstrap";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useThemeHook } from "../../GlobalComponents/ThemeProvider";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
//import { Link } from "@reach/router";



import { Link } from "react-router-dom";

import { Box, Grid} from "@mui/material";
import axios from "axios";



import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1200px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};




const FavoritoCard = (props) => {
  let { id, poster ,title,

    type,imdbID,
    
    year} = props.data;


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [theme] = useThemeHook();
  const { addItem } = useCart();

  const addToCart = () => {
    addItem(props.data);
  };


  const addPelicula =async () => {

  
  }

  return (
    <>
      <Card sx={{ maxWidth: "80%" }}>
        <Link>
          <div
            style={{
              background: "white",
              height: "15rem",

              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "inherit",
            }}
          >
            <div style={{ width: "9rem" }}>
              {/* <Card.Img variant="top" src={image} className="img-fluid" />*/}
              <CardMedia
                sx={{}}
                component="img"
                /*height="140"*/

                image={poster}
                alt="image"
              />
            </div>
          </div>
        </Link>
        <CardContent>
          <Typography
            component="div"
            variant="h1"
            sx={{ fontSize: "12px" }}
          ></Typography>
          <Typography
            component="div"
            variant="h1"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              component="div"
              variant="h1"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            ></Typography>
            <Typography
              component="div"
              variant="h1"
              sx={{ fontSize: "14px", color: "#dd0285" }}
            ></Typography>
          </Typography>

          <Button
            style={{
              background: "#dd0285",
              color: "white",
              width: "100%",
              fontWeight: "bold",
            }}

            onClick={handleOpen}
            
          >
            Ver mas informacion
          </Button>
          {/*<Button
            style={{
              background: "#dd0285",
              color: "white",
              width: "100%",
              fontWeight: "bold",
              marginTop:'4px'
            }}

            onClick={addPelicula}
            
          >
            Anadir a favorios
          </Button>*/}
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Title {title}</h2>
          <p id="child-modal-description">
            Type {type}
          </p>
          <p id="child-modal-description">
            Year {year}
          </p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default FavoritoCard;



