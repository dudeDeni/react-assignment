import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { User } from "../auth/authSlice";

export type ArticleBasicInfo = {
  source: {
    id: null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type NewsApiState = {
  newsList?: Array<ArticleBasicInfo> | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: NewsApiState = {
  newsList: null,
  status: "idle",
  error: null,
};

export const getPosts = createAsyncThunk("news/getPosts", async (payload: User) => {
  console.log(payload.apiToken)
  axiosInstance.defaults.headers.common['X-Api-Key'] = payload.apiToken;
  const response = await axiosInstance.get("/top-headlines?country=us");
  const resData = response.data.articles;

  return resData;
});

const newsListSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    loadNews: (state, action: PayloadAction<Array<ArticleBasicInfo>>) => {
      return {
        ...state,
        ...action.payload,
        status: "idle",
      };
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getPosts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Array<ArticleBasicInfo>>) => {
        state.status = "idle";
        state.newsList = action.payload;
      }
    )
    .addCase(getPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Fetching data failed";
    })
  }
});

export const { loadNews } = newsListSlice.actions;
export default newsListSlice.reducer;