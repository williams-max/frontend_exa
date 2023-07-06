import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCartCheck, BsCartX } from "react-icons/bs";

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { urlBackend } from "../constans/configUrl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Cart = () => {

  const [theme] = useThemeHook();
  const [open, setOpen] = useState(false);

  const [rows, setRows] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    loadFavoritos()
  },[]);

  const deleteFavorito = async (item) => {
   console.log("delete item ",item)
   const{id}=item;
   try {
    
    const response = await axios.delete(`${urlBackend}/api/v1/movies/${id}`);
   
        console.log("res favoritops ss",response.data)

  
      if(response.data.error==false){
        await loadFavoritos()
        alert("Se eliminado correctamente")
      }else{
        alert("Algo salio mal")
      }
    
    
    
   } catch (error) {
    
   }

  } 

  const loadFavoritos = async () => {

    var usuario=JSON.parse(localStorage.getItem("user"))
    if(!usuario){
      return;
    }

   try {
    
    const response = await axios.get(`${urlBackend}/api/v1/movies/favoritos/${usuario?.id}`);
   
    if(response.data){
    
      if(Array.isArray(response.data)){
        console.log("res favoritops ss",response.data)
        setRows(response.data)
      }
    }
    
   } catch (error) {
    
   }
  };


  var usuario=JSON.parse(localStorage.getItem("user"))
  if(!usuario){
    return(

      <>
      <Box sx={{ display: "flex", flexDirecction: "row",justifyContent:'center' }}>
      <h1  style={{ marginTop: "80px" ,textAlign:'center'}}>Inicia Session para poder ver esta pagina</h1>
      </Box>
      </>
    )
  }

  return (
    <Container className="">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4
        className={`${theme ? "text-light" : "text-light-primary"} text-center`}
      >
        {"Mis Favoritos"}
      </h4>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Poster</StyledTableCell>
              <StyledTableCell align="right">Acciones</StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="right">
             
                    <img
                      src={row.poster}
                      id="imagen"
                      className="img-thumbnail previsualizar"
                      alt="not found"
                      width="80px"
                    />
               
                </StyledTableCell>
                <StyledTableCell align="right">

                <Button variant="contained"  onClick={()=> deleteFavorito(row)}>Eliminar de favorios</Button>
                </StyledTableCell>
             
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              successfully
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Thanks for your purchase the product arrives in approximately 2
              days
            </Typography>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default Cart;
