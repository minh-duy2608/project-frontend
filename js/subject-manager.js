// DOM Elements
const buttonAddCategoryElement = document.querySelector("#buttonAddCategory");
const formCategoryElement = document.querySelector("#formCategory");
const iconCloseFormCategoryElement = document.querySelector("#iconCloseFormCategory");
const btnCloseFormCategoryElement = document.querySelector("#btnCloseFormCategory");
const btnAddFormCategory = document.querySelector("#btnAddFormCategory");
const categoryNameInput = document.querySelector("#categoryName");
const nameEditInput = document.querySelector("#nameEdit");
const lessonNameInput = document.querySelector("#lessonName");
const nameError = document.querySelector("#nameError");
const nameErrorCategory = document.querySelector("#name-Error");
const lessonNameError = document.querySelector("#lessonNameError");
const tbody = document.querySelector(".category-table tbody");
const statusFilter = document.querySelector("#statusFilter");
const searchInput = document.querySelector(".input-search");
const selectAllCheckbox = document.querySelector("#selectAll");
const prevPageBtn = document.querySelector("#prevPage");
const nextPageBtn = document.querySelector("#nextPage");
const paginationContainer = document.querySelector(".pagination");
const menuItems = document.querySelectorAll(".menu-item");
const avatarIcon = document.querySelector(".img-4");
const logoutMenu = document.querySelector("#logoutMenu");
const logoutBtn = document.querySelector("#logoutBtn");

let currentFilterStatus = "all";
let currentSearchTerm = "";
let currentPage = 1;
const itemsPerPage = 8;
let sortDirection = "asc"; // Biến theo dõi hướng sắp xếp: "asc" (tăng dần) hoặc "desc" (giảm dần)

// Kiểm tra các phần tử DOM
console.log("buttonAddCategoryElement:", buttonAddCategoryElement);
console.log("formCategoryElement:", formCategoryElement);
console.log("btnAddFormCategory:", btnAddFormCategory);
console.log("tbody:", tbody);
console.log("statusFilter:", statusFilter);
console.log("searchInput:", searchInput);
console.log("selectAllCheckbox:", selectAllCheckbox);
console.log("prevPageBtn:", prevPageBtn);
console.log("nextPageBtn:", nextPageBtn);
console.log("paginationContainer:", paginationContainer);
console.log("menuItems:", menuItems);
console.log("avatarIcon:", avatarIcon);
console.log("logoutMenu:", logoutMenu);
console.log("logoutBtn:", logoutBtn);

// Hàm mở và đóng form
function handleOpenForm() {
  if (formCategoryElement) {
    formCategoryElement.style.display = "flex";
    resetForm();
    console.log("Form mở");
  } else {
    console.error("Không tìm thấy formCategoryElement");
  }
}

function handleCloseForm() {
  if (formCategoryElement) {
    formCategoryElement.style.display = "none";
    console.log("Form đóng");
  } else {
    console.error("Không tìm thấy formCategoryElement để đóng");
  }
}

// Reset form
function resetForm() {
  if (categoryNameInput) categoryNameInput.value = "";
  if (nameEditInput) nameEditInput.value = "";
  if (lessonNameInput) lessonNameInput.value = "";
  const activeEdit = document.getElementById("activeEdit");
  const inactiveEdit = document.getElementById("inactiveEdit");
  if (activeEdit) activeEdit.checked = false;
  if (inactiveEdit) inactiveEdit.checked = false;
  if (nameError) {
    nameError.textContent = "";
    nameError.style.display = "none";
    nameEditInput.style.border = "1px solid #dadada";
  }
  if (nameErrorCategory) {
    nameErrorCategory.textContent = "";
    nameErrorCategory.style.display = "none";
    categoryNameInput.style.border = "1px solid #dadada";
  }
  if (lessonNameError) {
    lessonNameError.textContent = "";
    lessonNameError.style.display = "none";
    lessonNameInput.style.border = "1px solid #dadada";
  }
  btnAddFormCategory.removeEventListener("click", handleAddSubject);
  btnAddFormCategory.removeEventListener("click", handleEditSubject);
  btnAddFormCategory.addEventListener("click", handleAddSubject);
  document.querySelector("#formHeaderAdd h3").textContent = "Thêm mới bài học";
  console.log("Form đã được reset");
}

