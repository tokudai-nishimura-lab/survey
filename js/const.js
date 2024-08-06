/*
 * file name  : const.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 変数を定義する
 */

/**
 * データ収集用のPythonサーバーの URL
 *
 * ※変更ポイント（ご自身で立てたPythonサーバーの URL に変更して下さい）
 */
const PostURL = "http://localhost:8080/save_data";

/**
 * MOS関連の音声リスト
 *
 * ※変更ポイント（使用する音声に変更して下さい）
 */
const MOSaudioFiles = [
  "../wav/_num/1.wav",
  "../wav/_num/2.wav",
  "../wav/_num/3.wav",
  "../wav/_num/4.wav",
  "../wav/_num/5.wav",
  "../wav/_num/6.wav",
  "../wav/_num/7.wav",
  "../wav/_num/8.wav",
  "../wav/_num/9.wav",
  "../wav/_num/10.wav",
  "../wav/_num/11.wav",
  "../wav/_num/12.wav",
  "../wav/_num/13.wav",
  "../wav/_num/14.wav",
  "../wav/_num/15.wav",
  "../wav/_num/16.wav",
  "../wav/_num/17.wav",
  "../wav/_num/18.wav",
  "../wav/_num/19.wav",
  "../wav/_num/20.wav",
];

/**
 * DMOS関連の音声リスト
 *
 * ※変更ポイント（使用する音声に変更して下さい）
 */
const DMOSaudioFiles = [
  ["../wav/_num/1.wav", "../wav/_num/2.wav"],
  ["../wav/_num/3.wav", "../wav/_num/4.wav"],
  ["../wav/_num/5.wav", "../wav/_num/6.wav"],
  ["../wav/_num/7.wav", "../wav/_num/8.wav"],
  ["../wav/_num/9.wav", "../wav/_num/10.wav"],
  ["../wav/_num/11.wav", "../wav/_num/12.wav"],
  ["../wav/_num/13.wav", "../wav/_num/14.wav"],
  ["../wav/_num/15.wav", "../wav/_num/16.wav"],
  ["../wav/_num/17.wav", "../wav/_num/18.wav"],
  ["../wav/_num/19.wav", "../wav/_num/20.wav"],
];

/**
 * HTMLのファイルリスト
 *
 * ※変更ポイント（HTMLのファイルが変わる場合は変更して下さい）
 * アンケートフォームの質問
 *
 * ※変更ポイント（出題する設問に応じてに変更して下さい）
 * @param {string} category - カテゴリ名。例えば "form", "mos", "dmos", "confirm" など
 * @param {string} html - htmlのファイル名
 * @param {number} total - カテゴリ内の全質問数
 * @param {number} perpage - 1ページあたりの質問数
 * @param {string} action - 問題に全て答えられているか検証する関数
 */
let HTML = [
  {
    category: "form",
    html: "form.html",
    total: 3,
    perpage: 3,
    action: "ValidFormInfo",
  },
  {
    category: "mos",
    html: "mos.html",
    total: MOSaudioFiles.length,
    perpage: 10,
    action: "ValidMOSInfo",
  },
  {
    category: "dmos",
    html: "dmos.html",
    total: DMOSaudioFiles.length,
    perpage: 5,
    action: "ValidDMOSInfo",
  },
  {
    category: "confirm",
    html: "confirm.html",
    total: 0,
    perpage: 0,
    action: "noFunction", // confirm の場合は検証をスキップ
  },
];

for (let i = 0; i < HTML.length; i++) {
  let Pages = 1;
  if (HTML[i].total !== 0) {
    Pages = Math.ceil(HTML[i].total / HTML[i].perpage);
  }
  HTML[i].Pages = Pages;
  console.log("HTML.Pages" + HTML[i].Pages);
}

/**
 * 最大ページ数
 */
let MaxPage = 0;
for (let i = 0; i < HTML.length; i++) {
  MaxPage += HTML[i].Pages;
}
