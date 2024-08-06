/*
 * file name  : mos.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 「mos」に関する関数を定義する
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("mos : DOMContentLoaded.");
  // コンテナ生成の設定
  const containerMos = document.getElementById("container-mos");
  const { startQuestion, endQuestion } = getMosQuestionRange(); // 質問範囲を取得

  if (containerMos) {
    // 各コンテナのオーディオファイル名の配列

    for (let i = startQuestion; i < endQuestion; i++) {
      const containerHTML = `
                <div class="survey-container">
                    <p>${i + 1}問目</p>
                    <!-- 音声再生部分 -->
                    <audio controls>
                        <source src="${MOSaudioFiles[i]}" type="audio/wav">
                        お使いのブラウザはaudio要素をサポートしていません。
                    </audio>
                    <!-- アンケート部分 -->
                    <fieldset>
                        <legend>音声の評価</legend>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="1" required> 1：完全に不自然
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="2" required> 2：少し不自然
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="3" required> 3：普通
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="4" required> 4：少し自然
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="5" required> 5：完全に自然
                            </label>
                        </div>
                        <div id="mosError${i + 1}" class="error-message"></div>
                    </fieldset>
                </div>
            `;
      containerMos.insertAdjacentHTML("beforeend", containerHTML);
    }
  }
  updateProgressBar(); // 現在の進捗バーの表示
  addButtons(); // ボタンの表示
  restoreFormData(); // 保存した解答の復元
});

/**
 * MOSの質問について、質問の開始と終了を提供します。
 *
 * @returns {number} startQuestion - ページの始めの問題数
 * @returns {number} endQuestion - ページの最後の問題数
 * @author Kaito Koto
 */
function getMosQuestionRange() {
  console.log("<-- Function in " + getCallerName() + "-->");
  const currentPage = getCurrentPage(); // MOSの現在のページ数を取得

  // 設定に応じてページごとの質問セットを表示
  const startQuestion = (currentPage - 1 - HTML[0].Pages) * HTML[1].perpage;
  const endQuestion = Math.min(startQuestion + HTML[1].perpage, HTML[1].total);

  return { startQuestion, endQuestion };
}

/**
 * MOSに関する全ての項目に答えられているか検証する
 * @returns {boolean} 検証結果
 * @author Kaito Koto
 */
window.ValidMOSInfo = function () {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;

  const { startQuestion, endQuestion } = getMosQuestionRange(); // 質問範囲を取得
  for (let i = startQuestion; i < endQuestion; i++) {
    const mosError = document.getElementById(`mosError${i + 1}`);
    const mosMessage = document.getElementById(`mosMessage${i + 1}`);
    mosError.textContent = "";
    let isChecked = false;
    const mosInputs = document.querySelectorAll(
      `input[name="mos-rating${i + 1}"]`
    );

    mosInputs.forEach((input) => {
      if (input.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      mosError.textContent = "この回答は必須です。";
      if (mosMessage) mosMessage.style.display = "block";
      valid = false;
    } else {
      if (mosMessage) mosMessage.style.display = "none";
    }
  }
  console.log(">> return vaild : " + valid);
  return valid;
};