// Hàm làm nổi bật mục được chọn trong menu
function highlightMenuItem(selectedItem) {
  menuItems.forEach(item => {
    item.classList.remove("active");
  });
  selectedItem.classList.add("active");
}

// Hàm hiển thị/ẩn menu đăng xuất
function toggleLogoutMenu() {
  if (logoutMenu) {
    if (logoutMenu.style.display === "none" || logoutMenu.style.display === "") {
      logoutMenu.style.display = "block";
    } else {
      logoutMenu.style.display = "none";
    }
  }
}

// Hàm xử lý đăng xuất
function handleLogout() {
  localStorage.removeItem("user");
  window.location.href = "../pages/login.html";
}

// Sự kiện
if (buttonAddCategoryElement) buttonAddCategoryElement.addEventListener("click", handleOpenForm);
if (iconCloseFormCategoryElement) iconCloseFormCategoryElement.addEventListener("click", handleCloseForm);
if (btnCloseFormCategoryElement) btnCloseFormCategoryElement.addEventListener("click", handleCloseForm);
if (statusFilter) {
  statusFilter.addEventListener("change", function () {
    currentFilterStatus = this.value;
    currentPage = 1;
    filterByStatus(currentFilterStatus);
  });
}
if (searchInput) {
  searchInput.addEventListener("input", function () {
    currentSearchTerm = this.value.trim().toLowerCase();
    currentPage = 1;
    filterByStatus(currentFilterStatus);
  });
}

if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(".subjectCheckbox");
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.checked;
      const row = checkbox.closest("tr");
      if (this.checked) {
        row.classList.add("row-selected");
      } else {
        row.classList.remove("row-selected");
      }
    });
  });
}

// Sự kiện cho avatar và đăng xuất
if (avatarIcon) {
  avatarIcon.addEventListener("click", (e) => {
    e.preventDefault();
    toggleLogoutMenu();
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", handleLogout);
}

// Đóng menu đăng xuất khi click ra ngoài
document.addEventListener("click", (e) => {
  if (avatarIcon && logoutMenu && !avatarIcon.contains(e.target) && !logoutMenu.contains(e.target)) {
    logoutMenu.style.display = "none";
  }
});

// Gắn sự kiện click cho từng mục menu
menuItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    highlightMenuItem(this);
    const href = this.getAttribute("href");
    if (href && href !== "#") {
      window.location.href = href;
    }
  });
});

// Lưu dữ liệu vào Local Storage
function saveToLocalStorage(data) {
  try {
    localStorage.setItem("subjects", JSON.stringify(data));
    console.log("Dữ liệu đã lưu:", data);
  } catch (error) {
    console.error("Lỗi khi lưu vào Local Storage:", error);
  }
}

