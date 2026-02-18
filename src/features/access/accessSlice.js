import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAccessToken = createAsyncThunk(
        'access/fetchAccessToken',
        async ({codeVerifier, code}) => {
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_REDIRECT_URI;
      
        const url = "https://accounts.spotify.com/api/token";
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        }
      
        try {
            const body = await fetch(url, payload);
            const response = await body.json();
            
            return response.access_token;

        } catch (error){
            return error
        }
    }
)

const accessSlice = createSlice({
    name: 'access',
    initialState: {
        codeVerifier: null,
        codeChallenge: null,
        authCode: null,
        
        // async access token data.
        accessToken: null,
        refreshToken: null,
        accessTokenLoading: false,
        accessTokenError: false,
    },
    reducers: {
        saveCodeVerifyer: (state, action) =>{
            state.codeVerifier = action.payload
        },
        saveAuthCode: (state, action) => {
            state.authCode = action.payload
        },
        saveCodeChallenge: (state, action) => {
            state.codeChallenge = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccessToken.pending, (state) => {
                state.accessTokenStatus = 'loading'
            })
            .addCase(fetchAccessToken.fulfilled, (state, action) => {
                state.accessTokenStatus = 'succeeded'
                state.accessToken = action.payload
            })
            .addCase(fetchAccessToken.rejected, (state, action) => {
                state.accessTokenStatus = 'failed'
                state.accessTokenError = action.payload
            })
    }
})

// data selectors
export const selectCodeVerifier = (state) => state.access.codeVerifier;
export const selectCodeChallenge = (state) => state.access.codeChallenge;
export const selectAuthCode = (state) => state.access.authCode;
export const selectAccessToken = (state) => state.access.accessToken;
export const selectAccessTokenStatus = (state) => state.access.accessTokenStatus;
export const selectAccessTokenError = (state) => state.access.accessTokenError;


// export actions.
export const { saveCodeVerifyer, saveAuthCode, saveCodeChallenge } = accessSlice.actions;

const accessReducer = accessSlice.reducer;

export default accessReducer;