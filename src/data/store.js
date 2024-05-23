import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API 호출을 위한 비동기 함수
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    // API 요청을 수행하여 데이터를 반환
    const response = await axios.get('https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=1000&pageNo=1&MobileOS=win&MobileApp=win&_type=json&arrange=Q&eventStartDate=20240401&serviceKey=tkpuYMyOJPiESQhzLecE1EshwjeUNeXfOJY7y8Rku7L2kh5E%2FbSH7NC7CZ1vvthRi72%2FidxEOUL%2FULnq0WWkHw%3D%3D');
    return response.data.response.body.items.item;
});

// posts 관리 슬라이스 생성
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // 이 부분에서 추가 리듀서를 정의할 수 있습니다.
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// 스토어 설정
const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
    },
});

export default store;
