const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const PORT = process.env.PORT || 4000;
const db = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// 1. child-process모듈의 spawn 취득
const spawn = require("child_process").spawn;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.16.171:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "mySuperSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// 회원가입 요청
app.post("/api/register", (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  const username = req.body.username;
  let myPlaintextPassword = req.body.password;

  if (myPlaintextPassword !== "" && myPlaintextPassword !== undefined) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB.
        password = hash;
        console.log(password);
        db.query(
          "INSERT INTO member (email, password, username) VALUES(?, ?, ?)",
          [email, password, username],
          (err, api_result) => {
            if (err) {
              res.send({ message: err });
            } else {
              res.send(api_result);
            }
          }
        );
      });
    });
  }
});

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// 로그인 기능 구현
app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let info = { type: false, message: "" };
  db.query(
    // 요청된 email이 있는지 DB에서 검색
    "SELECT * FROM member WHERE email = ?",
    [email],
    (err, rows) => {
      if (err) {
        res.send({ err: err });
      }
      // rows는 빈배열도 true로 인식하므로 rows.length로 조건 설정
      if (rows.length > 0) {
        bcrypt.compare(password, rows[0].password, function (err, api_result) {
          // 입력한 비밀번호와 암호화된 비밀번호가 일치할 경우(성공적으로 로그인한 경우)
          if (api_result === true) {
            req.session.user = rows[0];
            req.session.user.plainPassword = password;
            res.send(rows[0]);
          } else {
            return res.send({
              message: "이메일 또는 비밀번호가 틀렸습니다.",
            });
          }
        });
      } else {
        info.message = "존재하지 않는 유저입니다.";
        return res.send({ message: "존재하지 않는 계정입니다." });
      }
    }
  );
});

// 로그아웃 기능 구현
app.post("/api/logout", (req, res) => {
  // req.session.destroy() 메소드로 세션을 삭제
  req.session.destroy((err) => {
    if (err) throw err;
  });
  return res.send({ message: "sign out" });
});

// 회원정보 수정 요청
app.post("/api/userUpdate", (req, res) => {
  let myPlaintextPassword = req.body.newPassword;
  const id = req.body.id;
  if (myPlaintextPassword !== "" && myPlaintextPassword !== undefined) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // Store hash in your password DB.
        password = hash;
        db.query(
          "UPDATE member SET password = ? WHERE id = ?",
          [password, id],
          (err, api_result) => {
            if (err) {
              res.send({ error: err });
            } else {
              res.send(api_result);
            }
          }
        );
      });
    });
  }
});

// 검색 기능 구현
app.post("/api/search", (req, res) => {
  const inputVal = req.body.inputVal;
  let dataToSend;
  console.log("inputVal = " + inputVal);

  // spawn을 통해 "python 파이썬파일.py" 명령어 실행
  const api_result = spawn("python", ["api/osint_async_api.py", inputVal]);

  // stdout의 'data'이벤트리스너로 실행결과를 받는다.
  api_result.stdout.on("data", function (data) {
    console.log("data!");
    console.log(data.toString("utf8"));
    dataToSend = JSON.parse(data.toString("utf8").replaceAll("\n", ""));
    return res.send(dataToSend);
  });
  // 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
  api_result.stderr.on("data", function (data) {
    //console.log("error!");
    //console.error(data.toString());
  });
});

app.post("/api/insertSearchData", (req, res) => {
  const idx = req.body.idx;
  const dateTime = req.body.dateTime;
  const searchAddress = req.body.searchAddress;
  const vulnerableItems = req.body.vulnerableItems;
  db.query(
    "INSERT INTO search_history(id, searchDate, searchAddress, vulnerableItems) VALUES(?, ?, ?, ?)",
    [idx, dateTime, searchAddress, vulnerableItems],
    (err, api_result) => {
      if (err) {
        res.send({ message: err });
      } else {
        res.send(api_result);
      }
    }
  );
});

// 검색기록 기능 구현
app.post("/api/search_history", (req, res) => {
  const idx = req.body.idx;
  db.query("SELECT * FROM search_history WHERE id = ?", [idx], (err, rows) => {
    if (err) {
      res.send({ err: err });
    }
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send({
        message: "검색기록이 존재하지 않습니다.",
      });
    }
  });
});

app.listen(4000, () => {
  console.log(`running server ${PORT}`);
});
