import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gql from "graphql-tag";

import { client } from "../ApolloProvider";

const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation ($loginUsername: String!, $loginPassword: String!) {
          login(username: $loginUsername, password: $loginPassword) {
            token
            username
          }
        }
      `,
      variables: {
        loginUsername: payload.username,
        loginPassword: payload.password,
      },
    });

    return data;
  } catch (err) {
    return { error: err.message };
  }
});

const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      const data = await client.mutate({
        mutation: gql`
          mutation ($registerRegisterInput: RegisterInput) {
            register(registerInput: $registerRegisterInput) {
              email
              token
              username
            }
          }
        `,
        variables: {
          registerRegisterInput: {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
          },
        },
      });

      return data;
    } catch (err) {
      return { error: err.message };
    }
  }
);

const token = localStorage.getItem("token");
const expiration = localStorage.getItem("expiration");
const username = localStorage.getItem("username");
const initialSate = {
  isAuthenticated: token ? true : false,
  username: username ? username : "",
  session: expiration
    ? new Date(parseInt(expiration)).getTime()
    : new Date().getTime(),
  messages: {},
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialSate,
  reducers: {
    logout(state) {
      console.log("logout");
      localStorage.clear();
      state.token = "NA";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      if (!action.payload.error) {
        // console.log(action.payload.data.login.token);
        const exp = new Date().getTime();
        console.log(exp);
        localStorage.setItem("token", action.payload.data.login.token);
        localStorage.setItem("username", action.payload.data.login.username);
        localStorage.setItem("expiration", exp + 3600000);

        state.username = action.payload.data.login.username;
        state.session = new Date(exp + 3600000).getTime();
        state.isAuthenticated = true;
        state.messages = {};
      } else {
        state.messages = action.payload;
      }
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action.payload);
      if (!action.payload.error) {
        // console.log(action.payload.data.login.token);
        const exp = new Date().getTime();
        console.log(exp);
        localStorage.setItem("token", action.payload.data.register.token);
        localStorage.setItem("username", action.payload.data.register.username);
        localStorage.setItem("expiration", exp + 3600000);

        state.username = action.payload.data.register.username;
        state.session = new Date(exp + 3600000).getTime();
        state.isAuthenticated = true;
        state.messages = {};
      } else {
        state.messages = action.payload;
      }
    });
  },
});

export const authActions = authSlice.actions;
export { login, registerUser };

export default authSlice.reducer;
