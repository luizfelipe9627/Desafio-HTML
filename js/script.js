const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const eye = document.querySelector(".icon-eye");
const error = document.querySelector(".error");
const textarea = document.querySelector("textarea");

const inputs = [nameInput, ageInput, emailInput, passwordInput, textarea];
const events = ["input", "blur"];

function togglePassword() {
  eye.classList.toggle("active");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function createErrorElement(input, errorMessage) {
  const errorElement = input.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains("error")) {
    const errorP = document.createElement("p");
    errorP.classList.add("error");
    errorP.textContent = errorMessage;
    input.parentNode.insertBefore(errorP, input.nextSibling);
  } else {
    errorElement.textContent = errorMessage;
  }
}

function removeErrorElement(input) {
  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains("error")) {
    errorElement.remove();
  }
}

function handleSubmit(event) {
  event.preventDefault();

  inputs.forEach((input) => {
    validateInput(input);
  });

  // O método every() testa se todos os elementos do array passam pelo teste implementado pela função atribuída e retorna um valor true ou false.
  const allFieldsValid = inputs.every((input) =>
    input.classList.contains("success"),
  );

  if (allFieldsValid) {
    alert("Formulário enviado com sucesso!");
    event.target.reset();
  }

  eventsHandler();
}

function eventsHandler() {
  inputs.forEach((input) => {
    events.forEach((event) => {
      input.addEventListener(event, () => {
        validateInput(input);

        if (input === passwordInput) {
          validatePassword();
        }

        if (input === emailInput) {
          validateEmail(emailInput);
        }
      });
    });
  });
}

eventsHandler();

function validateInput(input) {
  if (input.value === "") {
    createErrorElement(input, "Campo obrigatório.");
    input.classList.add("error");
    input.classList.remove("success");
  } else {
    input.classList.remove("error");
    input.classList.add("success");
    removeErrorElement(input);
  }
}

function validateEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value !== "" && !emailRegex.test(input.value)) {
    input.classList.add("error");
    createErrorElement(input, "Email inválido.");
    input.classList.remove("success");
  }
}

function validatePassword() {
  if (passwordInput.value === "") {
    passwordInput.classList.add("error");
    passwordInput.classList.remove("success");
  } else if (
    passwordInput.value.length < 8 ||
    passwordInput.value.length > 10
  ) {
    createErrorElement(
      passwordInput,
      "A senha deve ter entre 8 e 10 caracteres.",
    );
    passwordInput.classList.add("error");
    passwordInput.classList.remove("success");
  } else {
    error.innerHTML = "";
    passwordInput.classList.remove("error");
    passwordInput.classList.add("success");
  }
}
