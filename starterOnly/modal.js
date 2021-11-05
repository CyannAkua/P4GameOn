function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formSignup = document.getElementsByName("reserve");
const formFirst = document.getElementById("first");
const formLast = document.getElementById("last");
const formMail = document.getElementById("email");
const formDate = document.getElementById("birthdate");
const formTimes = document.getElementById("quantity");
const formCity = document.getElementsByName("location");
const formCondition = document.getElementById("checkbox1");
const formSubmit = document.getElementsByClassName("btn-submit");
const formError = document.getElementsByClassName("error");
const modalClose = document.querySelectorAll(".close");
const modalCloseButton = document.getElementsByClassName("btn-close");
const modalSbm = document.getElementsByClassName("modal-submitted");
const modalBody = document.getElementsByClassName("modal-body");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose[0].addEventListener("click", closeModal);
modalCloseButton[0].addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalBody[0].style.display = "";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  modalSbm[0].style.display = "none";
}

// validation
function validate() {
  
  // regular expressions
  var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var name = /^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$/;

  // validate first name
  if (!formFirst.value.match(name)) {
    formFirst.style.border = "red 2px solid";
    formError[0].innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    FirstNIsValid = false;
  }
  if (formFirst.value.match(name)) {
    formFirst.style.border = "none";
    formError[0].innerHTML = "";
    FirstNIsValid = true;
  }

  // validate last name
  if (!formLast.value.match(name)) {
    formLast.style.border = "red 2px solid";
    formError[1].innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    LastNIsValid = false;
  }
  if (formLast.value.match(name)) {
    formLast.style.border = "none";
    formError[1].innerHTML = "";
    LastNIsValid = true;
  }

  // validate mail
  if (formMail.value.match(mailFormat)) {
    formMail.style.border = "none";
    formError[2].innerHTML = "";
    MailIsValid = true;
  }
  if (!formMail.value.match(mailFormat)) {
    formMail.style.border = "red 2px solid";
    formError[2].innerHTML = "Cette adresse mail est incorrecte.";
    MailIsValid = false;
  }

  // validate date
  var DateIsValid = false;
  DateValid();
  function DateValid() {
    let val = formDate.value;
    let valNumber = Date.parse(val);
    if (isNaN(valNumber)) {
      DateIsValid = false;
      formDate.style.border = "red 2px solid";
      formError[3].innerHTML = "Veuillez entrer une date.";
    } else {
      DateIsValid = true;
      formDate.style.border = "none";
      formError[3].innerHTML = "";
    }
  }

  // validate number of times competed
  var TimesIsValid = false;
  TimesValid();
  function TimesValid() {
    let val = formTimes.value;
    let valNumber = parseInt(val);
    if (isNaN(valNumber)) {
      TimesIsValid = false;
      formTimes.style.border = "red 2px solid";
      formError[4].innerHTML = "Veuillez entrer un chiffre.";
    } else {
      if (valNumber < 0) {
        TimesIsValid = false;
        formTimes.style.border = "red 2px solid";
        formError[4].innerHTML = "Chiffre ne peut pas être inférieur à 0.";
      } else TimesIsValid = true;
      formTimes.style.border = "none";
      formError[4].innerHTML = "";
    }
  }
  //validate if one of the the city is checked
  var formCitySelected = false;
  for (let i = 0; i < formCity.length; i++) {
    if (formCity[i].checked == true) formCitySelected = true;
  }
  if (formCitySelected == false) {
    formError[5].innerHTML = "Vous devez choisir une option.";
    CityIsValid = false;
  }
  if (formCitySelected == true) {
    formError[5].innerHTML = "";
    CityIsValid = true;
  }

  //validate if the terms and condition are checked
  if (formCondition.checked == false) {
    formError[6].innerHTML =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    ConditionIsValid = false;
  }
  if (formCondition.checked == true) {
    formError[6].innerHTML = "";
    ConditionIsValid = true;
  }

  //confirm if everything is valide, if it is, opens the thanking modal
  if (
    (FirstNIsValid &&
      LastNIsValid &&
      MailIsValid &&
      DateIsValid &&
      TimesIsValid &&
      CityIsValid &&
      ConditionIsValid) == false
  ) {
    return false;
  } else {
    modalBody[0].style.display = "none";
    modalSbm[0].style.display = "flex";
    formSignup[0].reset();
    return false;
  }
}