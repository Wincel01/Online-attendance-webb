document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");
  const attendanceSection = document.getElementById("attendance-section");
  const studentList = document.getElementById("student-list");
  const absenceReason = document.getElementById("absence-reason");
  const teacherControls = document.getElementById("teacher-controls");
  const studentControls = document.getElementById("student-controls");
  const userRole = document.getElementById("user-role");
  const userName = document.getElementById("user-name");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const markAbsentButton = document.getElementById("mark-absent");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

  function showLogin() {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    attendanceSection.style.display = "none";
  }

  function showRegister() {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    attendanceSection.style.display = "none";
  }

  function showAttendance(username, role) {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    attendanceSection.style.display = "block";
    userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    userName.textContent = username;

    if (role === "teacher") {
      teacherControls.style.display = "block";
      studentControls.style.display = "none";

      // Populate student list
      const students = users.filter((user) => user.role === "student");
      studentList.innerHTML = students
        .map((student) => `<option value="${student.username}">${student.username}</option>`)
        .join("");
    } else {
      teacherControls.style.display = "none";
      studentControls.style.display = "block";
    }
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const user = users.find(
      (user) => user.username === username && user.password === password && user.role === role
    );

    if (user) {
      showAttendance(username, user.role);
    } else {
      alert("Invalid login credentials!");
    }
  });

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    if (users.some((user) => user.username === username)) {
      alert("Username already exists!");
    } else {
      users.push({ username, password, role });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      showLogin();
    }
  });

  markAbsentButton.addEventListener("click", () => {
    const studentUsername = studentList.value;
    const reason = absenceReason.value.trim();

    if (studentUsername && reason) {
      attendance.push({ student: studentUsername, reason });
      localStorage.setItem("attendance", JSON.stringify(attendance));
      alert(`${studentUsername} marked absent for: ${reason}`);
    } else {
      alert("Please select a student and enter a reason.");
    }
  });

  function logout() {
    showLogin();
  }

  showLogin();
});
