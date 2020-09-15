// 今回のイベントは「投稿するボタンをクリックした時」になります。

function memo() {
  const submit = document.getElementById("submit");
  // views/posts/index.html.erbのid:submitを取得
  submit.addEventListener("click", (e) => {
  // addEventListenerを使用して、投稿するボタンを「click」した場合に実行される関数を定義
  const formData = new FormData(document.getElementById("form"));
  // メモ投稿のフォームに入力された情報を取得
  const XHR = new XMLHttpRequest();
  // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
  XHR.open("POST", "/posts", true);
  // openメソッドを使用してリクエストの詳細を指定（HTTPメソッドはPOST、パスは/posts、非同期通信はtrue)
  XHR.responseType = "json";
  // 返却されるデータ形式をJSONに指定
  XHR.send(formData);
  // メモ投稿のフォームに入力された情報を送信
  XHR.onload = () => {
    // onload:レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
    if (XHR.status != 200) {
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    }
    const item = XHR.response.post;
    // レスポンスとして返却されたメモのレコードデータを取得しitemの変数に代入
    const list = document.getElementById("list");
    // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得。index.html.erbに追加した”list”
    const formText = document.getElementById("content");
    // メモの入力フォームをリセットするために記述。入力フォームの文字は入力されたままになってしまうため、リセットする必要がある。
    const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
      // メモとして描画する部分のHTML」を定義。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
    list.insertAdjacentHTML("afterend", HTML);
    // listという要素に対して、insertAdjacentHTMLでHTMLを追加。第一引数にafterendを指定することで、要素listの直後に挿入
    formText.value = "";
    // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされる。正確には、空の文字列に上書きされるような仕組み
  };
  e.preventDefault();
  });
}
window.addEventListener("load", memo);
// window（ページ）をload（読み込み）時に実行されるように記述