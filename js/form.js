/*
 * file name  : form.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 「個人情報」に関する関数を定義する
 * Modified   : 2025/1/16 by Kaito Koto
 * Reason     : ファイル名の変更及び追加の質問項目に対応
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("form : DOMContentLoaded.");
  // 進捗バーの設定
  updateProgressBar(); // 現在の進捗バーの表示
  addButtons(); // ボタンの表示
  restoreFormData(); // 保存した解答の復元
});

/**
 * 個人情報に関する全ての項目に答えられているか検証する
 * @returns {boolean} 検証結果
 * @author Kaito Koto
 */
window.ValidFormInfo = function () {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;

  const validateField = (inputId, errorId, messageId, validationFn, errorMessage) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    const message = document.getElementById(messageId);
    error.textContent = "";
    if (!validationFn(input.value)) {
      error.textContent = errorMessage;
      if (message) message.style.display = "block";
      valid = false;
    } else {
      if (message) message.style.display = "none";
    }
  };

  validateField("name", "nameError", "nameMessage", value => value.trim() !== "", "名前を入力してください。");
  validateField("gender", "genderError", "genderMessage", value => value !== "", "性別を選択してください。");
  validateField("age", "ageError", "ageMessage", value => /^\d+$/.test(value), "年齢は半角数字で入力してください。");
  validateField("environment", "environmentError", "environmentMessage", value => value !== "", "環境を選択してください。");
  validateField("device", "deviceError", "deviceMessage", value => value !== "", "端末を選択してください。");
  validateField("peripheral", "peripheralError", "peripheralMessage", value => value !== "", "周辺機器を選択してください。");
  validateField("email", "emailError", "emailMessage", value => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value.trim() !== "" && emailPattern.test(value.trim());
  }, "有効なメールアドレスを入力してください。");

  console.log(">> return valid : " + valid);

  return valid;
};
