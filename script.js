　'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // 金利
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements){ //必ずハードコーデイィングではなくて関数を作る癖をつけましょう。
  containerMovements.innerHTML = ""; //普通にいつもその初期化。　テキストコンテントみたい。
  movements.forEach(function(mov,i){ //それぞれのアカウントのmovementsの配列があるよね。
    const type = mov > 0 ? "deposit" : "withdrawal"; //三項演算子ですよ。だいぶ慣れた、

     const html = `
       <div class="movements__row">
         <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
         <div class="movements__value"> ${mov}€</div>
       </div>
     `; //こんな感じで使えるから、テンプレートリテラルはめっちゃ便利。typeはそれによって、cssが変わるから、クラス名に入れることもできる。インデックスは+1するのは０ベースだからね。
     containerMovements.insertAdjacentHTML("afterbegin",html);//これが結構新しい概念かも。containerMovementsは上にグローバル関数が作られている。insertAdjacentHTMLっていうのは、それをhtml上に表示させるためのやり方。afterbeginがbeforeendをよく使うんだけど、afterbeginだと新しい情報が上から降りてくる感じ。
  })
}
// displayMovements(account1.movements);これはハードコーディングされているので消します。

//lesson 153で追加。reduceメソッドのところで。残高計算するところ
const calcDisplayBalance = function(acc){ //配列全体を渡すように修正した。
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov,0);//大嫌いなアロー関数で綺麗にまとめた。第二引数忘れないで
  //いちいちbalanceに閉じ込めないで、ここでそのままプロパティを取得でき料に修正。
  labelBalance.textContent = `${acc.balance} EUR`;//これほんと便利ね。textContent.labelBalanceって反対にしちゃったから気をつけようね。ちなみにジョナスが全部上でまとめてくれたから。アカウント全体を渡すようにしたからここでおacc.って書くの忘れないでね。
};

// calcDisplayBalance(account1.movements);これはハードコーディングされているので消します。

