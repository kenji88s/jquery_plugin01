# 【jQuery】動画をオーバーレイで表示するプラグイン

## 特徴／説明
- 動画はYouTubeのみ。YouTubeのURLのみで埋め込みコードを取得は不要。パラメータの設置可
- サムネイルやテキストのクリックでモーダルで動画を表示
- ページ遷移時にモーダルで動画を表示が可、ページ内に最初の1個のみそれ以外はすべて無効
- ローディングアニメーションの指定が可（CSSアニメーションもしくはアニメーションGIF）
- 非同期でローディングアニメーションのコード（SVGもしくはHTML）を取得
- 非同期でのコード取得完了が間に合わなければ、代替のコードを使用
- セッションストレージにHTMLコードなど保存

## 設定項目
| プロパティ | 初期値 | 説明 |
|:------------|:------------|:------------|
| readPlay | none | ページ遷移時にモーダル<br><span style="font-size: 50%;">値：none（無し）／ timeInterval（時間間隔）／ count（〇回毎に）／ every（毎回）<span> |
| readIntervalTime | 60 | ページ遷移時にモーダル（〇分毎に）を選択した場合、再度出現させたいときの分数 |
| readCount | 6 | ページ遷移時にモーダル（〇回毎に）を選択した場合、再度出現させたいときの回数 |
| playAuto | true | ローディング完了後の自動再生<br>値：true ／ false |
| loading | none | ローディングアニメーションがコード（html,svg）もしくはアニメーションGIF<br>値：none（無し） ／ code（コード） ／ image（アニメーションGIF） |
| loadingSrc | ymodal/xml/ymodal-figure.xml | 画像もしくはHTMLのパス |
| loadingSelector | .self-building-square-spinner .square | ローディングアニメーションがhtml,svgのときのセレクタ。ローディング完了後にアニメーションをストップ |
| loadingImage | none | ローディングアニメーション時に動画の上に画像を表示<br>値：none（無し）／ attr（src属性）／ property（下のloadingImageSrc） |
| loadingImageSrc |  | ローディングアニメーション時に動画の上の画像のパス |
| thumbArrow | true | サムネイルの上の矢印<br>値：true ／ false |
| closeStr | 閉じる | 閉じるボタンの文言 |
| closeSeconds | 100 | 閉じるボタンクリック後のフェードアウト秒数 |
| closeOverlay | true | オーバーレイ（黒の半透明）クリックで閉じる<br>値：true ／ false |
| sizeWidth | 560 | 動画の横幅 |
| sizeHeight | 315 | 動画の縦幅 |
| storage | false | セッションストレージの使用・不使用（readPlay: 'none'）<br>値：true ／ false |
| storageRemove | 180 | セッションストレージ削除の分数 |
| youtubeParm | ?rel=0&mute=1&autoplay=0 | youTube動画のパラメータ |

## ディレクトリ／ファイル説明
| ディレクトリ／ファイル | 説明 | 
|:------------|:------------|
| css/ymodal.css | オーバーレイの体裁 |
| css/ymodal-loading.css | ローディングアニメーションに使用するCSS |
| image/loading.gif | ローディングアニメーションに使用するアニメーションGIF |
| xml/ymodal-figure.xml | ローディングアニメーションに使用するHTMLコード | 

## コード設置 例
```end.cmd
<head>
<link rel="stylesheet" href="ymodal/css/ymodal.css">
<link rel="stylesheet" href="ymodal/css/ymodal-loading.css">
/* ↑ ▲▲▲ <head>内に外部CSSファイル名を記載 ▲▲▲ */
</head>

...

<a class="test1" data-modal-url="https://www.youtube.com/watch?v=●●●"><img　src="img/sample.jpg" alt=""></a>
/* ↑ ▲▲▲ data-modal-urlに対象のYouTube動画のURLを記載 ▲▲▲ */
...

<script src="ymodal/ymodal.js"></script>
<script>
$(function () {
   $('.test1').ymodal({
      closeStr: 'close',
      readPlay: 'none',
      playAuto: true,
   });

   $('.test2').ymodal({
      readPlay: 'count',
      playAuto: false,
      sizeWidth: 800,
      sizeHeight: 600,
   });
});
</script>
/* ↑ </body>の上に記載（2個以上可） ▲▲▲ */
</body>
```

## 好みにカスタマイズ
- http://urbanqee.com/doga/youtube-thumbnail-dl.php
- https://developers.google.com/youtube/player_parameters?hl=ja
- https://icons8.com/preloaders/en/search/loading
- https://www.webcreatorbox.com/tech/loading-animation
