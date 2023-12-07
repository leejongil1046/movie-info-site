import {
  setupBackButton,
  setupRefreshButton,
} from "/js/modules/navigationControl.js";

import { generateBirthOptions } from "/js/modules/birthOptions.js";

import { usernameDuplicationCheck } from "/js/modules/usernameDuplicationCheck.js";

import { emailDuplicationCheck } from "/js/modules/emailDuplicationCheck.js";

import {
  checkPasswordValidation,
  isPwValid,
  isPwReValid,
} from "/js/modules/passwordValidation.js";

import {
  checkBirthdateValidation,
  isBirthdateValid,
} from "/js/modules/birthdateValidation.js";

import { formSubmit } from "/js/modules/formSubmit.js";

let isUsernameValid = false;
let isEmailValid = false;

document.addEventListener("DOMContentLoaded", async function () {
  setupBackButton("back-icon");
  setupRefreshButton("refresh-icon");

  generateBirthOptions();

  document.querySelector("#username").addEventListener("input", async () => {
    isUsernameValid = await usernameDuplicationCheck();
  });

  document.querySelector("#email").addEventListener("input", async () => {
    isEmailValid = await emailDuplicationCheck();
  });
  checkPasswordValidation();
  checkBirthdateValidation();

  formSubmit(
    () =>
      isUsernameValid &&
      isEmailValid &&
      isPwValid &&
      isPwReValid &&
      isBirthdateValid
  );
});