// Lấy dữ liệu từ Local Storage
function getFromLocalStorage() {
  try {
    const data = localStorage.getItem("subjects");
    const parsedData = data ? JSON.parse(data) : [];
    console.log("Dữ liệu lấy từ Local Storage:", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Local Storage:", error);
    return [];
  }
}

// Hiển thị lại bảng từ Local Storage
function renderTable() {
  const data = getFromLocalStorage();
  filterByStatus(currentFilterStatus);
}

function filterByStatus(status) {
  currentFilterStatus = status;
  let data = getFromLocalStorage();

  if (status === "active") {
    data = data.filter(item => item.status === "active");
  } else if (status === "inactive") {
    data = data.filter(item => item.status === "inactive");
  }

  if (currentSearchTerm) {
    data = data.filter(item => item.categoryName.toLowerCase().includes(currentSearchTerm));
  }

  // Sắp xếp dữ liệu theo tên bài học
  data.sort((a, b) => {
    const nameA = a.categoryName.toLowerCase();
    const nameB = b.categoryName.toLowerCase();
    if (sortDirection === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });

  renderPaginatedTable(data);
}

function renderPaginatedTable(data) {
  if (!tbody || !paginationContainer) {
    console.error("Không tìm thấy tbody hoặc paginationContainer");
    return;
  }

  tbody.innerHTML = "";
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  if (totalItems === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" style="text-align: center;">Không có bài học nào</td>
    `;
    tbody.appendChild(row);
    paginationContainer.innerHTML = `
      <button class="page-btn prev" id="prevPage"><img class="arrow-left" src="../assets/icons/arrow left.png" alt=""></button>
      <button class="page-btn next" id="nextPage"><img class="arrow-right" src="../assets/icons/arrow right.png" alt=""></button>
    `;
    console.log("Không có dữ liệu để hiển thị");
    return;
  }

  paginatedData.forEach((item, index) => {
    const row = document.createElement("tr");
    const globalIndex = startIndex + index;
    row.innerHTML = `
      <td><input type="checkbox" class="subjectCheckbox"></td>
      <td>${item.categoryName}</td>
      <td>${item.lessonTime}</td>
      <td>
        <div class="status ${item.status === 'active' ? 'status-active' : 'status-inactive'}">
          <div class="dot ${item.status === 'active' ? 'active' : 'inactive'}"></div>
          <span>${item.status === 'active' ? "Đã hoàn thành" : "Chưa hoàn thành"}</span>
        </div>
      </td>
      <td>
        <img class="trash" data-index="${globalIndex}" src="../assets/icons/trash.png" alt="Xóa">
        <img class="pen" data-index="${globalIndex}" src="../assets/icons/pen.png" alt="Chỉnh sửa">
      </td>
    `;
    tbody.appendChild(row);

    const checkbox = row.querySelector(".subjectCheckbox");
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        row.classList.add("row-selected");
      } else {
        row.classList.remove("row-selected");
      }
      const allCheckboxes = document.querySelectorAll(".subjectCheckbox");
      const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
      selectAllCheckbox.checked = allChecked;
    });
  });

  renderPagination(totalPages);
  console.log("Bảng đã được cập nhật với", paginatedData.length, "dòng trên trang", currentPage);
  rebindTrashIcons();
  rebindPenIcons();
}

function renderPagination(totalPages) {
  paginationContainer.innerHTML = `
    <button class="page-btn prev" id="prevPage"><img class="arrow-left" src="../assets/icons/arrow left.png" alt=""></button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      filterByStatus(currentFilterStatus);
    });
    paginationContainer.appendChild(pageBtn);
  }

  paginationContainer.innerHTML += `
    <button class="page-btn next" id="nextPage"><img class="arrow-right" src="../assets/icons/arrow right.png" alt=""></button>
  `;

  const prevPageBtn = document.querySelector("#prevPage");
  const nextPageBtn = document.querySelector("#nextPage");

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      filterByStatus(currentFilterStatus);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      filterByStatus(currentFilterStatus);
    }
  });
}

// Xử lý thêm mới bài học
function handleAddSubject(event) {
  event.preventDefault();

  const categoryNameValue = categoryNameInput.value.trim();
  const nameValue = nameEditInput.value.trim();
  const lessonTimeValue = lessonNameInput.value.trim();
  const activeEdit = document.getElementById("activeEdit");
  const inactiveEdit = document.getElementById("inactiveEdit");
  const isActive = activeEdit ? activeEdit.checked : false;
  const isInactive = inactiveEdit ? inactiveEdit.checked : false;

  let isValid = true;

  if (!categoryNameValue) {
    nameErrorCategory.textContent = "Tên bài học không được để trống";
    nameErrorCategory.style.display = "block";
    categoryNameInput.style.border = "2px solid red";
    isValid = false;
  } else {
    nameErrorCategory.style.display = "none";
    categoryNameInput.style.border = "1px solid #dadada";
  }

  const subjects = getFromLocalStorage();
  const isNameExist = subjects.some(
    (subject) => subject.categoryName.toLowerCase() === categoryNameValue.toLowerCase()
  );
  if (isNameExist) {
    nameErrorCategory.textContent = "Tên bài học đã tồn tại";
    nameErrorCategory.style.display = "block";
    categoryNameInput.style.border = "2px solid red";
    isValid = false;
    console.log("Validate thất bại: Tên bài học trùng lặp");
  }

  if (!nameValue) {
    nameError.textContent = "Loại môn học không được để trống";
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red";
    isValid = false;
  } else {
    nameError.style.display = "none";
    nameEditInput.style.border = "1px solid #dadada";
  }

  if (!lessonTimeValue || isNaN(lessonTimeValue) || parseInt(lessonTimeValue) <= 0) {
    lessonNameError.textContent = "Nhập gian học (phải là số dương)";
    lessonNameError.style.display = "block";
    lessonNameInput.style.border = "2px solid red";
    isValid = false;
  } else {
    lessonNameError.style.display = "none";
    lessonNameInput.style.border = "1px solid #dadada";
  }

  if (!isActive && !isInactive) {
    isValid = false;
    console.log("Validate thất bại: Không chọn trạng thái");
  }

  if (!isValid) return;

  const newSubject = {
    categoryName: categoryNameValue,
    name: nameValue,
    lessonTime: lessonTimeValue,
    status: isActive ? "active" : "inactive",
  };

  subjects.push(newSubject);
  saveToLocalStorage(subjects);
  currentPage = 1;
  filterByStatus(currentFilterStatus);
  handleCloseForm();
}

