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
  const { startQuestion, endQuestion } = getQuestionRange(); // 質問範囲を取得
  // 音声配列をシャッフル
  shuffleArray(MOSaudioFiles,seededRandom(localStorage.getItem("Seed")));
  console.log("shuffleSeed:", localStorage.getItem("Seed"));

  if (containerMos) {
    // 各コンテナのオーディオファイル名の配列
    const isMobile = window.innerWidth <= 600;

    for (let i = startQuestion; i < endQuestion; i++) {
      let surveyHTML;

      if (isMobile) {
        // スマホ版のリッカート尺度
        surveyHTML = `
          <div class="likert-group">
            <input type="range" name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}" min="1" max="5" value="1" required>
            <div class="likert-labels">
              <span>1<br>完全に<br>不自然</span>
              <span>2</span>
              <span>3<br>どちら<br>でもない</span>
              <span>4</span>
              <span>5<br>完全に<br>自然</span>
            </div>
          </div>
        `;
      } else {
        // PC版のラジオボタン
        surveyHTML = `
          <div class="radio-group">
              <label>
                  <input type="radio" name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}" value="1" required> 1：完全に不自然
              </label>
              <label>
                  <input type="radio" name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}" value="2" required> 2：少し不自然
              </label>
              <label>
                  <input type="radio" name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}" value="3" required> 3：どちらでもない
              </label>
              <label>
                  <input type="radio" name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}" value="4" required> 4：少し自然
              </label>
              <label>
                  <input type="radio" name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}" value="5" required> 5：完全に自然
              </label>
          </div>
        `;
      }

      const containerHTML = `
        <div class="survey-container">
          <p>${i + 1}問目</p>
          <!-- 音声再生部分 -->
          <audio controls>
            <source src="${MOSaudioFiles[i][0]}" type="audio/wav">
            お使いのブラウザはaudio要素をサポートしていません。
          </audio>
          <!-- アンケート部分 -->
          <fieldset>
            <legend>音声の評価</legend>
            ${surveyHTML}
            <div id="mosError${MOSaudioFiles[i][1] + 1}" class="error-message"></div>
          </fieldset>
        </div>
            `;
      containerMos.insertAdjacentHTML("beforeend", containerHTML);
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
 * MOSに関する全ての項目に答えられているか検証する
 * @returns {boolean} 検証結果
 * @author Kaito Koto
 */
window.ValidMOSInfo = function () {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;
  const isMobile = window.innerWidth <= 600;

  const { startQuestion, endQuestion } = getQuestionRange(); // 質問範囲を取得
  for (let i = startQuestion; i < endQuestion; i++) {
    const mosError = document.getElementById(`mosError${MOSaudioFiles[i][1] + 1}`);
    const mosMessage = document.getElementById(`mosMessage${MOSaudioFiles[i][1] + 1}`);
    mosError.textContent = "";
    let isChecked = false;
    const mosInputs = document.querySelectorAll(
      `input[name="mos-rating${(MOSaudioFiles[i][1] + 1).toString().padStart(2, '0')}"]`
    );

    mosInputs.forEach((input) => {
      if (isMobile) {
        if (input.getAttribute("data-checked")) {
          isChecked = true;
        }
      } else {
        if (input.checked) {
          isChecked = true;
        }
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
