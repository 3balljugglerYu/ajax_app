class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  # def new 
  # end

  def create
    # メモ作成時に未読の情報を保存する
    post = Post.create(content: params[:content], checked: false)
    # レスポンスをJSONに変更
    render json:{ post: post }
    # Post.create(content: params[:content])
    # redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked 
      post.update(checked: false)
      # 「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true)
      # 「既読にするためtrueへ変更」
    end

    item = Post.find(params[:id])
    # 更新したレコードをitem = Post.find(params[:id])で取得し直す
    render json: { post: item }
    # JSON形式（データ）としてchecked.jsに返却
  end

end
