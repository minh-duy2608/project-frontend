// Lấy ra các phần tử trong DOM
const buttonAddCategoryElement = document.querySelector("#buttonAddCategory");
const formCategoryElement = document.querySelector("#formCategory");
const iconCloseFormCategoryElement = document.querySelector(
  "#iconCloseFormCategory"
);
const btnCloseFormCategoryElement = document.querySelector(
  "#btnCloseFormCategory"
);

// Hàm mở form
function handleOpenForm() {
  formCategoryElement.style.display = "flex";
}

// Hàm đóng form
function handleClose() {
  formCategoryElement.style.display = "none";
}

// Lắng nghe sự kiện click vào button thêm mới
buttonAddCategoryElement.addEventListener("click", handleOpenForm);

// Lắng nghe sự kiện click vào icon đóng form
iconCloseFormCategoryElement.addEventListener("click", handleClose);

// Lắng nghe sự kiện click vào button đóng form
btnCloseFormCategoryElement.addEventListener("click", handleClose);

