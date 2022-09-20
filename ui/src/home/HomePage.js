import React, { useState, useEffect, useCallback } from "react";
import PageFooterContainer from "../containers/PageFooter";
import PageHeaderContainer from "../containers/PageHeader";
import ProductGridContainer from "../containers/ProductGrid";
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {  
  const [filterState, setFilterState] = useState("All");
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 18;

  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProductData = useCallback(async() =>{
    if(isFetching){return}
    setIsFetching(true);
    try{
      // fetch request for products
      const response = await fetch(`http://localhost:3080/products/${filterState}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
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
  }, [pageIndex, productData, isFetching]);

  
  return (
    <div className="App">
      <header className="App-header">
        <PageHeaderContainer setFilterState={setFilterState} />
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchProductData}
            hasMore={hasMore}
            threshold={250}
            loader={<div className="loader" align="center" key={0}><CircularProgress color="secondary" /></div>}
        >
          <ProductGridContainer productData={productData} />
        </InfiniteScroll>
        <PageFooterContainer />
      </header>
    </div>
  );
};

export default HomePage;
