import React, { useState, useEffect, useCallback } from "react";
import PageFooterContainer from "../containers/PageFooter";
import PageHeaderContainer from "../containers/PageHeader";
import ProductGridContainer from "../containers/ProductGrid";

const HomePage = () => {  
  const [filterState, setFilterState] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 18;

  const fetchData = useCallback(async() =>{
    if(isLoading){
      try{
        // fetch request for products
        fetch(`http://localhost:3080/products/${filterState}?pageIndex=${pageIndex}&pageSize=${pageSize}`)
          .then((response) => response.json())
          .then((data) => setProducts([...products, ...data]));
        // After successful fetch set isLoading to false
        setIsLoading(false);
      }catch(err){
        setError(err);
        console.log(error);
      }
    }
  });

  const shuffle = (products) => { // Based off Fisher-Yates
    let num_products = products.length;
    for (let index = num_products - 1; index > 0; index--) {
      let rand_index = Math.floor(Math.random() * num_products);
      let tmp = products[index];
      products[index] = products[rand_index];
      products[rand_index] = tmp;
    }
  };

  const handleScroll = event => {
    if((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight){// Scroll to bottom
        setPageIndex(pageIndex+1);
        setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchData();// Make API call for products here
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [pageIndex]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <PageHeaderContainer setFilterState={setFilterState} setIsLoading={setIsLoading} />
        <ProductGridContainer products={products} />
        <PageFooterContainer />
      </header>
    </div>
  );
};

export default HomePage;
