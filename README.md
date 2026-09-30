# 🏦 Bankist — Banking App

A minimalist online banking app built with vanilla JavaScript. Log in to a demo account to view your transactions, transfer money, request a loan, or close your account.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**🔗 Live demo:** [https://prasad-bankist.netlify.app/](#)

---

## 🔑 Demo Accounts

| User                   | Username | PIN    | Currency    |
| ---------------------- | -------- | ------ | ----------- |
| Jonas Schmedtmann      | `js`     | `1111` | USD (en-US) |
| Jessica Davis          | `jd`     | `2222` | EUR (pt-PT) |
| Steven Thomas Williams | `stw`    | `3333` | INR (en-IN) |
| Sarah Smith            | `ss`     | `4444` | YEN (ja-JP) |

---

## ✨ Features

- **Login** with username and PIN, with input validation
- **Account overview** — current balance and a list of all deposits and withdrawals
- **Summary** of total money in, money out and interest earned
- **Transfer money** to another account (validates the receiver, the amount and your balance)
- **Request a loan** — approved only if you have a deposit of at least 10% of the requested amount
- **Close your account** after confirming your username and PIN
- **Sort** transactions by amount
- **Automatic logout** after 5 minutes of inactivity (the timer resets on every action)
- **Internationalisation** — dates and currencies are formatted per account locale using the `Intl` API
- Friendly dates such as "Today", "Yesterday" and "3 days"

---

## 🧠 What I Practised

- Array methods: `map`, `filter`, `reduce`, `find`, `findIndex`, `some`, `sort`
- Working with dates, numbers and the `Intl` API
- Timers with `setInterval` and `clearInterval`
- Building usernames from owner names
- Updating the UI from application state

---

## 🛠️ Tech Stack

- **HTML5** — structure
- **CSS3** — styling
- **JavaScript (ES6+)** — application logic

---

## 🚀 Getting Started

No installation needed.

```bash
git clone https://github.com/prasad-k-s/Bankist.git
cd Bankist
```

Then open `index.html` in your browser and log in with one of the demo accounts above.

> **Note:** This is a front-end demo. All data lives in memory and resets when the page reloads.

---

## 📂 Project Structure

```
Bankist/
├── index.html
├── style.css
└── script.js
```

---

## 🙏 Credits

The base project comes from [Jonas Schmedtmann's](https://twitter.com/jonasschmedtman) _The Complete JavaScript Course_.
