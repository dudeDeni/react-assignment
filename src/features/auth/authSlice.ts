import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export type User = {
  email: string;
  apiToken: string;
};

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

type AuthApiState = {
  basicUserInfo?: User | null;
  data?: Array<ArticleBasicInfo> | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

type ResponseType = {
  resData: Array<ArticleBasicInfo>;
  user: User;
}

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  data: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("login", async (data: User) => {
  axiosInstance.defaults.headers.common['X-Api-Key'] = data.apiToken;
  const response = await axiosInstance.get("/top-headlines?country=us");
  const resData = response.data.articles;

  localStorage.setItem("userInfo", JSON.stringify(data));

  const payload: ResponseType = {
    resData,
    user: data
  }

  return payload;
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await axiosInstance.post("/logout", {});
  const resData = response.data;

  localStorage.removeItem("userInfo");

  return resData;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ResponseType>) => {
          console.log('case full of articles', action.payload)
          state.basicUserInfo = action.payload.user;
          state.data = action.payload.resData
          state.status = "idle";
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.basicUserInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
      })
  },
});

export default authSlice.reducer;