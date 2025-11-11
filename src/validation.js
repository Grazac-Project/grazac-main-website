// export const required = (value) => {
//   return {
//     isTrue: value.trim() !== "" && value.trim() !== null,
//   };
// };

// export const name = (value) => {
//   const regex = /^[A-Za-z]+$/;
//   return {
//     isTrue: regex.test(value),
//   };
// };

// export const validateEmail = (value) => {
//   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return {
//     isTrue: regex.test(value),
//   };
// };

// export const numberCheck = (value) => {
//   const regex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/
//   return {
//     isTrue: regex.test(value),
//   };
// };

export const required = (value) => {
  return {
    isTrue: value.trim() !== "" && value.trim() !== null,
  };
};

export const name = (value) => {
  const regex = /^[A-Za-z]+$/;
  return {
    isTrue: regex.test(value),
  };
};

export const validateEmail = (value) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    isTrue: regex.test(value),
  };
};

export const numberCheck = (value) => {
  const regex = /(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/;
  return {
    isTrue: regex.test(value),
  };
};