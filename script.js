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

const displayMovements = function(movements){
  containerMovements.innerHTML = ""; //前にも最初の値を0にするってあったけど、これも空白にして最初の値をからにしている。
   movements.forEach(function(mov,i){//forEachでループさせる。
      const type = mov > 0 ? "deposit" : "withdrawal"; //新しいtypeメソッドを作って、三項演算子で0以上ならdeposite,違うならwithdrawlにする。
     const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i -1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>
     `;//めっちゃオペレーター使う
     containerMovements.insertAdjacentHTML("afterbegin",html);//afterbeginにすることで、新しい要素はどんどん上に積み重なっていく
     //insertAdjacentHTMLとはhtml要素を追加する方法。ページ遷移をしないSPAの作成に便利



   });
};

displayMovements(account1.movements);


const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.userName = acc.owner //それぞれのアカウントにはownerがある。
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      // return name[0]; //０番目の文字のみ抽出＝[s] [t] [w] と出る。（全部小文字にした後に、splitで3つに分けて、からのそれぞれの頭文字を抽出して配列に格納。アロー関数で書くとこんな感じ。
      .join(" ");//全部を小文字にして、それをスペースで区切る。splitだから、配列に3つが入る感じ。joinということはs t w となりました。

  });
};


// const user = "Steven Thomas Williams";ole.log(username);

// console.log(createUsernames("Miya Sasamoto Gonzalez")); //m s g
console.log(accounts); //accountsの配列が上にある。4つのアカウントが格納されているやつ。

// console.log(containerMovements.innerHTML);

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
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];//入金、マイナスは出金
//
// for (const [i,movement] of movements.entries()){ //ループしているのでmovementsが全部でる。entries()の場合は、最初にindexがくる。二つ目に配列の要素。
//   if(movement > 0){
//     console.log(`Movement${i + 1}:Your diposited ${movement}`);
//   }else{
//     console.log(`Movement$${i + 1}:You withdrew ${Math.abs(movement)}`);//math.absでマイナスを消す。
//   }
// }
//
// //新しいやり方
// console.log("-----FOR EACH----");
// movements.forEach(function(movement){ //movementはofみたいな感じ。それぞれをmovementとして、、みたいなね。
//   if(movement > 0){
//       console.log(`Your diposited ${movement}`);
//     }else{
//       console.log(`You withdrew ${movement}`);
//     }
// })
//
//
// console.log("-----FOR EACH // INDEX----"); //indexを取るやり方。
// movements.forEach(function(movement,index,array ){ //名前は全然関係なくて、とても重要なのは、movement, index, arrayの書く順番。最初が現在の要素、次がインデックス、
//   if(movement > 0){
//       console.log(`Movement${index + 1}:Your diposited ${movement}`);
//     }else{
//       console.log(`Movement${index + 1}:You withdrew ${Math.abs(movement)}`);
//     }
// })
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

///////////////////////////////////////
//forEach with Maps and Sets 145

//通貨マップ
// const currencies = new Map([
//   ['USD', 'United States dollar'],  //左側がkey,右側がvalue
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// currencies.forEach(function(value,key,map){ //最初のは配列の現在の要素、二つ目はインデックス、3つ目は配列全体。
//   console.log(`${key}: ${value}`);
// })
//
// ///USD: United States dollar
// // UR: Euro
// // GBP: Pound sterlingと表示される。
//
// const currenciesUnique = new Set(["USD","UR","USD","EUR","EUR"]);//Setの時、[]で囲むの忘れないで
// console.log(currenciesUnique);
// //Set(3) {'USD', 'UR', 'EUR'} 同じものは省かれる
//
// console.log("---TEST---");
// currenciesUnique.forEach(function(value,key,map){
//   console.log(`${key}: ${value}`);
// })
// ///
// // USD: USD
// // UR: UR
// // EUR: EURとなる Setにはキーがないため、keyとvalueは必然的に同じになる。だから別に引数とかいらない。
//
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
//
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
//
// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets
//
// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// console.log("-----FOR EACH----");
// movements.forEach(function(movement){ //movementはofみたいな感じ。それぞれをmovementとして、、みたいなね。
//   if(movement > 0){
//       console.log(`Your diposited ${movement}`);
//     }else{
//       console.log(`You withdrew ${movement}`);
//     }
// })

// const juliasDogs = [9, 16, 6, 8, 3];
// const katesDogs = [10, 5, 6, 1, 4];
//
// const juliasDogsCorrect = juliasDogs.slice();
// juliasDogsCorrect.splice(0,1); //最初の一匹と
// juliasDogsCorrect.splice(-2); //最後の2ひきは猫でした〜。
// console.log(juliasDogsCorrect);
//
// const dogs = [...juliasDogsCorrect, ...katesDogs];
// // console.log(dogs);
// dogs.forEach(function(dog,index,array){
//   if (dog > 3 ){
//     console.log(`Dog${index + 1} :  adult! ${dog}yo!`);
//   }else {
//     console.log(`Dog${index + 1} :  puppy! ${dog}yo!`);
//   }
// });

////////////////////////////////////////////////////
//The Map Method 150
//mapは新しい配列を作り、元の配列要素に、コールバック関数を適用した結果を各配置に格納する。

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;


// const movementUSD = movements.map(function(mov){
//   return mov * eurToUsd; //movementsに1.1をかけた値が返される
//   // return 23; //全部が23と返される
// })
//
// console.log(movements);
// console.log(movementUSD);

//これがmapメソッド。元の配列は一歳何も変わらずに、新しい配列を生み出すことができる。

// console.log("---Another Examples");
// const movementsUSDFor = []; //空の配列を用意する
//
// for (const mov of movements)movementsUSDFor.push(mov * eurToUsd); //for of ループを使う方法
// console.log(movementsUSDFor);　//新しいmapメソッドを使う方が簡単じゃないか？

//アロー関数で書くとこうなる。使いずらくない？arrowはreturnはいらないからね。でもレクチャーはこれがお好きらしい。

// console.log("----- ARROW ----");
// const movementUSD = movements.map(mov =>
//    mov * eurToUsd
// );
//
// console.log(movements);
// console.log(movementUSD);
//
//
// // const movementsDescriptions = movements.map(mov,i,arr => {
// //   movements.forEach(function(movement){
// //     if(movement > 0){
// //         return `Movements ${i + 1}: Your diposited ${movement}`;
// //       }else{
// //         return `Movements ${i + 1}: You withdrew ${Math.abs(movement)}` ;
// //   }
// // });
// //
// // console.log(movementsDescriptions);
//
// const movementsDescriptions = movements.map((mov,i,arr) => //アロー嫌い、、
//
//   `Movement ${i + 1}: You ${mov > 0 ? "deposited": "widthdraw"} ${Math.abs(mov)}`
//
//   // if(mov > 0){
//   //   return `Movement ${i + 1}: You deposited ${mov}`;
//   // }else{
//   //   return `Movement${i + 1}: You widthdraw ${Math.abs(mov)}`;
//   // }
// );
// console.log(movementsDescriptions);
// //(8) ['Movement 1: You deposited 200', 'Movement 2: You deposited 450', 'Movement 3: You widthdraw 400', 'Movement 4: You deposited 3000', 'Movement 5: You widthdraw 650', 'Movement 6: You widthdraw 130', 'Movement 7: You deposited 70', 'Movement 8: You deposited 1300']が出る

///////////////////////////
//The filter methods 152
//ある条件を満たす要素をフィルタリングする。

const deposits = movements.filter(function(mov){
  return mov > 0; //これだけで0以上のものだけがフィルターにかけられて生き残る。

});

console.log(movements); //(8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposits); //(5) [200, 450, 3000, 70, 1300]プラスの値だけ！

console.log("---Another one---");
const depositsFor = []; //空の配列を作って
for (const mov of movements) if (mov > 0) depositsFor.push(mov); //pushするのもやり方の一つ。
console.log(depositsFor);

const widthdrawls = movements.filter(mov => mov < 0); //アロー関数を使って、ネガティブだけを出す
console.log(widthdrawls);//(3) [-400, -650, -130]
