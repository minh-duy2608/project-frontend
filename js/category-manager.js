// DOM Elements
const buttonAddCategoryElement = document.querySelector("#buttonAddCategory");
const formCategoryElement = document.querySelector("#formCategory");
const iconCloseFormCategoryElement = document.querySelector("#iconCloseFormCategory");
const btnCloseFormCategoryElement = document.querySelector("#btnCloseFormCategory");
const btnAddFormCategory = document.querySelector("#btnAddFormCategory");
const nameEditInput = document.querySelector("#nameEdit");
const nameError = document.querySelector("#nameError");
const tbody = document.querySelector(".category-table tbody");
const statusFilter = document.querySelector("#statusFilter");
const searchInput = document.querySelector(".input-search");
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
  if (nameEditInput) nameEditInput.value = "";
  const activeEdit = document.getElementById("activeEdit");
  const inactiveEdit = document.getElementById("inactiveEdit");
  if (activeEdit) activeEdit.checked = false;
  if (inactiveEdit) inactiveEdit.checked = false;
  if (nameError) {
    nameError.textContent = "";
    nameError.style.display = "none";
    nameEditInput.style.border = "1px solid #ccc";
  }
  btnAddFormCategory.removeEventListener("click", handleAddCategory);
  btnAddFormCategory.removeEventListener("click", handleEditCategory);
  btnAddFormCategory.addEventListener("click", handleAddCategory);
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

// Lưu dữ liệu vào Local Storage
function saveToLocalStorage(data) {
  try {
    localStorage.setItem("categories", JSON.stringify(data));
    console.log("Dữ liệu đã lưu:", data);
  } catch (error) {
    console.error("Lỗi khi lưu vào Local Storage:", error);
  }
}

