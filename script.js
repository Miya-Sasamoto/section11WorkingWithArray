'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// /////////////////////////////////////////////////
// //Simply Array Methods 142
//  let arr = ["a","b","c","d","e"];
//
// //SLICE
//
//  console.log(arr.slice(2));//(3) ['c', 'd', 'e']Stringの時のslice()と一緒。今回指定したのは２だから、０から始まってC以降を切り出した。
//  console.log(arr.slice(2,4));//(2) ['c', 'd']　終わりを指定したから、このようになる。エンドパラメーターは含まれない！！
//
//  console.log(arr.slice(-2));//(2) ['d', 'e']最後の二つを取る。
//
//  console.log(arr.slice(-1));//['e']最後のやつだけ！
//
//  console.log(arr.slice(1,-2));//['b', 'c']１から始まって、エンドパラメーターは含まれないからこうなる。
//
//  console.log(arr.slice());//5) ['a', 'b', 'c', 'd', 'e']全て抽出
//  console.log([...arr]);//上と全く同じ結果になる。
//
//  //SPLICE
//  // console.log(arr.splice(2));//(3) ['c', 'd', 'e']
//  // console.log(arr);//(2) ['a', 'b']
//  // //⇨spliceを使うと、元の配列も変わってしまう。
//  // console.log(arr.splice(1));//['b']
//  // console.log(arr);//['a']
//  console.log(arr);//['a', 'b', 'c', 'd', 'e']
//  arr.splice(-1);//一番最後だけ消す。使い方をよくする。
//  console.log(arr); //(4) ['a', 'b', 'c', 'd']
//
// //REVERSE
// arr = ["a","b","c","d","e"];
//
// const arr2 = ["j","i","h","g","f"];
// console.log(arr2.reverse()); //(5) ['f', 'g', 'h', 'i', 'j']反対から！
// console.log(arr2);//(5) ['f', 'g', 'h', 'i', 'j']一回リバースすると、元のやつも変わる。
//
// //CONCAT
// const letters = arr.concat(arr2);//arrにarr2をくっつける　
// console.log(letters);//(10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] JOINみたい。
// console.log([...arr,...arr2]);//(10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']結果は一緒
//
// //JOIN
// console.log(letters.join("-"));//a-b-c-d-e-f-g-h-i-jとなる。

////////////////////////////////////////////////////////////
//The new at Method 143

// const arr = [23,11,64];
// console.log(arr[0]); //23
// console.log(arr.at(0));//atというので同じことができる。
//
// console.log(arr[arr.length -1]);//一番最後の数字。64とでる。配列の長さがわからない時は便利。 -1なのは、配列は０から始まるから。
// console.log(arr.slice(-1)[0]); //これも64
// console.log(arr.at(-1));//64　atでより簡単に書くことができます！
// console.log(arr.at(-2)); //11

/////////////////////////////////////////////////////////////
//Looping arrays : forEach 144

//銀行をイメージして
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];//入金、マイナスは出金

for (const [i,movement] of movements.entries()){ //ループしているのでmovementsが全部でる。entries()の場合は、最初にindexがくる。二つ目に配列の要素。
  if(movement > 0){
    console.log(`Movement${i + 1}:Your diposited ${movement}`);
  }else{
    console.log(`Movement$${i + 1}:You withdrew ${Math.abs(movement)}`);//math.absでマイナスを消す。
  }
}

//新しいやり方
console.log("-----FOR EACH----");
movements.forEach(function(movement){ //movementはofみたいな感じ。それぞれをmovementとして、、みたいなね。
  if(movement > 0){
      console.log(`Your diposited ${movement}`);
    }else{
      console.log(`You withdrew ${movement}`);
    }
})


console.log("-----FOR EACH // INDEX----"); //indexを取るやり方。
movements.forEach(function(movement,index,array ){ //名前は全然関係なくて、とても重要なのは、movement, index, arrayの書く順番。最初が現在の要素、次がインデックス、
  if(movement > 0){
      console.log(`Movement${index + 1}:Your diposited ${movement}`);
    }else{
      console.log(`Movement${index + 1}:You withdrew ${Math.abs(movement)}`);
    }
})
//
// Movement1:Your diposited 200
// Movement2:Your diposited 450
// Movement3:You withdrew 400
// Movement4:Your diposited 3000
// Movement5:You withdrew 650
// Movement6:You withdrew 130
// Movement7:Your diposited 70
// Movement8:Your diposited 1300//このように表示される。

//違いは、forEachから抜けられるかどうか。continueとかbreak分は、forEachの中では全く効かない。for of loopなら抜け出せる
