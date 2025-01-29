/*
 * file name  : confirm.js
 * Date       : 2025/1/16
 * Author     : Kaito Koto
 * Function   : 「送信完了」画面に関する関数を定義する
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("confirm : DOMContentLoaded.");
  // 進捗バーの設定
  updateProgressBar(); // 現在の進捗バーの表示
  addButtons(); // ボタンの表示
  restoreFormData(); // 保存した解答の復元
});
