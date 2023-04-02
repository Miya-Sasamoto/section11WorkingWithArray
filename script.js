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
         <div class="movements__value"> ${mov}</div>
       </div>
     `; //こんな感じで使えるから、テンプレートリテラルはめっちゃ便利。typeはそれによって、cssが変わるから、クラス名に入れることもできる。インデックスは+1するのは０ベースだからね。
     containerMovements.insertAdjacentHTML("afterbegin",html);//これが結構新しい概念かも。containerMovementsは上にグローバル関数が作られている。insertAdjacentHTMLっていうのは、それをhtml上に表示させるためのやり方。afterbeginがbeforeendをよく使うんだけど、afterbeginだと新しい情報が上から降りてくる感じ。
  })
}
displayMovements(account1.movements);


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
//SLICE METHODS
let arr = ["a", "b", "c", "d", "e"];
// console.log(arr); //(5) ['a', 'b', 'c', 'd', 'e']
// console.log(arr.slice(2)); //(3) ['c', 'd', 'e'] 通常、引数に一つの数字しか描かれない場合はbeginだからそれ以降という意味。そしてsliceは新しく配列を返すということも忘れずに。元の配列は変えない。　　
// console.log(arr.slice(2,4)); //(2) ['c', 'd']となる。endは含まれない。beginは入ります。2,4ということは、2,3ということでいいんです。
// console.log(arr.slice(-2));//(2) ['d', 'e']最後の二つを持ってくるという意味。
// console.log(arr.slice(-1));//一番最後の。['e']だけです。
// console.log(arr.slice(1,-2));//(2) ['b', 'c']となる。bから始まって、endは含まれないからcになるってこと。
//
// console.log(arr.slice()); //引数を渡してないから（5) ['a', 'b', 'c', 'd', 'e']だよね。
// console.log([...arr]);//sliceにarrayかっこを作って入れるべきか、それはなんでもいいです。
// console.log(...arr);//これは普通に中だけ取り出されるね。a b c d e　arrayを入れてないから。
//
//SPLICE METHODS
//これが違うのは元の配列さえも変異させてしまうこと。
console.log("---SPLICE---");
// console.log(arr.splice(2));//(3) ['c', 'd', 'e']beginパラメターだから。
arr.splice(-1); //spliceがよく使われるのはこんな感じだけ。最後の一つを取り除く時にはよく使われるけど、それ以外はあまり使われない。結果は(4) ['a', 'b', 'c', 'd']だね。
console.log(arr);//(2) ['a', 'b']さっき、後ろの3つ取ったから、残りはこの2つ。元の配列も変わってしまいました。
// //spliceは引数の数字の意味が少し違う。
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
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map){ //これも引数の順番が肝心。一つ目が値、二つ目はキー、三つ目はループするマップ全体。arrayの時と似ています。
  console.log(`${key}:${value}`);
//USD:United States dollar
//EUR:Euro
//GBP:Pound sterling　と表示される。make senseね。
});

//これをsetでやってみましょう。
const currenciesUnique = new Set(["USD","EUR","JPY","EUR","USD"]);
console.log(currenciesUnique);
//et(3) {'USD', 'EUR', 'JPY'}とでる。setはユニークな値を抽出するのだ。

currenciesUnique.forEach(function(value,key,map){
  console.log(`${key}:${value}`);
  //USD:USD
  //EUR:EUR
  //PY:JPY このままだと、keyとvalueが一緒のやつが表示されてしまう。実はsetにはキーが存在しない。そしてインデックスも存在しない。 ということは、これは意味がないということだ。　
})

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

const checkDogs = function(dogsJulia,dogsKate){
    const dogsJuliaCorrected = dogsJulia.slice(); //薄いコピーを作る。
    dogsJuliaCorrected.splice(0,1);
    dogsJuliaCorrected.splice(-2);
    // console.log(dogsJuliaCorrected);

    const dogs = dogsJuliaCorrected.concat(dogsKate);//三つドットのやつもいいけど、配列のコースだから、concatの方がいいね。これでも同じ結果だよ。
    console.log(dogs);
    dogs.forEach(function(dog,i){
      if (dog >= 3){
        console.log(`${i + 1} : ADULT!`);
      }else{
        console.log(`${i + 1} : PUPPY!`);
      }
    })


}
checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);
