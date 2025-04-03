// Lấy ra các phần tử trong DOM
const changePenElements = document.querySelectorAll("#changePen"); 
console.log("changePen", changePenElements);

changePenElements.forEach((pen) => {
  pen.addEventListener("click", handleOpenForm);
});

const formCategoryElementEdit = document.querySelector("#formCategoryy");
const iconCloseFormCategoryElementEdit = document.querySelector(
  "#iconCloseFormCategoryy"
);
const btnCloseFormCategoryElementEdit = document.querySelector(
  "#btnCloseFormCategoryy"
);

// Hàm mở form
function handleOpenForm() {
  formCategoryElementEdit.style.display = "flex";
}
// Hàm đóng form
function handleClose() {
  formCategoryElementEdit.style.display = "none";
}

// Lắng nghe sự kiện click vào icon đóng form
iconCloseFormCategoryElementEdit.addEventListener("click", handleClose);

// Lắng nghe sự kiện click vào button đóng form
btnCloseFormCategoryElementEdit.addEventListener("click", handleClose);