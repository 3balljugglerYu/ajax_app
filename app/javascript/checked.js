// 目的ごとにファイルを分けることで、それぞれどのような目的のJavaScriptなのか管理がしやすくなります。
// application.jsというファイルに、「ファイルを読み込むための設定」をする必要があります。

function check() {
  const posts = document.querySelectorAll(".post");
  // querySelectorAllメソッドで、postをクラス名にもつ要素を取得できる。postというクラス名を持つ要素はメモの数だけ存在する。

  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
       // getAttributeで属性値である"data-load"を取得。そのdata-loadがnull(空)ではない時。（data-loadがある時）
      
      return null;
      // JavaScriptの処理から抜け出す。エラーが出た場合に、下記に記述されている処理を行わないようにする。
    }
    // debugger
    post.setAttribute("data-load", "true");
    //data-loadをセット（追加）する

    post.addEventListener("click", () => {
      // addEventListenerメソッドを使用し、引数にclickの指定

      const postId = post.getAttribute("data-id");
      // getAttributeで属性値を取得することができ、data-idを取得することができる

      const XHR = new XMLHttpRequest();
      // 変数XHRから、XMLHttpRequestのメソッドを使用できるようにする

      XHR.open("GET", `/posts/${postId}`, true);
      // openメソッドを使用してリクエストの詳細を指定（HTTPメソッドはGET、パスは/posts、非同期通信はtrue)

      XHR.responseType = "json";
      // responseTypeメソッドを使用して、レスポンスの形式を指定

      XHR.send();
      // sendメソッドを記述することで、はじめてリクエストが行える。

      XHR.onload = () => {
        // onload:レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー

        if (XHR.status != 200) {
          // HTTPステータスコードが200以外の場合の条件式

          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // エラーが生じたオブジェクトに含まれるエラーメッセージが表示される

          return null;
          // JavaScriptの処理から抜け出す。エラーが出た場合に、下記に記述されている処理を行わないようにする。
        }
        const item = XHR.response.post;
        // XHR.responseでレスポンスされてきたJSONにアクセスできる(checkedアクションで返却されたitemを取得)

        if (item.checked === true) {
          // item.checkedがのカラムがtrue(1)だった場合

          post.setAttribute("data-check", "true");
          // data-check="true"を追加してください

        } else if (item.checked === false) {

          post.removeAttribute("data-check");
          // data-checkを外してください
        }
      };
    });
  });
}
setInterval(check, 1000);
// setIntervalメソッドを使用し、check関数が1秒に1度実行される

// window.addEventListener("load", check);
// ページを読み込むごとに実行される関数