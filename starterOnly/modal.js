function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
// Modal
const modalbg = document.querySelector(".bground");
const closeBtn = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.querySelector(".content");
// Form
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("formContainer");
const validationMsg = document.querySelector(".validation-msg");
const validationBtn = document.querySelector(".validation-button");

// ----- MODAL OPEN AND CLOSE FUNCTIONS -----
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "flex";
  modalbg.style.overflow = "hidden";
  closeBtn.addEventListener("click", closeModal);
  document.body.classList.add("no-scroll");
  validationBtn.style.display = "none";
  validationMsg.style.display = "none";
}

modalbg.addEventListener("click", (event) => {
  if (event.target === modalbg) {
    closeModal();
  }
});

function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove("no-scroll");
  form.style.display = "block";
  validationBtn.style.display = "none";
  validationMsg.style.display = "none";
}

// ----- FORM VALIDATION -----
const regexLibrary = {
  nameRegex: /^[a-zA-Zà-ÿÀ-ÿ\s\-]{2,}$/,
  emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  birthdayRegex: /^\d{4}-\d{2}-\d{2}$/,
  numberRegex: /^\d+$/,
  checkboxRegex: /.+/,
};

const validationRules = {
  firstName: {
    element: document.getElementById("first"),
    regex: regexLibrary.nameRegex,
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  lastName: {
    element: document.getElementById("last"),
    regex: regexLibrary.nameRegex,
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  email: {
    element: document.getElementById("email"),
    regex: regexLibrary.emailRegex,
    errorMessage: "Adresse e-mail invalide",
  },
  birthdate: {
    element: document.getElementById("birthdate"),
    regex: regexLibrary.birthdayRegex,
    errorMessage: "Vous devez entrer votre date de naissance.",
  },
  quantity: {
    element: document.getElementById("quantity"),
    regex: regexLibrary.numberRegex,
    errorMessage: "Nombre de participations invalide",
    customValidation: (value) => value < 0,
  },
  location: {
    element: document.querySelector('input[name="location"]'),
    regex: regexLibrary.checkboxRegex,
    errorMessage: "Vous devez choisir une option.",
  },
  conditions: {
    element: document.getElementById("checkbox1"),
    regex: regexLibrary.checkboxRegex,
    errorMessage:
      "Vous devez vérifier que vous acceptez les termes et conditions.",
  },
};

function handleSubmit() {
  const validFormData = new FormData(form);
  const formDataObject = {};
  validFormData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log(formDataObject);
  form.style.display = "none";
  validationBtn.style.display = "flex";
  validationMsg.style.display = "flex";
}

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  // for (const field in validationRules) {
  //   const input = validationRules[field];
  //   const value = input.element.value.trim();
  //   let isFieldValid =
  //     input.regex.test(value) &&
  //     (!input.customValidation || !input.customValidation(value));

  //   if (field === "location") {
  //     const radioButtons = document.querySelectorAll('input[name="location"]');
  //     isFieldValid = Array.from(radioButtons).some((radio) => radio.checked);
  //   }

  //   if (field === "conditions") {
  //     const conditionsCheckbox = document.getElementById("checkbox1");
  //     isFieldValid = conditionsCheckbox.checked;
  //   }

  //   if (!isFieldValid) {
  //     console.log(input.errorMessage);
  //     isValid = false;

  //     const errorSpan = document.createElement("span");
  //     errorSpan.classList.add("error-message");
  //     errorSpan.textContent = input.errorMessage;
  //     input.element.classList.add("invalid");
  //     input.element.parentNode.appendChild(errorSpan);
  //   }
  // }

  if (isValid) {
    handleSubmit();
  }
  // if (isValid) {
  //   console.log("Formulaire valide !");
  //   form.submit(handleSubmit(event));
  // }
}

form.addEventListener("submit", validateForm);
