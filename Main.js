const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("#form");

const showerroer=(input,message)=>{
    let parentElement=input.parentElement;
    parentElement.classList="form-controller error";
    const small=parentElement.querySelector("small");
    const successIcon=parentElement.querySelectorAll("i")[0];
    const errorIcon=parentElement.querySelectorAll("i")[1];
   errorIcon.style.visibility="visible";
    successIcon.style.visibility="hidden";
    small.innerText=message;
}

const showSuccess=(input)=>{
    let parentElement=input.parentElement;
    parentElement.classList="form-controller success";
    const small=parentElement.querySelector("small");
    const successIcon=parentElement.querySelectorAll("i")[0];
    const errorIcon=parentElement.querySelectorAll("i")[1];
   errorIcon.style.visibility="hidden";
    successIcon.style.visibility="visible";
}
const checkempty=(elements)=>{
    elements.forEach((element)=>{
        if(element.value===""){
            showerroer(element,"input is required");

        }else{
            showSuccess(element);
        }
       
})
}
const checkemail=(emailInput)=>{
    const re=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(emailInput.value)){
        showSuccess(emailInput);
    }else{
        showerroer(emailInput,"email is not valid");
    }

}

const checkpassword=(passwordInput,min,max)=>{
    if(passwordInput.value.length<min){
        showerroer(passwordInput,`password must be at least ${min} characters`);
    }else if(passwordInput.value.length>max){
        showerroer(passwordInput,`password must be less than ${max} characters`);
    }else{
        showSuccess(passwordInput);
    }
}
const checkPasswordsMatch=(passwordInput, confirmPasswordInput)=>{
    if(passwordInput.value !== confirmPasswordInput.value){
        showerroer(confirmPasswordInput, "Passwords do not match");
    } else if(confirmPasswordInput.value === ""){
        showerroer(confirmPasswordInput, "Confirm password is required");
    } else {
        showSuccess(confirmPasswordInput);
    }
}
const isAllValid=()=>{
    return [username, email, password, confirmPassword].every(input =>
        input.parentElement.classList.contains("success")
    );
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkempty([username,email,password,confirmPassword]);
    checkemail(email);
    checkpassword(password,6,20);
    checkPasswordsMatch(password, confirmPassword);

    const currentFile = window.location.pathname.split("/").pop();
    const onFormPage = ["index.html", "login.html"].includes(currentFile);

    if(onFormPage && isAllValid()){
        window.location.href = "move-app.html";
    }
});
