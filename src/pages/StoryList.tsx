import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import { login } from "../features/auth/authSlice";


function StoryList() {
  const dispatch = useAppDispatch();
  const newsList = useAppSelector((state) => state.auth.data);
  const isLoading = useAppSelector((state) => state.auth.status);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
    if (basicUserInfo && newsList === null) {
      dispatch(login(basicUserInfo));
    }
  }, [dispatch, basicUserInfo]);
  
  return (
    <Container className='my-4 d-flex align-items-center pb-4'>
      <Row className='w-100 justify-content-center gx-3 gy-4'>
        {isLoading !== "loading" ? newsList?.map((obj, index) => {
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