//実はアカウントによって金利が違うんです。だからそれを書き直しました。
const calcDisplaySummary = function(acc){//アカウント全体を渡している
  const incomes = acc.movements　//アカウントのうちのmovementsを使う
    .filter(mov => mov > 0)
    .reduce((acc,mov)=> acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements　//アカウントのうちのmovementsを使う
    .filter(mov => mov < 0)
    .reduce((acc,mov)=> acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`; //Math.absは絶対値のabslutly

  const interest = acc.movements //利息は預け入れの金額に対して1.2％の利子がつく計算らしい。
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate/100) ////アカウントのinterestRateを使って計算する
    .filter((int,i,arr) =>{
      // console.log(arr);//(5) [2.4, 5.4, 36, 0.84, 15.6]となる。4つ目は１より小さいよね。
      return int >= 1; //利子が１より小さい場合は除外するらしい。
    })
    .reduce((acc,int) => acc + int ,0) ;
    labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);これはハードコーディングされているので消します。

//151. Computing Usernames でアカウントのユーザー名を作る
//ここからスタートって書いてあるところから始めた。
const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner //このownerというのは下の。
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  })};

  // const account1 = {
  //   owner: 'Jonas Schmedtmann',　←ここのownerを指している
  //   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  //   interestRate: 1.2, // 金利
  //   pin: 1111,
  // };

//   const username =  user
//     .toLowerCase()
//     .split(" ")
//     .map(name => name[0])
//     .join("");
//   return username
// };

// console.log(createUsernames('Steven Thomas Williams'));//stw結果は一緒。
createUsernames(accounts);
// console.log(accounts); //ってやると、username でこれが見れるよ。

const updateUI = function(acc){ //一つの関数にまとめる。引数はaccountのaccにすればオッケーよ
  //それぞれのアカウントのお金の流れを、スクロールするところに表示させる
  displayMovements(acc.movements);
  //右上に全ての預金動きを合計して表示させる
  calcDisplayBalance(acc);
  //下にそれぞれの合計や、金利などを表示させる。
  calcDisplaySummary(acc);
}

// //Event handlers

// btnLogin.addEventListener("click",function(){
//   console.log("LOGIN");
// }) //実はこのままだと、ログインのボタンを押すと、ほんの一瞬だけコンソールにログが表示されてすぐにリロードされてしまう。
//この理由はformの中のボタン要素だからです。これがデフォルトの動きです。
//↓↓↓
//以下がデフォルトを無効にしてやり直した書き方。

let currentAccount; //この値はこのあと何度も使うから、letでしかも外部で宣言をする。

btnLogin.addEventListener("click",function(e){
  //フォームが送信されないようにする。preventDefaultは規定のアクションを通常通りに行うべきではないことを伝える。
  e.preventDefault();
  console.log("LOGIN");
//currentAccountはここで。letで外部宣言しているからconstはいらないよ。
//ここからはユーザー名があっているかの確認です。
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value); //入力されたusernameと等しいことを確認する。そしてvalueを忘れないで。入力フィールだから値を読み込むためには必要です。acc.usernameなのは、上のcreateUsernamesで頭文字をとって作成する関数を作っているからだよ。
console.log(currentAccount);//自分のやつがあっているか確かめよう。

//ここからはpinと等しいかを確認するところ。
if(currentAccount?.pin === Number(inputLoginPin.value)){ //どうしてnumberを付けるかというと、valueは常に文字列になるため。pinは数字だったよね。
  //もしここでユーザー名を空欄にしたり間違ったやつを売ったり、pinを打たないとエラーが出ますよ。ではそのエラーをどのように解消すればいいのか。
  //まず思いつくのは、そのアカウントが存在するかを確かめること。オプショナル・チェーンを使おう
  //「?.」この演算子すっかり忘れていたけど何これ。調べました。
  //nullやundefinedの時にエラーになるのではなく、式が短略され、undefinedだけが返されるところ。エラーになったらいちいちめんどくさいしね。
  // console.log("PIN LOGIN");
  // welcome message
   labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(" ")[0]}`;
   //ログインすると、上のメッセージ部分がこのようになる。いくらやっても覚えられあいね、splitはそこで指定された文字で区切ること。その０番目だから最初の名前だけ表示されるんだね。miyaとかjonasとか名前だけ。
   //ここでログインができてから下に口座の動きが見えてくるんだよね。
   containerApp.style.opacity = 100; //ここで透明度の操作をする。
   //このcontainerAppとはクラス名にappがついているものを指定する。cssでopacityを変化させることのクラス名はappだった。天才！
//すごくて天才かと思った
//それでは次に、ログインをした後に、ユーザー名のところとpinのところを空にするやり方をやります。
  inputLoginUsername.value = inputLoginPin.value = ""; //これで空になりました。value忘れないで！
  //pinのところに残っているカーソルのフォーカスを外すやり方。
  inputLoginPin.blur();//blur()とは⇨フォーカスを当てている状態から外したタイミングで実行されるイベントです。

  updateUI(currentAccount); //今まではここに案数を一つ一つ書いていたけど,updateUIという一つの関数にまとめて、それを呼び出す形にしたのだ。

}

}); //form要素のいいところは、入力してエンターキーを押すと実際にそのクリックイベントが自動的に紐付くこと。自分でclickを書く必要がないところは楽でいいと思います。

//他のユーザーへの送金ができますので、ここで実装していきます。右側にある黄色いところです。
btnTransfer.addEventListener("click",function(e){
  e.preventDefault(); //デフォルトの操作を制御する。さっきもやったね

  const amount = Number(inputTransferAmount.value);//要素を見るとinputTransferAmountは金額を入力するところなので、numberを入れます。いつものことですが、valueも忘れないでください。
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  //ここは少しややこしいけど、金額の送付先を入れるので、accountsの全てのアカウントの配列から探す、として、accountsのusernameが送金先のアカウント名と一致しているかを===の等号演算子で確認をしています。
  console.log(amount,receiverAcc);//これで入力された送金金額と、送金先の受け取りユーザーがちゃんとあっているかを確認します。。
  //それに、自分の持っているお金よりも高い金額は振り込めないですよね。だからそこもチェックします。それに送る金額はネガティブになってはダメです。

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&  //送る金額が0円以上か
    receiverAcc &&//送る相手が存在するかどうか。存在するアカウントに送らないといけないからね。
    currentAccount.balance >= amount && //送り元の 預金が送る金額よりも上か
    receiverAcc?.username !== currentAccount.username)//オプチョナルチェーンを使って、receiverAccがぞんざいするときにって感じ
  {
    // console.log("Trnsfer valid");//これは確認ようにやっているんだけど、自分の預金額よりも多い数だと、これはログに表示されないよ

    //そうしたら、これを送ったユーザーは預金が減って、受け取ったユーザーの預金が増えることは当たり前ですよね。
    currentAccount.movements.push(-amount); //-だからここで数が減ってます
    receiverAcc.movements.push(amount); //pushをするので、movementsの配列に後ろから付け足すイメージです
    updateUI(currentAccount); //変更になりましたから、ここでももう一回関数を読んで表示させないとですね。さすがです
  }
})


