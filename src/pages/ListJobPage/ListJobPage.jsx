import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  //   console.log(searchParam.get("tenCongViec"));
  const [listJob, setListJob] = useState([]);

  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        console.log(res);
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderListJob = () => {
    return (
      <div className="grid grid-cols-4 gap-5">
        {listJob.map((item, index) => {
          // console.log(item);
          return (
            <div className="border border-gray-300">
              <img className="w-full" src={item.congViec.hinhAnh} alt="" />
              <div className="px-3">
                {/* info outher */}
                <div className="flex items-center mt-2 space-x-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.avatar}
                    alt=""
                  />
                  {/* Tên tác giả và cấp độ */}
                  <div>
                    <h4>{item.tenNguoiTao}</h4>
                    <p>Level 2</p>
                  </div>
                </div>
                {/* tên công việc */}
                <h3>{item.congViec.tenCongViec}</h3>
                {/* đánh giá */}
                <div className="space-x-2">
                  <i class="fa-solid fa-star text-yellow-400"></i>
                  <span className="text-yellow-400">
                    {item.congViec.saoCongViec}
                  </span>
                  <span className="text-gray-800">
                    ({item.congViec.danhGia})
                  </span>
                </div>
              </div>

              {/* yêu thích và giá tiền  */}
              <div className="flex items-center justify-between border-t border-t-gray-300">
                <i class="fa-solid fa-heart"></i>
                <div className="space-x-3">
                  <span className="uppercase"> staring at</span>
                  <span>${item.congViec.giaTien}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return <div className="container">{renderListJob()}</div>;
};

export default ListJobPage;
