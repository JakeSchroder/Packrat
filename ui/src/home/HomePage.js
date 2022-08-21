import React, { useState, useEffect } from 'react'
import PageFooterContainer from '../containers/PageFooter';
import PageHeaderContainer from '../containers/PageHeader';
import ProductGridContainer from '../containers/ProductGrid';

const productA = {
  name: "Save the Planet Triple-Layer Beaded Necklace",
  price: "$22.00",
  img: "https://cdn.shopify.com/s/files/1/0105/8592/products/IMG_2028_df3c1bc1-b0aa-404a-9e12-26a4914a112c_1080x.jpg?v=1623115410",
  type: "jewelery"
};
const productB = {
  name: "DARK PASSAGES RAVER TEE WHITE",
  price: "$85.00",
  img: "https://cdn.shopify.com/s/files/1/0071/9454/2138/products/DARKPASSAGESWHITEFRONTMODEL_750x.jpg?v=1660497384",
  type: "top"
};
const generateProducts = (count=2) => {
  let products = [
    productA, productB
  ];
  for (let index = 0; index < count; index+=2) {
    products = [...products, productA, productB]
  }
  return products
};

const HomePage = ({splashText}) => {
  const [filterState, setFilterState] = useState('All');
  // Make API call for products here
  
  let products = generateProducts(10);
  // Declare the filter state here
  // And then whenever the filter changes it should propagate through to the grid
  return (
    <div className="App">
      <header className="App-header">
        <PageHeaderContainer setFilterState={setFilterState}/>
        <ProductGridContainer filterState={filterState} products={products}/>
        <PageFooterContainer/>
      </header>
    </div>
  );
}

export default HomePage;
