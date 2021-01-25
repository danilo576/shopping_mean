import React from 'react';
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import SearchBar from "material-ui-search-bar";
import '../App.css'; 
//import "../styles.css";
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 }
  ];



function selectMall(id) {
    console.log(id)
}
const Home = () => {
    return (
        <div className='home'>
        {/* <Header></Header> */}
              <SearchBar
           // value={this.state.value}
           className='msearchBar'
            onChange={(newValue) => {console.log(newValue)}}
            onRequestSearch={() => {console.log("PRETRAGA")}}
            />
          <h1  style={{ textAlign: "center",fontFamily: "SpicyPumpkin" }}className='homeTitle'>ODABERITE TRZNI CENTAR</h1>
          <div className="App">
            <Carousel className='carosel' breakPoints={breakPoints}>
             
              <Item  className='item' onClick={(e)=>selectMall(1)}> 
                <img 
                style={{ width:"100%"}}
                 src="https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
                 alt="new"
                 />
      </Item>
        <Item> <img 
          style={{ width:"100%"}}
      src="https://media.gettyimages.com/photos/elegant-shopping-mall-picture-id182408547?s=2048x2048"
      alt="new"
      /></Item>
        <Item> <img 
          style={{ width:"100%"}}
      src="https://media.gettyimages.com/photos/shopping-mall-picture-id458628993?s=2048x2048"
      alt="new"
      /></Item>
        <Item> <img 
          style={{ width:"100%"}}
      src="https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
      alt="new"
      /></Item>

              <Item>Six</Item>
              <Item>Seven</Item>
              <Item>Eight</Item>
            </Carousel>
          </div>
        </div>
      );




}

export default Home;