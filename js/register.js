document.addEventListener("DOMContentLoaded", function () {
    const fullNameInput = document.getElementById("fullName");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const checkbox = document.getElementById("check");
    const registerBtn = document.getElementById("button-register");
  
    const errorMessages = {
      fullName: document.getElementById("fullNameError"),
      name: document.getElementById("name-none"),
      email: document.getElementById("emailError"),
      password: document.getElementById("passwordError"),
    };
  
    const hideAllErrors = () => {
      Object.values(errorMessages).forEach((msg) =>
        msg.classList.add("hidden")
      );
    };
  
    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
  
    const isEmailExist = (email) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      return users.some((user) => user.email === email);
    };
  
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      hideAllErrors();
  
      const fullName = fullNameInput.value.trim();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      let isValid = true;
  
      if (fullName === "") {
        errorMessages.fullName.classList.remove("hidden");
        isValid = false;
      }
  
      if (name === "") {
        errorMessages.name.classList.remove("hidden");
        isValid = false;
      }
  
      if (email === "") {
        errorMessages.email.textContent = "Email không được để trống";
        errorMessages.email.classList.remove("hidden");
        isValid = false;
      } else if (!isValidEmail(email)) {
        errorMessages.email.textContent = "Email không đúng định dạng";
        errorMessages.email.classList.remove("hidden");
        isValid = false;
      } else if (isEmailExist(email)) {
        errorMessages.email.textContent = "Email đã tồn tại";
        errorMessages.email.classList.remove("hidden");
        isValid = false;
      }
  
      if (password === "") {
        errorMessages.password.textContent = "Mật khẩu không được để trống";
        errorMessages.password.classList.remove("hidden");
        isValid = false;
      } else if (password.length < 8) {
        errorMessages.password.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
        errorMessages.password.classList.remove("hidden");
        isValid = false;
      }
  
      if (!checkbox.checked) {
        alert("Vui lòng đồng ý với chính sách và điều kiện.");
        isValid = false;
      }
  
      if (isValid) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push({ fullName, name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công!");
        window.location.href = "./login.html";
      }
    });
  });
  