// Xử lý chỉnh sửa bài học
function handleEditSubject(event, index) {
  event.preventDefault();

  const updatedCategoryName = categoryNameInput.value.trim();
  const updatedName = nameEditInput.value.trim();
  const updatedLessonTime = lessonNameInput.value.trim();
  const activeEdit = document.getElementById("activeEdit");
  const inactiveEdit = document.getElementById("inactiveEdit");
  const updatedStatus = activeEdit && activeEdit.checked ? "active" : "inactive";
  const data = getFromLocalStorage();

  let isValid = true;

  if (!updatedCategoryName) {
    nameErrorCategory.textContent = "Tên bài học không được để trống";
    nameErrorCategory.style.display = "block";
    categoryNameInput.style.border = "2px solid red";
    isValid = false;
  } else {
    nameErrorCategory.style.display = "none";
    categoryNameInput.style.border = "1px solid #dadada";
  }

  const isNameExist = data.some(
    (subject, i) =>
      i !== index && subject.categoryName.toLowerCase() === updatedCategoryName.toLowerCase()
  );
  if (isNameExist) {
    nameErrorCategory.textContent = "Tên bài học đã tồn tại";
    nameErrorCategory.style.display = "block";
    categoryNameInput.style.border = "2px solid red";
    isValid = false;
    console.log("Validate thất bại: Tên bài học trùng lặp");
  }

  if (!updatedName) {
    nameError.textContent = "Tên môn học không được để trống";
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red";
    isValid = false;
  } else {
    nameError.style.display = "none";
    nameEditInput.style.border = "1px solid #dadada";
  }

  if (!updatedLessonTime || isNaN(updatedLessonTime) || parseInt(updatedLessonTime) <= 0) {
    lessonNameError.textContent = "Thời gian học phải là số dương";
    lessonNameError.style.display = "block";
    lessonNameInput.style.border = "2px solid red";
    isValid = false;
  } else {
    lessonNameError.style.display = "none";
    lessonNameInput.style.border = "1px solid #dadada";
  }

  if (!isValid) return;

  if (index >= 0 && index < data.length) {
    data[index] = {
      categoryName: updatedCategoryName,
      name: updatedName,
      lessonTime: updatedLessonTime,
      status: updatedStatus,
    };
    saveToLocalStorage(data);
    filterByStatus(currentFilterStatus);
    handleCloseForm();
  } else {
    console.error("Index không hợp lệ khi chỉnh sửa:", index);
  }
}

// Gắn sự kiện cho biểu tượng bút
function rebindPenIcons() {
  const penIcons = document.querySelectorAll(".pen");
  penIcons.forEach((icon) => {
    icon.onclick = function () {
      const index = parseInt(icon.getAttribute("data-index"));
      const data = getFromLocalStorage();

      if (index >= 0 && index < data.length) {
        const subject = data[index];

        if (formCategoryElement) {
          formCategoryElement.style.display = "flex";
        }

        if (categoryNameInput) categoryNameInput.value = subject.categoryName;
        if (nameEditInput) nameEditInput.value = subject.name;
        if (lessonNameInput) lessonNameInput.value = subject.lessonTime;
        const activeEdit = document.getElementById("activeEdit");
        const inactiveEdit = document.getElementById("inactiveEdit");

        if (activeEdit) activeEdit.checked = subject.status === "active";
        if (inactiveEdit) inactiveEdit.checked = subject.status === "inactive";

        nameErrorCategory.textContent = "";
        nameErrorCategory.style.display = "none";
        categoryNameInput.style.border = "1px solid #dadada";
        nameError.textContent = "";
        nameError.style.display = "none";
        nameEditInput.style.border = "1px solid #dadada";
        lessonNameError.textContent = "";
        lessonNameError.style.display = "none";
        lessonNameInput.style.border = "1px solid #dadada";

        btnAddFormCategory.removeEventListener("click", handleAddSubject);
        btnAddFormCategory.removeEventListener("click", handleEditSubject);
        const boundEditHandler = (event) => handleEditSubject(event, index);
        btnAddFormCategory.addEventListener("click", boundEditHandler);

        document.querySelector("#formHeaderAdd h3").textContent = "Cập nhật bài học";

        const resetHandler = () => {
          btnAddFormCategory.removeEventListener("click", boundEditHandler);
          btnAddFormCategory.addEventListener("click", handleAddSubject);
          document.querySelector("#formHeaderAdd h3").textContent = "Thêm mới bài học";
        };
        btnCloseFormCategoryElement.removeEventListener("click", resetHandler);
        btnCloseFormCategoryElement.addEventListener("click", resetHandler);
        iconCloseFormCategoryElement.removeEventListener("click", resetHandler);
        iconCloseFormCategoryElement.addEventListener("click", resetHandler);
      } else {
        console.error("Không tìm thấy phần tử để chỉnh sửa hoặc index không hợp lệ:", index);
      }
    };
  });
}

