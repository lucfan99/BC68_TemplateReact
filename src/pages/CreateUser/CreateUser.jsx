import React, { useEffect, useState } from "react";
import InPutCustom from "../../components/Input/InPutCustom";
import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SkillService } from "../../services/skill.service";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotifycationContext } from "../../App";

const CreateUser = () => {
  const [listSkill, setListSkill] = useState([]);
  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [],
    certification: [],
  });

  const [step, setStep] = useState(1);
  // const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("false");

  const [uploadImg, setUploadImg] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    setUserValue({ ...userValue, [name]: value });
  };
  const handleSubmitFormCreateUser = (e) => {
    e.preventDefault();
    console.log(userValue);
    nguoiDungService
      .createUser(userValue)
      .then((res) => {
        console.log(res);
        //Đẩy người tạo tới trang upload hình  ảnh để thêm hình vào
        setStep(step + 1);
        //Sử dụng useContext để lấy phương thức thông báo thành công
        setIsActive(false);
        //setTimeout
      })
      .catch((err) => {
        console.log(err);
        //Sử dụng useContext để lấy phương thức thông báo lỗi
      });
  };
  const { user } = useSelector((state) => state.authSlice);

  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (uploadImg) {
      formData.append("formFile", uploadImg.image);
      nguoiDungService
        .uploadAvatar(user.token, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const renderLayoutForm = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-3" onSubmit={handleSubmitFormCreateUser}>
            <InPutCustom
              contentLable="Name"
              name={"name"}
              onChange={handleChangeValue}
            />
            <InPutCustom
              contentLable="Email"
              name={"email"}
              onChange={handleChangeValue}
            />
            <InPutCustom
              contentLable="Phone"
              name={"phone"}
              onChange={handleChangeValue}
            />
            <InPutCustom
              contentLable="Password"
              type="password"
              name={"password"}
              onChange={handleChangeValue}
            />
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Ngày sinh
              </label>
              <input
                className="rounded-md px-3-py-2"
                type="date"
                onChange={(e) => {
                  const [y, m, d] = e.target.value.split("-");
                  let valueDate = `${d}-${m}-${y}`;
                  console.log(`${d} - ${m}-${y}`);
                  setUserValue({ ...userValue, birthday: valueDate });
                }}
                value={userValue.birthday.split("-").reverse().join("-")}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                gender
              </label>
              <select
                name="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={handleChangeValue}
              >
                <option selected value={true}>
                  Nam
                </option>
                <option value={false}>Nữ</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                ROLE
              </label>
              <select
                name="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={handleChangeValue}
              >
                <option selected value="ADMIN">
                  ADMIN
                </option>
                <option value="USER">USER</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Chọn skill
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={listSkill}
                onChange={(value, option) => {
                  console.log(value);
                  // console.log(option);
                  setUserValue({ ...userValue, skill: value });
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Chọn Certification
              </label>
              <Select
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                tokenSeparators={[","]}
                onChange={(value) => {
                  console.log(value);
                  setUserValue({ ...userValue, certification: value });
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white rounded-md"
              >
                {" "}
                Tạo người dùng
              </button>
            </div>
          </form>
        );
      case 1:
        return (
          <div>
            <form onSubmit={handleSubmitAvatar} className="space-y-2">
              <h2>Upload hình ảnh cho người dùng</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Ngày sinh
                </label>
                <input
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    const image = e.target.files[0];

                    if (image) {
                      //Kiểm tra dung lượng hình nếu lớn hỏn 10 MB thì thông báo ko nhận hình ảnh
                      if (image.size > 1 * 1024 * 1024) {
                        setErrorImage("Hình ảnh vượt quá dung lượng cho phép ");
                        return;
                      } else {
                        const imageURL = URL.createObjectURL(image);
                        console.log(imageURL);
                        setUploadImg({ image, imageURL });
                      }
                    }
                  }}
                  type="file"
                />
              </div>
              <p className="text-red-500">{errorImage}</p>
              <img src={uploadImg?.imageURL} alt="" className=" w-64" />
              <button
                type="submit"
                className="py-2 px-5 bg-green-600 text-white rounded-md"
              >
                Upload ảnh
              </button>
            </form>
          </div>
        );
    }
  };
  useEffect(() => {
    SkillService.getAllSkill()
      .then((res) => {
        console.log(res);
        const newListSkill = res.data.content.map((skill, index) => {
          return {
            label: skill.tenSkill,
            value: skill.tenSkill,
          };
        });
        setListSkill(newListSkill);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userValue);
  return (
    <div>
      <h2 className=" font-semibold mb-5 text-3xl">Form tạo người dùng </h2>
      {renderLayoutForm()}
      <button
        disabled={isActive}
        onClick={() => {
          setStep(step + 1);
        }}
        className={`py-2 px-5 bg-black text-white mt-5 rounded-md ${
          isActive ? "cursor-not-allowed bg-black/70" : ""
        }`}
      >
        Chuyển tới bước tiếp theo{" "}
      </button>
    </div>
  );
};

export default CreateUser;
