import React, { useEffect, useState } from "react";
import useResponsive from "../../hooks/useReponsive";
import Banner from "../Banner/Banner";
import InPutCustom from "../Input/InPutCustom";
import IconSearch from "./../icon/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { congViecService } from "../../services/congViec.service";
import { Dropdown } from "antd";
import useDebounce from "../../hooks/useDebounce";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const FormSearchProduct = () => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");
  const [checkDropDown, setCheckDropDown] = useState(false);
  const [listJobSuggest, setListJobSuggest] = useState([
    {
      key: 1,
      label: "hello",
    },
  ]);

  const debounceValue = useDebounce(valueSearch, 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(valueSearch);
    navigate(`${pathDefault.listJob}?tenCongViec=${valueSearch}`);
  };

  useEffect(() => {
    if (valueSearch) {
      // gọi API lấy dữ liệu sản phẩm để gợi ý người dùng
      congViecService
        .layCongViecTheoTen(valueSearch)
        .then((res) => {
          console.log(res);

          const newListJobSuggest = res.data.content
            .slice(0, 4)
            .map((item, index) => {
              return {
                key: index.toString(),
                label: (
                  <Link
                    to={`/cong-viec-chi-tiet/${item.id}`}
                    className="flex items-center space-x-4"
                  >
                    <img src={item.congViec.hinhAnh} className="h-14" alt="" />
                    <div>
                      <h4>{item.congViec.tenCongViec}</h4>
                      <p>{item.congViec.giaTien}</p>
                    </div>
                  </Link>
                ),
              };
            });
          setListJobSuggest(newListJobSuggest);
          setCheckDropDown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debounceValue]);

  const handleChange = (e) => {
    setValueSearch(e.target.value);
    // debounceValue(e.target.value);
    // console.log(debounceValue);
    if (!e.target.value) {
      console.log("Tắt dropdown");
      setCheckDropDown(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Dropdown
          menu={{
            items: listJobSuggest,
          }}
          open={checkDropDown}
        >
          <div className="pl-4 rounded-md border border-gray-500 flex items-center justify-between min-w-[400px]">
            <input
              className="flex-1 focus:border-none focus:outline-none "
              type="text"
              placeholder="Nhập công việc để tìm kiếm"
              onChange={handleChange}
              value={valueSearch}
            />
            <button type="submit" className=" p-2">
              <IconSearch color="rgb(156 163 175)" size={30} />
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default FormSearchProduct;