//ここからスタート
// const user = 'Steven Thomas Williams';//stwにしたい。
// ➀const username = user.toLowerCase().split(" ");// ['steven', 'thomas', 'williams']となるsplitはそこで指定された値で区切ること。
// ②const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(function(name){////mapはループするよね。だからそれを使った
//     return name[0];//頭文字を取る。
//   });
// ;//(3) ['s', 't', 'w']ここまでやって、やっと頭文字が取れた
// ③const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(name => name[0]) //そしてまたここをアロー関数に書き直す
//   .join(""); //joinを使ってstwこうなりました。そしてこれをcreateusernameとして上に持っていった
//
// console.log(username);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////////
// //SLICE METHODS
// let arr = ["a", "b", "c", "d", "e"];
// // console.log(arr); //(5) ['a', 'b', 'c', 'd', 'e']
// // console.log(arr.slice(2)); //(3) ['c', 'd', 'e'] 通常、引数に一つの数字しか描かれない場合はbeginだからそれ以降という意味。そしてsliceは新しく配列を返すということも忘れずに。元の配列は変えない。　　
// // console.log(arr.slice(2,4)); //(2) ['c', 'd']となる。endは含まれない。beginは入ります。2,4ということは、2,3ということでいいんです。
// // console.log(arr.slice(-2));//(2) ['d', 'e']最後の二つを持ってくるという意味。
// // console.log(arr.slice(-1));//一番最後の。['e']だけです。
// // console.log(arr.slice(1,-2));//(2) ['b', 'c']となる。bから始まって、endは含まれないからcになるってこと。
// //
// // console.log(arr.slice()); //引数を渡してないから（5) ['a', 'b', 'c', 'd', 'e']だよね。
// // console.log([...arr]);//sliceにarrayかっこを作って入れるべきか、それはなんでもいいです。
// // console.log(...arr);//これは普通に中だけ取り出されるね。a b c d e　arrayを入れてないから。
// //
// //SPLICE METHODS
// //これが違うのは元の配列さえも変異させてしまうこと。
// console.log("---SPLICE---");
// // console.log(arr.splice(2));//(3) ['c', 'd', 'e']beginパラメターだから。
// arr.splice(-1); //spliceがよく使われるのはこんな感じだけ。最後の一つを取り除く時にはよく使われるけど、それ以外はあまり使われない。結果は(4) ['a', 'b', 'c', 'd']だね。
// console.log(arr);//(2) ['a', 'b']さっき、後ろの3つ取ったから、残りはこの2つ。元の配列も変わってしまいました。
// // //spliceは引数の数字の意味が少し違う。
// console.log("---EXAMPLE---");
// console.log(arr); //(4) ['a', 'b', 'c', 'd']
// arr.splice(1,2); //一つ目の引数はbegin,始まる箇所だから"b".違うのは二つ目の引数は削除したい要素の数。この場合2つ消したいからbとcが消える。
// console.log(arr);//(2) ['a', 'd']となる。
//
// //REVERSE METHODS
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j","i","h","g","f"];
//
// console.log("---REVERSE---");
// console.log(arr2.reverse());//(5) ['f', 'g', 'h', 'i', 'j']反対になる。
// console.log(arr2);//(5) ['f', 'g', 'h', 'i', 'j']reverseメソッドも元の配列を変化させる。
//
// //CONCAT METHODS
// //二つの配列を連携する時に使う。元の配列にも影響なし
// console.log("---CONCAT---");
//
// const letters = arr.concat(arr2); //最初に来る方が最初。引数チックに来る方が続くやつ！
// console.log(letters);//(10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
//
// const letter2 = arr2.concat(arr);
// console.log(letter2);//(10) ['f', 'g', 'h', 'i', 'j', 'a', 'b', 'c', 'd', 'e']
//
// console.log([...arr, ...arr2]);//(10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']これでも一緒の結果
//
// ///JOIN METHODS
// console.log("---JOIN---");
// console.log(letters.join("-"));//a-b-c-d-e-f-g-h-i-jとなる。
//
// const arr = [23,11,64];
// console.log(arr[0]); //23一番先頭だけをとる。
// console.log(arr.at(0)); //23atメソッドも使える同じようになる。at()で普通のかっこだから配列かっこじゃないから気をつけて！
//
// console.log(arr[arr.length - 1]); //これが今までの書き方。配列の長さがわからないものだと仮定
// console.log(arr.slice(-1));//[64]これが先やったやつだが、sliceだtと元の配列を変えずに、配列で返すやつだよね！
//
// console.log(arr.at(-1)); //64 atメソッドを使うと、sliceみたいな感じで普通に使えるし、slice土と違って配列で返されるわけじゃないからこっちの方が便利かも。 一番使われるのは一番最後の要素を取るこの使い方かもしれない。
//
// console.log("Miya".at(-1)); //a 文字列でも同じように機能するのが嬉しいね！

