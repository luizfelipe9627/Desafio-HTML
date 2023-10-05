// Chama os elementos do HTML.
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const eye = document.querySelector(".icon-eye");
const error = document.querySelector(".error");
const textarea = document.querySelector("textarea");
const radio = document.querySelectorAll("input[type=radio]");

// Array com os elementos do HTML e os eventos que serão utilizados.
const inputs = [nameInput, ageInput, emailInput, passwordInput, textarea];
const events = ["input", "blur"];

// Função responsável por mostrar a senha.
function togglePassword() {
  eye.classList.toggle("active");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

// Função responsável por criar o elemento P de erro.
function createErrorElement(input, errorMessage) {
  const errorElement = input.nextElementSibling; // O nextElementSibling é responsável por retornar o elemento irmão do input, o que vem logo após ele.

  if (!errorElement || !errorElement.classList.contains("error")) {
    const errorP = document.createElement("p");
    errorP.classList.add("error");
    errorP.textContent = errorMessage;
    // O insertBefore é responsável por inserir um elemento antes de outro, recebe dois parâmetros, o primeiro é o elemento que será inserido e o segundo é o elemento que será o próximo irmão do elemento inserido.
    // O parentNode é responsável por retornar o elemento pai do input.
    input.parentNode.insertBefore(errorP, input.nextSibling);
  } else {
    errorElement.textContent = errorMessage;
  }
}

// Função responsável por remover o elemento P de erro.
function removeErrorElement(input) {
  const errorElement = input.nextElementSibling;
  
  if (errorElement && errorElement.classList.contains("error")) {
    errorElement.remove();
  }
}

// Função responsável por validar os campos do formulário.
function handleSubmit(event) {
  event.preventDefault();

  const formData = {};

  inputs.forEach((input) => {
    validateInput(input);
  });

  // O método every() é responsável por verificar se todos os elementos do array passam no teste implementado pela função fornecida.
  const allFieldsValid = inputs.every((input) =>
    input.classList.contains("success"),
  );

  if (allFieldsValid) {
    alert("Formulário enviado com sucesso!");

    inputs.forEach((input) => {
      formData[input.id] = input.value;

      radio.forEach((radio) => {
        if (radio.checked) {
          formData[radio.name] = radio.id;
        }
      });

      input.classList.remove("success");
    });
    console.log(formData);
    event.target.reset();
  }

  eventsHandler();
}

// Função responsável por adicionar os eventos aos elementos do HTML.
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

// Função responsável por validar os inputs do formulário.
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

// Função responsável por validar o email.
function validateEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value !== "" && !emailRegex.test(input.value)) {
    input.classList.add("error");
    createErrorElement(input, "Email inválido.");
    input.classList.remove("success");
  }
}

// Função responsável por validar a senha.
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
    passwordInput.classList.remove("error");
    passwordInput.classList.add("success");
  }
}
