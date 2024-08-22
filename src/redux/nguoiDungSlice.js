import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung.service";

export const getValueUserAPI = createAsyncThunk(
  "nguoiDung/getValueUserAPI",
  async (_, ThunkAPI) => {
    const result = await nguoiDungService.getAllUsers();
    console.log(result);
    return result.data.content;
  }
);
const initialState = {
  listUsers: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueUserAPI.fulfilled, (state, action) => {
      console.log(action);
      state.listUsers = action.payload;
    }); //fulfilled : trạng thái hoàn thành or thành công của reduxThunk
    builder.addCase(getValueUserAPI.pending, (state, action) => {
      console.log("Tôi đang chờ xử lí");
    });
    builder.addCase(getValueUserAPI.rejected, (state, action) => {
      console.log("Tôi bị lỗi");
    });
  },
});

export const {} = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