// Xử lý xóa bài học
let currentDeleteIndex = null;

function showDeleteModal(index) {
  const deleteModal = document.getElementById("deleteModal");
  const deleteCategoryName = document.getElementById("deleteCategoryName");
  const subjects = getFromLocalStorage();

  if (index >= 0 && index < subjects.length) {
    currentDeleteIndex = index;
    const subject = subjects[index];
    deleteCategoryName.textContent = subject.categoryName;
    deleteModal.style.display = "flex";
  }
}

function closeDeleteModal() {
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "none";
  currentDeleteIndex = null;
}

function rebindTrashIcons() {
  const trashIcons = document.querySelectorAll(".trash");
  trashIcons.forEach((icon) => {
    icon.onclick = function () {
      const index = parseInt(icon.getAttribute("data-index"));
      showDeleteModal(index);
    };
  });
}

const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

if (cancelDeleteBtn) {
  cancelDeleteBtn.addEventListener("click", closeDeleteModal);
}

if (confirmDeleteBtn) {
  confirmDeleteBtn.addEventListener("click", () => {
    if (currentDeleteIndex !== null) {
      const data = getFromLocalStorage();
      data.splice(currentDeleteIndex, 1);
      saveToLocalStorage(data);
      currentPage = 1;
      filterByStatus(currentFilterStatus);
      closeDeleteModal();
      showSuccessToast();
    }
  });
}

// Khởi động
renderTable();

// Làm nổi bật mục sidebar tương ứng với trang hiện tại
const currentPath = window.location.pathname;
let currentSection = "statistics";
if (currentPath.includes("category-manager.html")) {
  currentSection = "categories";
} else if (currentPath.includes("subject-manager.html")) {
  currentSection = "subjects";
}

const menuItemMap = {
  "statistics": document.querySelector(".menu-item:nth-child(1)"),
  "categories": document.querySelector(".menu-item:nth-child(2)"),
  "subjects": document.querySelector(".menu-item:nth-child(3)")
};

const defaultItem = menuItemMap[currentSection];
if (defaultItem) {
  highlightMenuItem(defaultItem);
}

function showSuccessToast() {
  const toast = document.getElementById("successToast");
  if (!toast) return;

  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

const closeSuccessToastBtn = document.getElementById("closeSuccessToast");
const successToast = document.getElementById("successToast");

if (closeSuccessToastBtn && successToast) {
  closeSuccessToastBtn.addEventListener("click", () => {
    successToast.style.display = "none";
  });
}

// Gắn sự kiện sắp xếp khi nhấp vào tiêu đề "Tên bài học"
document.addEventListener("DOMContentLoaded", () => {
  const nameHeader = document.querySelector(".category-table th:nth-child(2)"); // Cột "Tên bài học" là cột thứ 2
  if (nameHeader) {
    nameHeader.style.cursor = "pointer"; // Thêm con trỏ để biểu thị có thể nhấp
    nameHeader.addEventListener("click", () => {
      sortDirection = sortDirection === "asc" ? "desc" : "asc"; // Chuyển đổi hướng sắp xếp
      filterByStatus(currentFilterStatus); // Gọi lại hàm lọc và sắp xếp
      console.log("Sắp xếp theo tên bài học:", sortDirection);
    });
  } else {
    console.error("Không tìm thấy tiêu đề cột 'Tên bài học'");
  }
});