/*
 * file name  : dmos_pra.js
 * Date       : 2025/1/20
 * Author     : Kaito Koto
 * Function   : 「dmos_pra」に関する関数を定義する
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("dmos_pra : DOMContentLoaded.");
  // コンテナ生成の設定
  const containerDmos = document.getElementById("container-dmos");
  const { startQuestion, endQuestion } = getQuestionRange(); // 質問範囲を取得

  if (containerDmos) {
    // 各コンテナのオーディオファイル名の配列
    const isMobile = window.innerWidth <= 600;

    for (let i = startQuestion; i < endQuestion; i++) {
      let surveyHTML;

      if (isMobile) {
        // スマホ版のリッカート尺度
        surveyHTML = `
          <div class="likert-group">
            <input type="range" name="dmos-rating${(i + 1).toString().padStart(2, '0')}" min="1" max="4" value="1" required>
            <div class="likert-labels">
              <span>1<br>絶対違う</span>
              <span>2<br>多分違う</span>
              <span>3<br>多分同じ</span>
              <span>4<br>絶対同じ</span>
            </div>
          </div>
        `;
      } else {
        // PC版のラジオボタン
        surveyHTML = `
          <div class="radio-group">
              <label>
                  <input type="radio" name="dmos-rating${(i + 1).toString().padStart(2, '0')}" value="1" required> 1：絶対違う
              </label>
              <label>
                  <input type="radio" name="dmos-rating${(i + 1).toString().padStart(2, '0')}" value="2" required> 2：多分違う
              </label>
              <label>
                  <input type="radio" name="dmos-rating${(i + 1).toString().padStart(2, '0')}" value="3" required> 3：多分同じ
              </label>
              <label>
                  <input type="radio" name="dmos-rating${(i + 1).toString().padStart(2, '0')}" value="4" required> 4：絶対同じ
              </label>
          </div>
        `;
      }

      const containerHTML = `
        <div class="survey-container">
          <p>例題 ${i + 1}問目</p>
          <!-- 音声再生部分 -->
          <div class="audio-wrapper">
            <span>A：</span>
            <audio controls>
              <source src="${DMOStestaudioFiles[i][0]}" type="audio/wav">
              お使いのブラウザはaudio要素をサポートしていません。
            </audio>
          </div>
          <div class="audio-wrapper">
            <span>B：</span>
            <audio controls>
              <source src="${DMOStestaudioFiles[i][1]}" type="audio/wav">
              お使いのブラウザはaudio要素をサポートしていません。
            </audio>
          </div>
          <!-- アンケート部分 -->
          <fieldset>
            <legend>音声の評価</legend>
            ${surveyHTML}
            <div id="dmosError${i + 1}" class="error-message"></div>
          </fieldset>
        </div>
            `;
      containerDmos.insertAdjacentHTML("beforeend", containerHTML);
    }

    // リッカート尺度のinput要素にchangeイベントリスナーを追加
    const likertInputs = document.querySelectorAll('.likert-group input[type="range"]');
    likertInputs.forEach(input => {
      input.addEventListener('change', () => {
        input.setAttribute('data-checked', 'true');
      });
    });
  }
  updateProgressBar(); // 現在の進捗バーの表示
  addButtons(); // ボタンの表示
  restoreFormData(); // 保存した解答の復元
});

/**
 * 検証をスキップする
 * @returns {boolean} 検証結果
 * @author Kaito Koto
 */
window.ValidSkipInfo = function () {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;
  // シャッフルのシード値を5桁のランダムな数で再定義
  setseed();
  console.log(">> return vaild : " + valid);
  return valid;
};
