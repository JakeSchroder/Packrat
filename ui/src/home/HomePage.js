import React, { useState, useEffect, useCallback } from "react";
import PageFooterContainer from "../containers/PageFooter";
import PageHeaderContainer from "../containers/PageHeader";
import ProductGridContainer from "../containers/ProductGrid";
import InfiniteScroll from 'react-infinite-scroller';
import { AppBar, CircularProgress } from "@mui/material/";

const HomePage = () => {  
  const [typeFilterState, setTypeFilterState] = useState("Shop All");
  const [sortFilterState, setSortFilterState] = useState("Random");
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 18;
  const [pageFilters, setPageFilters] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Production values
  let port = 80;
  let base_url = 'http://packrat.shop';

  // Development and test values
  if(process.env.REACT_APP_ENVIRONMENT == 'development'){
    port = process.env.REACT_APP_PORT
    base_url = `${process.env.REACT_APP_BASE_URL}${port}`;
  }

  const fetchProductData = useCallback(async() =>{
    if(isFetching){return}
    setIsFetching(true);
    try{
      // fetch request for products
      const response = await fetch(`${base_url}/products/${typeFilterState.replaceAll(' ', '_')}?sortOrder=${sortFilterState.replaceAll(' ', '_')}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {mode:'cors'});
      const data = await response.json();
      if(data.length === 0){
          setHasMore(false);
          return;
      }
      setProductData([...productData, ...data]);
      setPageIndex(pageIndex+1);
    }catch(err){
      setError(err);
      console.error(error);
    }finally{
      setIsFetching(false);
    }
  }, [pageIndex, productData, isFetching, typeFilterState, sortFilterState]);

  const fetchFilterData = async () =>{
    try{
      const response = await fetch(`${base_url}/filters/all`, {mode:'cors'});
      const { filters } = await response.json();
      for (let index = 0; index < filters.length; index++) {
        const filter = filters[index];
        const response = await fetch(`${base_url}/filters/${filter}`, {mode:'cors'});
        const data = await response.json();
        setPageFilters(prevState => ({
              ...prevState,    // keep all other key-value pairs
              [filter]: data.filterOptions       // update the value of specific key
        }))
      }
       setLoaded(true);
    }catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // use is loaded state
    fetchFilterData()
  }, [])
  
  if (loaded) {
    return (
      <div className="App">
        <AppBar className="App-header" position="fixed" color="transparent" elevation={0} >
          <PageHeaderContainer setPageIndex={setPageIndex} setProductData={setProductData} 
            setTypeFilterState={setTypeFilterState} setSortFilterState={setSortFilterState} pageFilters={pageFilters}/>          
        </AppBar>
        <body className="App-body" >
          <InfiniteScroll
              pageStart={0}
              loadMore={fetchProductData}
              hasMore={hasMore}
              threshold={250}
              loader={<div className="loader" align="center" key={0}><CircularProgress color="secondary" /></div>}
          >
            <ProductGridContainer productData={productData} />
          </InfiniteScroll>
        </body>

        <footer className="App-footer" style={{ width: "100%", height: "20vh" }}>
          <PageFooterContainer />
        </footer>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <CircularProgress className="loader" align="center" color="secondary" />
      </header>
    </div>
  );
 
};

export default HomePage;
