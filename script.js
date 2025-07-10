"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 77],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-11-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2025-04-01T07:02:10.969Z",
    "2025-04-02T07:02:10.969Z",
    "2025-04-03T07:02:10.969Z",
    "2025-04-04T07:02:10.969Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-11-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-11-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "en-IN",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2024-11-18T21:31:17.178Z",
    "2024-11-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-05-27T17:01:17.194Z",
    "2024-07-11T23:36:17.929Z",
    "2024-07-12T10:51:36.790Z",
  ],
  currency: "YEN",
  locale: "ja-JP",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const loginForm = document.querySelector(".login");
const btnLogout = document.querySelector(".logout__btn");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  console.log(new Date(Date.now()).toISOString());

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days`;

  // const day = `${date.getDay()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = "";

  const combineMovementsDates = acc.movements.map((mov, i) => {
    return { movement: mov, movementDate: acc.movementsDates.at(i) };
  });

  if (sort) {
    combineMovementsDates.sort((a, b) => a.movement - b.movement);
  }
  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;

  combineMovementsDates.forEach((obj, i) => {
    const { movement, movementDate } = obj;
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, currentAccount.locale);
    const type = movement > 0 ? "deposit" : "withdrawal";
    const formattedMovement = formatCur(movement, acc.locale, acc.currency);
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMovement}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${formatCur(
    income,
    account.locale,
    account.currency
  )}`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  )}`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * (account.interestRate / 100))
    .filter((int) => int > 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${formatCur(
    interest,
    account.locale,
    account.currency
  )}`;
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBalance = formatCur(
    account.balance,
    account.locale,
    account.currency
  );
  labelBalance.textContent = `${formattedBalance}`;
};

const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = (account) => {
  //Display movements

  displayMovements(account);

  //Display balance
  calcDisplayBalance(account);

  //Display summary
  calcDisplaySummary(account);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and logout user

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
    }
    //Decrese 1s
    time--;
  };

  //Set time to 5 minutes
  let time = 300;

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

let currentAccount, timer;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputLoginUsername.value) {
    alert("Please enter the username");
    return;
  }
  if (!inputLoginPin.value) {
    alert("Please enter the pin");
    return;
  }
  if (isNaN(Number(inputLoginPin.value))) {
    alert("Please enter valid pin");
    return;
  }

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (!currentAccount || currentAccount?.pin !== Number(inputLoginPin.value)) {
    alert("Please enter the correct username and PIN.");
    return;
  }

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    loginForm.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDay()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // const sec = `${now.getSeconds()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}:${sec}`;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);

    if (timer) {
      clearInterval(timer);
    }

    timer = startLogOutTimer();
  }
});

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  labelWelcome.textContent = "Login to get started";
  containerApp.style.opacity = 0;
  loginForm.classList.remove("hidden");
  btnLogout.classList.add("hidden");
  if (timer) {
    clearInterval(timer);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputTransferTo.value) {
    alert("Please enter the username of the account to transfer.");
    return;
  }

  if (!inputTransferAmount.value) {
    alert("Please enter the amount");
    return;
  }

  if (Number(inputTransferAmount.value) < 0) {
    alert("Please enter a valid amount");
    return;
  }
  const amount = Number(inputTransferAmount.value);
  const recevierAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (!recevierAcc) {
    alert("No account exists with this username.");
    return;
  }

  if (recevierAcc.owner === currentAccount.owner) {
    alert("You cannot transfer money to your own account.");
    return;
  }

  if (amount > currentAccount.balance) {
    alert("Insufficient balance.");
    return;
  }

  currentAccount.movements.push(-amount);
  recevierAcc.movements.push(amount);

  currentAccount.movementsDates.push(new Date().toISOString());
  recevierAcc.movementsDates.push(new Date().toISOString());

  updateUI(currentAccount);

  inputTransferAmount.value = inputTransferTo.value = "";

  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);
  if (loanAmount < 0) {
    alert("Please enter a valid amount");
    return;
  }

  if (currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  } else {
    alert("Loan not approved");
  }
  inputLoanAmount.value = "";

  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  const username = inputCloseUsername.value;
  const pin = inputClosePin.value;

  if (!username) {
    alert("Please enter your user name");
    return;
  }
  if (!pin) {
    alert("Please enter your pin");
    return;
  }
  if (isNaN(Number(pin))) {
    alert("Please enter a valid pin");
    return;
  }

  if (
    username !== currentAccount.username ||
    Number(pin) !== currentAccount.pin
  ) {
    alert("Please enter a valid user name and pin");
    return;
  }

  const index = accounts.findIndex(
    (acc) => acc.username === currentAccount.username
  );

  accounts.splice(index, 1);

  containerApp.style.opacity = 0;

  inputCloseUsername.value = inputLoginPin.value = "";
  clearInterval(timer);
});

let sorted = false;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