/////////////////////////////////////////////////
//144.Looping Arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// //これが今までのやり方。
// for (const movement of movements){ //こんがらがりやすいけど、左が新しく定義して、右がそれはこれでみたいな感じ
//   if (movement > 0){
//     console.log(`You deposited ${movement}`);
//   }else{
//     console.log(`You withdrawal ${Math.abs(movement)}`);//Math.absは何度もやっている通り、符号を削除します。
//   }
// }
// //上記をforEachループを使って書くやり方。
// //forEachメソッドの行うことは、配列の上でループをすること。それぞれの反復の中で、コールバック関数を実行します。
// //結果は一緒
// console.log("---FOR EACH----");
// movements.forEach(function(movement){ //左が元のやつで、右のやつで新しく名前を定義しているみたいな感じ。
//   if (movement > 0){
//     console.log(`You deposited ${movement}`);
//   }else{
//     console.log(`You withdrawal ${Math.abs(movement)}`);
//   }
// });
//
// //これをまた違う方法で書いてみましょう。今度はカウントもつけてみましょう。
// for (const [i,movement] of movements.entries()){ //entriesは配列の配列を返す。覚えてる？
//   if (movement > 0){
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   }else{
//     console.log(`Movement ${i + 1}: You withdrawal ${Math.abs(movement)}`);//Math.absは何度もやっている通り、符号を削除します。
//   }
// }
// //今度は先程のカウントありのやつを、forEachメソッドでやってみましょう。
// //forEachは現在の要素、インデックス、ループしている配列全体も渡す。
// console.log("--con Counter forEach---");
// movements.forEach(function(mov,i,arr){//大事なのはこの引数の順番です。最初はさっきと同じ、次は今のインデックス、3つ目はループする配列全体を表している。　
//   if (mov > 0){
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   }else{
//     console.log(`Movement ${i + 1}: You withdrawal ${Math.abs(mov)}`);
//   }
// });
//これでオッケーですう。

//////////////////////////////////////////////////////////
//145.forEach With Maps and Sets

//Maps
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// currencies.forEach(function(value,key,map){ //これも引数の順番が肝心。一つ目が値、二つ目はキー、三つ目はループするマップ全体。arrayの時と似ています。
//   console.log(`${key}:${value}`);
// //USD:United States dollar
// //EUR:Euro
// //GBP:Pound sterling　と表示される。make senseね。
// });
//
// //これをsetでやってみましょう。
// const currenciesUnique = new Set(["USD","EUR","JPY","EUR","USD"]);
// console.log(currenciesUnique);
// //et(3) {'USD', 'EUR', 'JPY'}とでる。setはユニークな値を抽出するのだ。
//
// currenciesUnique.forEach(function(value,key,map){
//   console.log(`${key}:${value}`);
//   //USD:USD
//   //EUR:EUR
//   //PY:JPY このままだと、keyとvalueが一緒のやつが表示されてしまう。実はsetにはキーが存在しない。そしてインデックスも存在しない。 ということは、これは意味がないということだ。　
// })

///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function(dogsJulia,dogsKate){
//     const dogsJuliaCorrected = dogsJulia.slice(); //薄いコピーを作る。
//     dogsJuliaCorrected.splice(0,1);
//     dogsJuliaCorrected.splice(-2);
//     // console.log(dogsJuliaCorrected);
//
//     const dogs = dogsJuliaCorrected.concat(dogsKate);//三つドットのやつもいいけど、配列のコースだから、concatの方がいいね。これでも同じ結果だよ。
//     console.log(dogs);
//     dogs.forEach(function(dog,i){
//       if (dog >= 3){
//         console.log(`${i + 1} : ADULT!`);
//       }else{
//         console.log(`${i + 1} : PUPPY!`);
//       }
//     })
//
//
// }
// checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);
//////////////////////////////////////////////////////////
//150.The map METHODS
 //新しい配列を作成し、元の配列要素に、コールバック関数を適用した結果を返す。元の配列も変わらないよ。

 // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
//  const eurToUsd = 1.1;
// //mapは関数を使っている
//  // const movementsUsd = movements.map(function(mov){
//  //   return mov * eurToUsd;
//  //   // return 23;//これだと全部23と帰ってくる
//  // })
//
// console.log(movements); //上の配列のやつ
// // console.log(movementsUsd);//movements配列に1.1を掛けたやつがここに新しい配列となって格納されている。
//
// //このように書くこともできる。こっちは単純に一つの配列をループして新しい配列を手動で作成している。同じことをやってるように見えて実はやってることは全然違う。
// const movementsUSDfor = [];//新しい配列を作る
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);//そこにpushをする感じね。forOf構文を使う
// console.log(movementsUSDfor);//結果はmapを使った時と全く一緒。
//
// //大嫌いなアロー関数です。きっと多くの人が嫌いだけど、アロー関数を理解していれば、短く書けるし便利だよ。
// const movementsUsd = movements.map (mov => mov * eurToUsd );
// console.log(movementsUsd);
//
// const movemetsDiscription =  movements.map((mov,i,arr) =>
// 　`Movements ${i + 1}: You ${mov > 0 ? "deposit" : "withdrawal"} ${Math.abs(mov)}`
// );//三項演算子を使うと、こんな感じでもっと短く書くことができる
// console.log(movemetsDiscription);

