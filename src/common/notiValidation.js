export const notiValidation = {
  empty: "vui lòng ko bỏ trống",
  email: "Vui lòng nhập đúng định dạng email",
  min: (minValue) => {
    return `Vui lòng nhập tối thiểu ${minValue} ký tự`;
  },
  max: (maxValue) => {
    return `Vui lòng nhập tối đa ${maxValue} ký tự`;
  },
};
