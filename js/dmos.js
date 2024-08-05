/*
 * file name  : dmos.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 「dmos」に関する関数を定義する
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("dmos : DOMContentLoaded.");
  // コンテナ生成の設定
  const containerDmos = document.getElementById("container-dmos");
  const { startQuestion, endQuestion } = getDmosQuestionRange(); // 質問範囲を取得

  if (containerDmos) {
    // 各コンテナのオーディオファイル名の配列

    for (let i = startQuestion; i < endQuestion; i++) {
      const containerHTML = `
                <div class="survey-container">
                    <p>${i + 1}問目</p>
                    <!-- 音声再生部分 -->
                    <div class="audio-wrapper">
                      <span>A：</span>
                      <audio controls>
                        <source src="${DMOSaudioFiles[i][0]}" type="audio/wav">
                        お使いのブラウザはaudio要素をサポートしていません。
                      </audio>
                    </div>
                    <div class="audio-wrapper">
                      <span>B：</span>
                      <audio controls>
                        <source src="${DMOSaudioFiles[i][1]}" type="audio/wav">
                        お使いのブラウザはaudio要素をサポートしていません。
                      </audio>
                    </div>
                    <!-- アンケート部分 -->
                    <fieldset>
                        <legend>音声の評価</legend>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="1" required> 1：完全に不自然
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="2" required> 2：少し不自然
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="3" required> 3：普通
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="4" required> 4：少し自然
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="5" required> 5：完全に自然
                            </label>
                        </div>
                        <div id="dmosError${i + 1}" class="error-message"></div>
                    </fieldset>
                </div>
            `;
      containerDmos.insertAdjacentHTML("beforeend", containerHTML);
    }
  }
  updateProgressBar(); // 現在の進捗バーの表示
  addButtons(); // ボタンの表示
  restoreFormData(); // 保存した解答の復元
});

/**
 * DMOSの質問について、質問の開始と終了を提供します。
 *
 * @returns {number} startQuestion - ページの始めの問題数
 * @returns {number} endQuestion - ページの最後の問題数
 * @author Kaito Koto
 */
function getDmosQuestionRange() {
  console.log("<-- Function in " + getCallerName() + "-->");
  const currentdmosPage = getCurrentPage(); // DMOSの現在のページ数を取得

  // 設定に応じてページごとの質問セットを表示
  const startQuestion =
    (currentdmosPage - 1 - HTML[0].Pages - HTML[1].Pages) * HTML[2].perpage;
  const endQuestion = Math.min(startQuestion + HTML[2].perpage, HTML[2].total);

  return { startQuestion, endQuestion };
}

/**
 * DMOSに関する全ての項目に答えられているか検証する
 * @returns {boolean} 検証結果
 * @author Kaito Koto
 */
window.ValidDMOSInfo = function () {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;

  const { startQuestion, endQuestion } = getDmosQuestionRange(); // 質問範囲を取得
  for (let i = startQuestion; i < endQuestion; i++) {
    const dmosError = document.getElementById(`dmosError${i + 1}`);
    const dmosMessage = document.getElementById(`dmosMessage${i + 1}`);
    dmosError.textContent = "";
    let isChecked = false;
    const dmosInputs = document.querySelectorAll(
      `input[name="dmos-rating${i + 1}"]`
    );

    dmosInputs.forEach((input) => {
      if (input.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      dmosError.textContent = "この回答は必須です。";
      if (dmosMessage) dmosMessage.style.display = "block";
      valid = false;
    } else {
      if (dmosMessage) dmosMessage.style.display = "none";
    }
  }
  console.log(">> return vaild : " + valid);
  return valid;
};