///////////////////////////////////////////////////////
//152. The filter Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// const deposits =  movements.filter(function(mov){
//   return mov > 0; //０以上の値だけがフィルタリングされて表示される。
// });
// console.log(movements);//(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(deposits);//(5) [200, 450, 3000, 70, 1300]だね。正の値だけ
//
// //やりたがるfor of ループでのやり方。ただ、メソッドを使う方が、配列と
// const depositsFor = [];
// for (const mov of movements)if (mov > 0)depositsFor.push(mov);
// console.log(depositsFor); //これもさっきと結果は一緒。
//
// //アロー関数で書くとこんな感じです。
// const withdrawal = movements.filter(mov => mov < 0 );
// console.log(withdrawal);//(3) [-400, -650, -130]

///////////////////////////////////////////////////////
//153. The reduce Method 何かを全て集めたものを返す。雪だるま
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);//8) [200, 450, -400, 3000, -650, -130, 70, 1300]
//
// //全ての値の合計をこのreduceメソッドを使って考えていきましょう。
// const balance = movements.reduce(function(acc,cur,i,arr){ //引数は、「今の値」「インデックス」「配列全体」しかし、reduceメソッドでは、最初の引数は「アキュムレーター」と呼ばれる。最終的に返したい値を積み重ねる雪だるまみたいな感じ。だから全体を足したりする場合は、それが合計になります。
//   console.log(`Iteration ${i+1}:${acc}`); //どんな感じか見れるね！
//   return acc + cur; //これを書くことで、どんどん積み重なっていく。accは積み重なった合計で、それにcurが追加されていく感じね。
// },0);//そしてreduceメソッドには第二引数があり、それには初期値を設定する。0から足し算してくから、ここでは0になるよ。
//
// console.log(balance); //3840と出るよ！成功！！
//
// let balance2 = 0; //外部変数として、変更可能なletで初期値を0としてbalance2を設定forofループ文を使うときは、必ず外部変数が必要になります。
// for (const mov of movements)balance2 += mov;//今の値とmovementsを足していく。forofループ構文で同じものができました。
// console.log(balance2);///3840と出る.]
//
// //大っ嫌いなアロー関数を使って書くやり方です。
// const balance3 = movements.reduce((acc,cur) => acc + cur,0);
// console.log(balance3);//3840
// //確かに短くていいんだけど、ちょっと嫌いなアロー関数
//
// //reduceメソッドを使って、他のこともできるよーーーん。配列の最大値を取得してみよーう。
// //配列をループさせて、比較、比較、比較、でどんどん先に進んでみよーう。
// //いつもいつも、雪だるまのaccは何に使われるのかが問題になります。足し算の時は、普通に雪だるまちゃんでよかったけど、今回は別に足すものもないしどうすればいいわけ？ ここでは、accが現在の最大値を把握するのです。
// const max = movements.reduce((acc,mov) => {
//   if(acc > mov){
//     return acc;
//   } else {
//     return mov; //movが一番おっきいことになるから、こうやって書くんだよ。
//   }
// },movements[0]);//第二引数ですが、0とかから始めないで、配列の先頭を指定するようにしましょう。
// console.log(max);//3000　期待値！やったね！

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
 // const calcAverageHumanAge = function(ages){
