let signInForm = document.getElementById("signInForm");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let passwordCheck = document.getElementById("passwordCheck");

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    firstName.value === "" ||
    firstName.value == null ||
    lastName.value === "" ||
    lastName.value == null ||
    email.value === "" ||
    email.value == null
  ) {
    alert("Please fill all fields");
    return;
  }

  if (!EMAIL_REGEX.test(email.value)) {
    alert("email format not valid");
    return;
  }
  if (!PASSWORD_REGEX.test(password.value)) {
    alert(
      "Password must be at least 8 character long, must have an upper case and a special character."
    );
    return;
  }
  if (password.value !== passwordCheck.value) {
    alert("Password doesn't match");
    return;
  } else {
    signIn(firstName.value, lastName.value, email.value, password.value);
  }
});

const signIn = async(firstNameValue, lastNameValue, emailValue, passwordValue) => {
  try {
    const response = await fetch("/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
      }),
    });
      if (await response.status == 201) {
        alert("user created successfully");
        window.location = "/";
      }
      if (await response.status == 202) {
        alert("can't create this user");
      }
  } catch (error) {
    console.log(error)
  }
}
