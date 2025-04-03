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



const btnAddFormCategory = document.querySelector("#btnAddFormCategory");
const nameEditInput = document.querySelector("#nameEdit");
const nameError = document.querySelector("#nameError");

btnAddFormCategory.addEventListener("click", function (event) {
  event.preventDefault(); 

  if (!nameEditInput.value.trim()) {
    nameError.classList.remove("d-none");
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red"; 
  } else {
    nameError.classList.add("d-none");
    nameError.style.display = "none";
    nameEditInput.style.border = "1px solid #ccc"; 
    formCategory.style.display = "none";
   nameEditInput.value = "";
  }
});