//   const humanAges =
//     ages
//       .map(age => age <= 2 ? age * 2 : 16 + age * 4)
//       .filter(age => age > 18)
//       .reduce((acc, age) => acc + age / ages.length,0);
//   console.log(Math.abs(humanAges));
// }
//てな感じで、全部繋げる感じで書いてしまった私。以下先生のお手本

// const calcAverageHumanAge2 = function(ages){
//   const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   const adults  = humanAges.filter(age => age >= 18);
//
//   console.log(humanAges);
//   console.log(adults);
//
//   const average = adults.reduce((acc, age) => acc + age,0) / adults.length;//平均の出し方。全部をまとめてやるんだね。　
//
//
//   return average;
// }
//
// const avg1 = calcAverageHumanAge2( [5, 2, 4, 1, 15, 8, 3]);//忘れがちだけど、ここでまた作ることが大事。
// const avg2 = calcAverageHumanAge2(  [16, 6, 10, 5, 6, 1, 4]);
//
// console.log(avg1);
// console.log(avg2);
//

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);

//155. The Magic of Chaining Methods
//例えば、全ての入金額を、ユーロからドルに勘案して、最後にそれらを合計して、アメリカドルで口座にn入金された金額を正確に知ることができるとする。

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
//
// const totalDespositsUSD =
//   movements
//     .filter(mov => mov > 0) //これが預金です（EURの）
//     .map(mov => mov * eurToUsd) //EURからUSDに変換
//     .reduce((acc,mov) => acc + mov,0); //それを全て合計して足していく。まじでこの第二引数忘れないでね。
//   //このコースの趣旨は、全てをチェーンみたいに繋げて書くことができますよ。ということです。
//   //でもこのように一つにつなげて書くと、バグが怒った場合、デバッグするのが難しくなりますね。どこからきたのかわからなくなります。
//
// console.log(totalDespositsUSD);//5522.000000000001となる。
//それではここで勉強したことを、画面に表してみましょう↑

///////////////////////////////////////
// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
//
// const calcAverageHumanAge2 = function(ages){
//   const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   const adults  = humanAges.filter(age => age >= 18);
//
//   console.log(humanAges);
//   console.log(adults);
//
//   const average = adults.reduce((acc, age) => acc + age,0) / adults.length;//平均の出し方。全部をまとめてやるんだね。　
//
//   return average;
// }
// const ages =  [5, 2, 4, 1, 15, 8, 3];
//
// const calcAverageHumanAge =
//   ages
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc,age)=> acc + age,0)/ ages.length;
//
// console.log(calcAverageHumanAge);

///////////////////////////////////////
// 157,The find method
//条件に基づき、配列の一つの要素を取り出すことができる。
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// const firstWithdrawal =  movements.find(mov => mov < 0);
// console.log(movements);//(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(firstWithdrawal); //-400と表示される。配列の最初の値。
// //「条件に合致するものを抽出する」という点では、filterと似ているけれど、根本的に違うところが2つある。
// //1,filterは条件に合致するものを全て返却するのに対し、findは最初の一つだけを返却
// //2,filterは新しい「配列」を返却するが、findは要素そのものを返す
//
// console.log(accounts); //上に定義してある、4人分のアカウントが保持されている
// const account = accounts.find(acc =>
//   acc.owner === "Jessica Davis"); //こうすることで、ownerがこの人の名前のやつだけピックアップされる。
// console.log(account);
// //なんかこれだったら部tにfilterでいいんじゃないかって思ってしまいますが、、その要素を満たすのは一つだけの要素、という条件を設定することが多いらしいです。だかあ===の等号演算子を使っていたわけです
