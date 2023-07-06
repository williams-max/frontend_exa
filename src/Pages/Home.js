import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import SearchFilter from "react-filter-search";
import ProductCard from "../components/ProductCard";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";



import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const Home = () => {
  const [theme] = useThemeHook();
  const [searchInput, setSearchInput] = useState("movie");


  const [listDataFavoritos, setlistDataFavoritos] = useState([]);





  async function getResponse() {

 //   https://www.omdbapi.com/?i=tt3896198&apikey=ab80de93&s=oceano
    try {
      //const response=await axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=ab80de93&s=oceano');

    
      const response=await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=ab80de93&s=${searchInput}`);
      console.log("datos resposne ", response.data);
      if(response?.data?.Search){
        setlistDataFavoritos(response.data.Search)
      }
   
    } catch (error) {
      
    }

  
  }

  useEffect(() => {
    getResponse();
  }, [searchInput]);




  return (
    <>
      <Box sx={{ display: "flex", flexDirecction: "row" }}>
     
        <Box sx={{ width: "90%",margin:'20px' }}>
          <div style={{ marginTop: "80px" }}>
            <Typography
              component="div"
              variant="h1"
              sx={{ fontSize: "14px", color: "black" }}
            >
              Buscar Peliculas
            </Typography>
            <InputGroup className="mb-3">
              <InputGroup.Text
                className={
                  theme
                    ? "bg-black text-dark-primary"
                    : "bg-light text-light-primary"
                }
              >
                <BiSearch size="2rem" />
              </InputGroup.Text>
              <FormControl
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={
                  theme ? "bg-light-black text-light" : "bg-light text-black"
                }
              />
            </InputGroup>
          </div>
      
            <SearchFilter
              value={searchInput}
              data={listDataFavoritos}
              renderResults={(results) => (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2, md: 6 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                >
                  {results.map((item, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <ProductCard data={item} key={i} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            />
          

         

       

         
        </Box>
      </Box>

   
    </>
  );
};



export default Home;
