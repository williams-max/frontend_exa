import React from "react";
//import { Button, Card } from "react-bootstrap";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import { urlBackend } from "../constans/configUrl";
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




const ProductCard = (props) => {
  let { id, Poster ,Title,

    Type,imdbID,
    
    Year} = props.data;


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



 

  const addPelicula =async () => {

    
    var usuario=JSON.parse(localStorage.getItem("user"))
    if(!usuario){

      alert("Necesita Iniciar Session antes de Realizar esta operacion")
      return;
    }
    console.log( "user",JSON.parse(localStorage.getItem("user")));
  
   
  
    try {

      const response = await axios.post(`${urlBackend}/api/v1/movies`,{
        "title": Title,
        "idmovie": imdbID,
        "idusuario": usuario?.id,
        "type":Type,
        "poster":Poster,
      })

      console.log("respuesta ",response)
      if(response.data.error==false){
        alert("Se añadio a favoritos correctamente")
      }else{
        alert("Algo salio mal")
      }
      
    } catch (error) {
      
    }
  
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

                image={Poster}
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
          <Button
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
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Title {Title}</h2>
          <p id="child-modal-description">
            Type {Type}
          </p>
          <p id="child-modal-description">
            Year {Year}
          </p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProductCard;

{
  /*
   <Card
      style={{ width: "18rem", height: "auto" }}
      className={`${
        theme ? "bg-light-black text-light" : "bg-lihgt text-black"
      } text-center p-0 overflow-hidden shadow mx-auto mb-4`}
    >
      <Link to={`/product-details/${id}`}>
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
            <Card.Img variant="top" src={image} className="img-fluid" />
          </div>
        </div>
      </Link>
      <Card.Body>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Title>
          Rs. <span className="h3">{price}</span>
        </Card.Title>
        <Button
          background={"#dd0285"}
          onClick={() => addToCart()}
          className={`${
            theme ? "bg-dark-primary text-black" : "bg-light-primary"
          } d-flex align-item-center m-auto border-0`}
        >
          <BsCartPlus size="1.8rem" />
          Add to cart fff
        </Button>
      </Card.Body>
    </Card>

*/
}
