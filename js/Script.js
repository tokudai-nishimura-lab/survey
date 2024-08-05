document.addEventListener("DOMContentLoaded", () => {
  console.log("form : DOMContentLoaded.");
  // 進捗バーの設定
  updateProgressBar();
  addButtons();
});

function validatePersonalInfo() {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;

  // 名前の検証
  const nameInput = document.getElementById("name");

  const nameError = document.getElementById("nameError");
  const nameMessage = document.getElementById("nameMessage");
  nameError.textContent = "";
  if (!nameInput.value.trim()) {
    nameError.textContent = "名前を入力してください。";
    if (nameMessage) nameMessage.style.display = "block";
    valid = false;
  } else {
    if (nameMessage) nameMessage.style.display = "none";
  }

  // 性別の検証
  const genderInput = document.getElementById("gender");

  const genderError = document.getElementById("genderError");
  const genderMessage = document.getElementById("genderMessage");
  genderError.textContent = "";
  if (!genderInput.value) {
    genderError.textContent = "性別を選択してください。";
    if (genderMessage) genderMessage.style.display = "block";
    valid = false;
  } else {
    if (genderMessage) genderMessage.style.display = "none";
  }

  // 年齢の検証
  const ageInput = document.getElementById("age");

  const ageError = document.getElementById("ageError");
  const ageMessage = document.getElementById("ageMessage");
  ageError.textContent = "";
  if (!/^\d+$/.test(ageInput.value)) {
    ageError.textContent = "年齢は半角数字で入力してください。";
    if (ageMessage) ageMessage.style.display = "block";
    valid = false;
  } else {
    if (ageMessage) ageMessage.style.display = "none";
  }
  console.log(">> return vaild : " + valid);

  return valid;
}
