import React, { useState, useEffect } from "react";
import PageFooterContainer from "../containers/PageFooter";
import PageHeaderContainer from "../containers/PageHeader";
import ProductGridContainer from "../containers/ProductGrid";

const HomePage = ({ splashText }) => {
  const [filterState, setFilterState] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const shuffle = (products) => {
    // Based off Fisher-Yates
    let num_products = products.length;
    for (let index = num_products - 1; index > 0; index--) {
      let rand_index = Math.floor(Math.random() * num_products);
      let tmp = products[index];
      products[index] = products[rand_index];
      products[rand_index] = tmp;
    }
  };

  // Make API call for products here
  useEffect(() => {
    if (isLoading) {
      // fetch request for products
      console.log(filterState);
      fetch(`http://localhost:3080/products/${filterState}`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
    // After successful fetch set isLoading to false
    setIsLoading(false);
  });

  if (isLoading) {
    return <>Loading...</>;
  } else {
    shuffle(products);
  }

  // Declare the filter state here
  // And then whenever the filter changes it should propagate through to the grid
  return (
    <div className="App">
      <header className="App-header">
        <PageHeaderContainer setFilterState={setFilterState} setIsLoading={setIsLoading} />
        <ProductGridContainer filterState={filterState} products={products} />
        <PageFooterContainer />
      </header>
    </div>
  );
};

export default HomePage;
