const logInForm = document.getElementById("logInForm");
const logInEmail = document.getElementById("logInEmail");
const logInPassword = document.getElementById("LogInPassword");

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    logInEmail.value === "" ||
    logInEmail.value == null ||
    logInPassword.value === "" ||
    logInPassword.value == null
  ) {
    
    alert("Please fill the form before submitting");
    return;
  } else {
    logIn(logInEmail.value, logInPassword.value)
  }
});


const logIn = async (emailValue, passwordValue) =>{
    try {
        const response = await fetch("/users/login", {
          method: "POST",
          redirect: 'manual',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });
        if(response.status == 403){
          alert('Can not authenticate')
          return;
        }
        if (response.type == "opaqueredirect"){  
    window.location.replace('/home'); 
    
    return;
    }
        // console.log(await response.json())
    } catch (error) {
        console.log(error)
    }
}