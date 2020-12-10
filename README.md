# test2

初めての参加でAmazonギフト券1万円ゲットのチャンス！Qiita Advent Calendar 2020
詳しくはこちら

44

0
hollyhock0518
@hollyhock0518
2019年06月18日に更新
【Git】Windows環境でGitHubにSSH接続してコミットするまでの手順
Windows
Git
GitHub
SSH
Windows10
この記事は最終更新日から1年以上が経過しています。
前提条件
WindowsにGitがインストール済みである
GitHubのアカウントが作成済みである
GitHubでリポジトリを作成する
GitHubにログインし、RepositoriesのNewボタンから新規リポジトリを作成できます。
本記事では具体的な作業は省略します。

コミット履歴が空の新規リポジトリが作成できてればOKです。

20190325_0001.jpg

Gitの初期設定をする
メールアドレス、ユーザ名を設定する
WindowsにGitをインストールしたら最初にメールアドレスやユーザネームの設定をしておくことをおすすめします。
既に設定済みの場合は飛ばしてもらって大丈夫です。

注意：以降の操作はコマンドプロンプトではなくGit Bashです

git config --global user.name "ユーザー名"
git config --global user.email "メールアドレス"
git config --global core.quotepath false #日本語ファイル名がエスケープされないように
gitconfigファイルが生成されていることを確認する
上記の設定を行うと、ユーザのホームディレクトリに.gitconfigファイルが生成されます。

cd ~
ls -la | grep .gitconfig
秘密鍵と公開鍵を作成する
ユーザのホームディレクトリに.sshディレクトリを作成します。
そして、.sshディレクトリの中に秘密鍵と公開鍵を生成します。
鍵に紐づくパスフレーズを設定しますが、あとで必要になるので忘れないようにしてください。

mkdir ~/.ssh
cd ~/.ssh
ssh-keygen -t rsa -C 'hoge@mail.com'
#keyを作成するか聞かれるのでEnter
#パスフレーズを入力
#パスフレーズを再入力
GitHubに公開鍵を設定する
生成した公開鍵(rsa.pub)をテキストエディタで開き、中身を全てコピーします。
GitHubにアクセスし、下記の手順通りに公開鍵を登録します。

GitHubにログインし、右上のメニューから Settings を選択
SSH and GPG keys を選択
New SSH Keyを押下
Title(自由)、Key(コピーした内容をペースト)を入力して Add SSH keyを押下
以上でSSH接続の設定が完了です！

クローンからプッシュまで
リポジトリをクローンする
GitHubに作成したリポジトリのページを開き、下記画像の赤枠内の部分をコピーしてください。
20190325_0003.jpg

下記の通り、コマンドを実行してリポジトリをローカルにクローンします。

cd d:/develop #クローン先のディレクトリに移動
git clone git@github.com:[UserName]/[Repository].git    #←コピーしたやつ
Are you sure you want to continue connecting (yes/no)?  #yesを入力
Enter passphrase for key '/c/Users/hoge/.ssh/id_rsa':   #key作成時に設定したパスフレーズを入力
クローンが完了しているか確認します。
正しく完了していればリポジトリ名のディレクトリが作成されます。

開発用ブランチを作成する
通常、直接Masterブランチにコミットをすることは無いため、ローカルで開発用のブランチを作成して、GitHubにプッシュします。

新規ブランチを作成する
リポジトリ名のディレクトリの中に移動して、開発用のブランチを作成します。
ブランチ名は何でもいいのですが、ここではdevelopとします。

$ cd Practice

$ git checkout -b develop       #開発用のブランチを作成
Switched to a new branch 'develop'
管理対象のファイルを配置する
リポジトリ名のディレクトリの中に、バージョン管理したいファイルを配置します。

$ ls -l
total 1
-rw-r--r-- 1 user 197121 382 3月  25 22:41 index.html #管理したいファイルを配置
ファイルをステージングする
続いて、配置したファイルをステージングします。

$ git add index.html    #追加したファイルをステージング
ローカルリポジトリにコミットする
続いて、ローカルリポジトリにコミットします。
コミットメッセージは何でもいいです。

$ git commit -m "first commit"  #コミット
[develop (root-commit) 81de264] first commit
 1 file changed, 14 insertions(+)
 create mode 100644 index.html
GitHubにプッシュする
下記コマンドでGitHubにプッシュします。

$ git push -u origin develop

#なんやかんや表示される

 * [new branch]      develop -> develop
Branch 'develop' set up to track remote branch 'develop' from 'origin'.　#プッシュ完了
GitHubにコミットが完了
GitHubにアクセスし、コミットされたことを確認します。

20190325_0005.jpg

編集リクエスト

ストック

44
hollyhock0518
@hollyhock0518
http://keita.daa.jp/
フォロー




前提条件
GitHubでリポジトリを作成する
Gitの初期設定をする
メールアドレス、ユーザ名を設定する
gitconfigファイルが生成されていることを確認する
秘密鍵と公開鍵を作成する
GitHubに公開鍵を設定する
クローンからプッシュまで
リポジトリをクローンする
開発用ブランチを作成する
新規ブランチを作成する
管理対象のファイルを配置する
ファイルをステージングする
ローカルリポジトリにコミットする
GitHubにプッシュする
GitHubにコミットが完了
記事を読んでも解決しない...そんな疑問も
質問でスッキリ解決するかもしれません!
Q&A
難しい実装や解消できないバグでも、誰かが答えを持っていれば解決できます
意見交換
「自分はこのやり方ですが他の人はどうでしょう？」などのディスカッションができます
質問してみる
コメント
この記事にコメントはありません。
投稿する
編集
プレビュー
テキストを入力
0B / 100MB
How developers code is here.
Qiita
About
利用規約
プライバシー
ガイドライン
リリース
API
ご意見
ヘルプ
広告掲載
Increments
About
採用情報
ブログ
Qiita Team
Qiita Jobs
Qiita Zine
© 2011-2020 Increments Inc.
ユーザーは見つかりませんでした
