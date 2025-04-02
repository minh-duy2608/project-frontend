// Lấy ra các phần tử trong DOM
const changePenElements = document.querySelectorAll("#changePen"); 
changePenElements.forEach((pen) => {
  pen.addEventListener("click", handleOpenForm);
});

const formCategoryElement = document.querySelector("#formCategoryy");
const iconCloseFormCategoryElement = document.querySelector(
  "#iconCloseFormCategoryy"
);
const btnCloseFormCategoryElement = document.querySelector(
  "#btnCloseFormCategoryy"
);

// Hàm mở form
function handleOpenForm() {
  formCategoryElement.style.display = "flex";
}
x``
// Hàm đóng form
function handleClose() {
  formCategoryElement.style.display = "none";
}

// Lắng nghe sự kiện click vào button thêm mới
changePenElements.addEventListener("click", handleOpenForm);

// Lắng nghe sự kiện click vào icon đóng form
iconCloseFormCategoryElement.addEventListener("click", handleClose);

// Lắng nghe sự kiện click vào button đóng form
btnCloseFormCategoryElement.addEventListener("click", handleClose);