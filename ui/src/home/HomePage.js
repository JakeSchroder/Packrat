import React, { useState, useEffect, useCallback } from "react";
import PageFooterContainer from "../containers/PageFooter";
import PageHeaderContainer from "../containers/PageHeader";
import ProductGridContainer from "../containers/ProductGrid";
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {  
  const [filterState, setFilterState] = useState("Shop All");
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 18;
  const [pageFilters, setPageFilters] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const fetchProductData = useCallback(async() =>{
    if(isFetching){return}
    setIsFetching(true);
    try{
      // fetch request for products
      const response = await fetch(`http://localhost:3080/products/${filterState.replaceAll(' ', '_')}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
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
  }, [pageIndex, productData, isFetching, filterState]);

  

  useEffect(() => {
    // use is loaded state
    const fetchFilterData = async () =>{
      try{
        const response = await fetch('http://localhost:3080/filters/all');
        const { filters } = await response.json();
        for (let index = 0; index < filters.length; index++) {
          const filter = filters[index];
          const response = await fetch(`http://localhost:3080/filters/${filter}`);
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
    fetchFilterData()
  }, [])
  
  if (loaded) {
    return (
      <div className="App">
        <header className="App-header">
          <PageHeaderContainer setPageIndex={setPageIndex} setProductData={setProductData} setFilterState={setFilterState} pageFilters={pageFilters}/>
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
  }
  return (
    <div className="App">
      <header className="App-header">
        <CircularProgress color="secondary" />
      </header>
    </div>
  );
 
};

export default HomePage;
