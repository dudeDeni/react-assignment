import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import { getPosts } from "../features/news/newsListSlice";


function StoryList() {
  const dispatch = useAppDispatch();
  const newsList = useAppSelector((state) => state.news.newsList)
  const isLoading = useAppSelector((state) => state.news.status)
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
    if (basicUserInfo && newsList === null) {
      dispatch(getPosts(basicUserInfo));
    }
  }, [dispatch, basicUserInfo]);
  // Display error then 0 articles
  return (
    <Container className='my-4 d-flex align-items-center pb-4'>
      <Row className='w-100 justify-content-center gx-3 gy-4'>
        {isLoading !== "failed" || "loading" ? newsList?.map((obj, index) => {
          return (
            <ItemCard item={obj} key={index}/>
          );
        }) : 
          <Loader />
        }
      </Row>
    </Container>
  );
}

export default StoryList;