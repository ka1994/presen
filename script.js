(function() {
  // sceneXXXは、各ゲーム画面の要素です
  const sceneTop = document.getElementById("sceneTop");
  const sceneGame = document.getElementById("sceneGame");
  const sceneResult = document.getElementById("sceneResult");
  // 問題文を表示する要素です
  const textQuestion = document.getElementById("textQuestion");
  // 選択肢を表示する要素です
  const listAnswer = document.getElementById("listAnswer");
  // 正解数を表示する要素です
  const numResult = document.getElementById("numResult");
  // トップ画面にて、ゲームを開始するボタン要素です
  const btnStart = document.getElementById("btnStart");
  // リザルト画面にて、ゲームをリセットしトップへ戻るボタン要素です
  const btnReset = document.getElementById("btnReset");

  //問題文を格納する要素です
  const question = [
    {
      text: "トヨタ自動車の現在の社長の名前は？",
      choice: ["豊田達郎さん", "豊田英二さん", "豊田章男さん", "Tamarohさん"],
      ansewer: "豊田章男さん"
    },
    {
      text: "いつも命令口調でいばっている色ってなーんだ？",
      choice: ["白", "赤", "緑", "黒"],
      ansewer: "白"
    },
    {
      text: "放っておくと２倍にふえていく「きん」ってなーんだ？",
      choice: ["大金","除菌","ばい菌","転勤"],
      ansewer: "ばい菌"
    },
    {
      text: "プログラミング基礎で身についた力はなんでしょう？",
      choice: ["忍耐力！", "精神力！", "体力！", "プログラミング力！"],
      ansewer: "プログラミング力！"
    }
    ];
    
  // ゲームで使用する共通の変数です
  // answer...プレイヤーの答えと比較する、正解のテキストです
  // gameCount...プレイヤーが答えた数です
  // success...プレイヤーが答えて、正解した数です
  let state = {
    answer: "",
    gameCount: 0,
    success: 0
  };

  // ゲームをリセットする関数を書いてみましょう
  function init() {
    state.gameCount = 0;
    state.success = 0;
    changeScene(sceneResult, sceneTop);

    btnStart.addEventListener("click", gameStart, false);
  }

  // 1.トップ画面　2.ゲーム画面　3.正解画面
  function changeScene(hiddenScene, visibleScene) {
    hiddenScene.classList.add("is-hidden");
    hiddenScene.classList.remove("is-visible");
    visibleScene.classList.add("is-visible");
  }

  // 問題と選択肢をViewに表示し、正解を共通の変数へ代入
  function showQuestion() {
    let str = "";
    question[state.gameCount].choice.forEach(function(value) {
      str += '<li class="questionChoice">' + value + "</li>";
    });
    textQuestion.innerHTML = question[state.gameCount].text;
    listAnswer.innerHTML = str;
  }

  function choiceQuestion() {
    let questionChoice = document.querySelectorAll(".questionChoice");
    questionChoice.forEach(function(choice) {
      choice.addEventListener(
        "click",
        function() {
          state.answer = this.textContent;
          checkAnswer(question[state.gameCount].ansewer);
        },
        false
      );
    });
  }

  // 解答が正解か不正解かをチェック
  function checkAnswer(answer) {
    if (answer === state.answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
    state.gameCount++;
    if (state.gameCount < question.length) {
      showQuestion();
      choiceQuestion();
    } else {
      gameEnd();
    }
  }

  // 上でチェックし、正解だった場合
  function correctAnswer() {
    state.success++;
    console.log("正解");
  }

  // 上でチェックし、不正解だった場合
  function incorrectAnswer() {
    console.log("不正解");
  }

  // スタートボタンが押された時
  function gameStart() {
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
  }

  // ゲームが終了した時
  function gameEnd() {
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    btnReset.addEventListener("click", init, false);
  }

  // スタートボタンが押されたら、ゲームスタートの関数を
  // リセットボタンが押されたら、ゲーム終了後にゲームをリセットする関数を実行する
  init();
})();
