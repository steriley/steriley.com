const TOTAL_ROUNDS = 5;
const MAX_WAIT_TIME_SECONDS = 10;

const qs = (selector: string, ctx = document) => ctx.querySelector(selector);
const qsa = (selector: string, ctx = document) =>
  Array.from(ctx.querySelectorAll(selector));
const getRandomNumber = (maximum = 1) =>
  1000 + Math.floor(Math.random() * (maximum * 1000 - 1000));

const TIME_TO_BEAT = qs('#beat-time')?.innerHTML;

async function submitScore(playerScore: number) {
  try {
    const nameInput = qs('input#name') as HTMLInputElement;
    const name = nameInput.value.trim().substring(0, 15);
    await fetch('/speed/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, playerScore }),
    });
  } catch (err) {
    const fb = qs('div.feedback');
    if (fb) fb.innerHTML = 'An error occurred';
  } finally {
    location.reload();
  }
}

function setAverageScore(amount = 0) {
  const currentAverage = qs('#current-average');
  if (currentAverage) currentAverage.innerHTML = amount.toFixed(3);
}

function resetGame() {
  qs('#game-area')?.classList.remove('hidden');
  qs('#scoreboard')?.classList.add('hidden');
  qs('#start-over')?.classList.add('hidden');
  qs('#submit-score')?.classList.add('hidden');
  qsa('#score-list li').forEach((li) => (li.innerHTML = ''));

  setAverageScore();

  fetch('/api/speed/play');
}

function startGame() {
  resetGame();

  let averageTime = 0;
  let current = new Date();
  let recordedTimes = [];
  let timesPlayed = 0;
  let playerScore = 0;

  const clickBall = qs('#click-ball');

  const activate = () => {
    clickBall?.classList.add('active');
    current = new Date();
  };

  let timer = setTimeout(activate, getRandomNumber(MAX_WAIT_TIME_SECONDS));

  const feedbackEl = qs('div.feedback');

  const onClickBall = () => {
    if (timesPlayed > TOTAL_ROUNDS - 1) return;
    timesPlayed++;
    clearTimeout(timer);

    let reactionTime;

    if (clickBall?.classList.contains('active')) {
      clickBall.classList.remove('active');
      const now = new Date();
      reactionTime = (now.getTime() - current.getTime()) / 1000;
    } else {
      reactionTime = 1;
      if (feedbackEl) {
        feedbackEl.classList.remove('hidden');
        feedbackEl.textContent = '1 second penalty!';
        setTimeout(() => feedbackEl.classList.add('hidden'), 1000);
      }
    }

    recordedTimes.push(reactionTime);
    const nextListItem = qsa('#score-list li')[timesPlayed - 1];
    if (nextListItem) nextListItem.textContent = reactionTime.toFixed(3);

    timer = setTimeout(activate, getRandomNumber(MAX_WAIT_TIME_SECONDS));

    if (timesPlayed <= TOTAL_ROUNDS) {
      averageTime = recordedTimes.reduce((sum, t) => sum + Number(t), 0);
      playerScore = averageTime / timesPlayed;
      setAverageScore(playerScore);
    }

    if (timesPlayed >= TOTAL_ROUNDS) {
      clearTimeout(timer);
      qs('#start-over')?.classList.remove('hidden');

      const beatThreshold =
        typeof TIME_TO_BEAT !== 'undefined'
          ? parseFloat(TIME_TO_BEAT)
          : parseFloat(qs('#beat-time')?.textContent || 'Infinity');

      if (playerScore < beatThreshold) {
        qs('#submit-score')?.classList.remove('hidden');
        const scoreInput = qs(
          '#submit-score input[name="score"]',
        ) as HTMLInputElement;
        if (scoreInput) scoreInput.value = playerScore.toString();
      }
    }
  };

  clickBall?.addEventListener('pointerdown', onClickBall);
  qs('#start-over')?.addEventListener('click', startGame);
  qs('#submit-score')?.addEventListener('submit', (event) => {
    event.preventDefault();
    (event.target as HTMLFormElement).disabled = true;
    submitScore(playerScore);
  });
}

qs('#start-game')?.addEventListener('click', startGame);

const gamesPlayed = document.getElementById('count');
const eventSource = new EventSource('/api/speed/played');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (gamesPlayed) gamesPlayed.innerHTML = data;
};

function findHighestScore(scores: { name: string; score: number }[]) {
  let highest = -Infinity;
  for (const entry of scores) {
    if (entry.score > highest) {
      highest = entry.score;
    }
  }
  return highest === -Infinity ? null : highest.toFixed(3);
}

function updateScoreboard(scoreboard: any) {
  function writeScores(selector: string, key: string) {
    qsa(`${selector} tr`).forEach((tr, i) => {
      const nameTd = tr.querySelector('td.name');
      const scoreTd = tr.querySelector('td.score');
      if (nameTd && scoreTd && scoreboard.scores[key][i]) {
        nameTd.textContent = scoreboard.scores[key][i].name;
        scoreTd.textContent = scoreboard.scores[key][i].score.toFixed(3);
      }
    });
  }

  writeScores('.scoreboard--today', 'today');
  writeScores('.scoreboard--monthly', 'month');

  const beatTime = qs('#beat-time');

  const highestScore = scoreboard.scores.today.length
    ? findHighestScore(scoreboard.scores.today)
    : findHighestScore(scoreboard.scores.month) || '0.000';

  if (beatTime) beatTime.textContent = highestScore;
}

async function getScoreboard() {
  const getScores = await fetch('/api/speed/scores');
  const scoreboard = await getScores.json();

  updateScoreboard(scoreboard);
}

getScoreboard();
