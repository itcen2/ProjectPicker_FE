import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';

const PageInfo = ({pageInfo, setPage, page}) => {
    const setPageH = (page) => {
        setPage(page);
    };
    
  return (
    <>
    <Pagination
    activePage={page}
    itemsCountPerPage={10}
    totalItemsCount={pageInfo.totalCount}
    pageRangeDisplayed={5}
    prevPageText={"<"}
    nextPageText={">"}
    onChange={setPageH}
    />
    </>
  );
};

export default PageInfo;