// Lấy dữ liệu từ Local Storage
function getFromLocalStorage() {
  try {
    const data = localStorage.getItem("categories");
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

  if (status !== "all") {
    data = data.filter(item => item.status === status);
  }

  if (currentSearchTerm) {
    data = data.filter(item => item.name.toLowerCase().includes(currentSearchTerm));
  }

  // Sắp xếp dữ liệu theo tên danh mục
  data.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
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
      <td colspan="4" style="text-align: center;">Không có danh mục nào</td>
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
    const globalIndex = startIndex + index;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        <div class="status ${item.status === 'active' ? 'status-active' : 'status-inactive'}">
          <div class="dot ${item.status === 'active' ? 'active' : 'inactive'}"></div>
          <span>${item.status === 'active' ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
        </div>
      </td>
      <td>
        <img class="trash" data-index="${globalIndex}" src="../assets/icons/trash.png" alt="Xóa">
        <img class="pen" data-index="${globalIndex}" src="../assets/icons/pen.png" alt="Chỉnh sửa">
      </td>
      <td></td>
    `;
    tbody.appendChild(row);
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

// Xử lý thêm mới danh mục
function handleAddCategory(event) {
  event.preventDefault();

  const nameValue = nameEditInput.value.trim();
  const activeEdit = document.getElementById("activeEdit");
  const inactiveEdit = document.getElementById("inactiveEdit");
  const isActive = activeEdit ? activeEdit.checked : false;
  const isInactive = inactiveEdit ? inactiveEdit.checked : false;

  nameError.textContent = "";
  nameError.style.display = "none";
  nameEditInput.style.border = "1px solid #ccc";

  let isValid = true;

  // Kiểm tra tên trống
  if (!nameValue) {
    nameError.textContent = "Tên môn học không được để trống";
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red";
    isValid = false;
    console.log("Validate thất bại: Tên trống");
  }

  // Kiểm tra trùng tên
  const categories = getFromLocalStorage();
  const isNameExist = categories.some(
    (category) => category.name.toLowerCase() === nameValue.toLowerCase()
  );
  if (isNameExist) {
    nameError.textContent = "Tên môn học đã tồn tại";
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red";
    isValid = false;
    console.log("Validate thất bại: Tên môn học trùng lặp");
  }

  // Kiểm tra trạng thái
  if (!isActive && !isInactive) {
    isValid = false;
    console.log("Validate thất bại: Không chọn trạng thái");
  }

  if (!isValid) return;

  const newCategory = {
    name: nameValue,
    status: isActive ? "active" : "inactive",
  };

  categories.push(newCategory);
  saveToLocalStorage(categories);
  currentPage = 1;
  filterByStatus(currentFilterStatus);
  handleCloseForm();
}

// Xử lý chỉnh sửa danh mục
function handleEditCategory(event, index) {
  event.preventDefault();

  const updatedName = nameEditInput.value.trim();
  const activeEdit = document.getElementById("activeEdit");
  const inactiveEdit = document.getElementById("inactiveEdit");
  const updatedStatus = activeEdit && activeEdit.checked ? "active" : "inactive";
  const data = getFromLocalStorage();

  nameError.textContent = "";
  nameError.style.display = "none";
  nameEditInput.style.border = "1px solid #ccc";

  // Kiểm tra tên trống
  if (!updatedName) {
    nameError.textContent = "Tên môn học không được để trống";
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red";
    return;
  }

  // Kiểm tra trùng tên (ngoại trừ danh mục đang chỉnh sửa)
  const isNameExist = data.some(
    (category, i) =>
      i !== index && category.name.toLowerCase() === updatedName.toLowerCase()
  );
  if (isNameExist) {
    nameError.textContent = "Tên môn học đã tồn tại";
    nameError.style.display = "block";
    nameEditInput.style.border = "2px solid red";
    return;
  }

  if (index >= 0 && index < data.length) {
    data[index] = { name: updatedName, status: updatedStatus };
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
        const category = data[index];

        if (formCategoryElement) {
          formCategoryElement.style.display = "flex";
        }

        if (nameEditInput) nameEditInput.value = category.name;
        const activeEdit = document.getElementById("activeEdit");
        const inactiveEdit = document.getElementById("inactiveEdit");

        if (activeEdit) activeEdit.checked = category.status === "active";
        if (inactiveEdit) inactiveEdit.checked = category.status === "inactive";

        nameError.textContent = "";
        nameError.style.display = "none";
        nameEditInput.style.border = "1px solid #ccc";

        btnAddFormCategory.removeEventListener("click", handleAddCategory);
        btnAddFormCategory.removeEventListener("click", handleEditCategory);
        const boundEditHandler = (event) => handleEditCategory(event, index);
        btnAddFormCategory.addEventListener("click", boundEditHandler);

        const resetHandler = () => {
          btnAddFormCategory.removeEventListener("click", boundEditHandler);
          btnAddFormCategory.addEventListener("click", handleAddCategory);
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

// Xử lý xóa danh mục
let currentDeleteIndex = null;

function showDeleteModal(index) {
  const deleteModal = document.getElementById("deleteModal");
  const deleteCategoryName = document.getElementById("deleteCategoryName");
  const categories = getFromLocalStorage();

  if (index >= 0 && index < categories.length) {
    currentDeleteIndex = index;
    const category = categories[index];
    deleteCategoryName.textContent = category.name;
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

if (btnAddFormCategory) btnAddFormCategory.addEventListener("click", handleAddCategory);

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

// Gắn sự kiện sắp xếp khi nhấp vào tiêu đề "Tên môn học"
document.addEventListener("DOMContentLoaded", () => {
  const nameHeader = document.querySelector(".category-table th:nth-child(1)"); // Cột "Tên môn học" là cột thứ 1
  if (nameHeader) {
    nameHeader.style.cursor = "pointer"; // Thêm con trỏ để biểu thị có thể nhấp
    nameHeader.addEventListener("click", () => {
      sortDirection = sortDirection === "asc" ? "desc" : "asc"; // Chuyển đổi hướng sắp xếp
      filterByStatus(currentFilterStatus); // Gọi lại hàm lọc và sắp xếp
      console.log("Sắp xếp theo tên môn học:", sortDirection);
    });
  } else {
    console.error("Không tìm thấy tiêu đề cột 'Tên môn học'");
  }
});