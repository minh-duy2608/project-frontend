// Lấy ra các phần tử trong DOM
const buttonAddCategoryElement = document.querySelector("#buttonAddCategory");
const formCategoryElement = document.querySelector("#formCategory");
const iconCloseFormCategoryElement = document.querySelector(
  "#iconCloseFormCategory"
);
const btnCloseFormCategoryElement = document.querySelector(
  "#btnCloseFormCategory"
);

// Lấy các phần tử form và thông báo lỗi
const btnAddFormCategory = document.querySelector("#btnAddFormCategory");
const nameEditInput = document.querySelector("#nameEdit");
const nameError = document.querySelector("#nameError");
const categoryNameInput = document.querySelector("#categoryName");
const categoryNameError = document.querySelector("#name-Error");
const lessonNameInput = document.querySelector("#lessonName"); 
const lessonNameError = document.querySelector("#lessonNameError"); 

// Hàm kiểm tra các ô input
function validateInputs() {
  let isValid = true;

  // Kiểm tra ô Tên môn học
  if (!nameEditInput.value.trim()) {
    nameError.classList.remove("d-none");
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red"; 
    isValid = false;
  } else {
    nameError.classList.add("d-none");
    nameError.style.display = "none";
    nameEditInput.style.border = "1px solid #ccc"; 
  }

  // Kiểm tra ô Tên bài học
  if (!categoryNameInput.value.trim()) {
    categoryNameError.classList.remove("d-none");
    categoryNameError.style.display = "block";
    categoryNameInput.style.border = "2px solid red"; 
    isValid = false;
  } else {
    categoryNameError.classList.add("d-none");
    categoryNameError.style.display = "none";
    categoryNameInput.style.border = "1px solid #ccc"; 
  }

  // Kiểm tra ô Thời gian học
  if (!lessonNameInput.value.trim()) {
    lessonNameError.classList.remove("d-none");
    lessonNameError.style.display = "block";
    lessonNameInput.style.border = "2px solid red"; 
    isValid = false;
  } else {
    lessonNameError.classList.add("d-none");
    lessonNameError.style.display = "none";
    lessonNameInput.style.border = "1px solid #ccc"; 
  }

  return isValid;
}

// Lắng nghe sự kiện click vào nút thêm môn học
btnAddFormCategory.addEventListener("click", function (event) {
  event.preventDefault(); // Ngừng hành động mặc định

  if (validateInputs()) {
    formCategoryElement.style.display = "none"; // Ẩn form khi tất cả các ô input hợp lệ
    nameEditInput.value = "";
    categoryNameInput.value = "";
    lessonNameInput.value = ""; 
  }
});

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
