
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const player_score = 0;
const beat_time = qs('#beat-time').innerHTML;

const postNoBody = (url) => fetch(url, { method: 'POST', credentials: 'same-origin' }).catch(() => { });

const startGameBtn = qs('#start-game');
startGameBtn?.addEventListener('click', () => {
  if (window.location.hostname.match(host)) {
    beginGame();
    qs('#game-area')?.classList.remove('hidden');
    qs('#scoreboard')?.classList.add('hidden');
    postNoBody('/speed/add_play_count');
  }
});

const submitForm = qs('#submit-score');
submitForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // attempt to fix the multiple submission mystery
  qsa('input[type=submit]').forEach(i => i.disabled = true);

  const name = (qs('input#name') || {}).value || '';
  const user_score = player_score;

  try {
    const res = await fetch('/speed/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: new URLSearchParams({ name, user_score })
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      // fallback if server returns a JSON string
      const text = await res.text();
      data = JSON.parse(text || '{}');
    }

    if (data && data.success) {
      location.reload(true);
    } else {
      const fb = qs('div.feedback');
      if (fb) fb.textContent = data?.msg || 'An error occurred';
      qsa('input[type=submit]').forEach(i => i.disabled = false);
    }
  } catch (err) {
    qsa('input[type=submit]').forEach(i => i.disabled = false);
  }
});

function beginGame() {
  let averageTime = 0;
  let current = new Date();
  const maxPlays = 5;
  const max_wait_time = 10; // seconds
  let recordedTimes = [];
  let timesPlayed = 0;

  function getRandomNum() {
    // milliseconds between 1000 and max_wait_time*1000
    return 1000 + Math.floor(Math.random() * ((max_wait_time * 1000) - 1000));
  }

  const clickBall = qs('#click-ball');

  const activate = () => {
    clickBall?.classList.add('active');
    current = new Date();
  };

  let timer = setTimeout(activate, getRandomNum());

  const feedbackEl = qs('div.feedback');

  const onClickBall = (e) => {
    clearTimeout(timer);
    timesPlayed++;

    let reactionTime;
    const el = e.currentTarget;

    if (el?.classList.contains('active')) {
      el.classList.remove('active');
      const now = new Date();
      reactionTime = (now.getTime() - current.getTime()) / 1000;
    } else {
      // user is clicking on red dot
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

    timer = setTimeout(activate, getRandomNum());

    if (timesPlayed <= maxPlays) {
      averageTime = recordedTimes.reduce((sum, t) => sum + Number(t), 0);
      // store as global the same way legacy code did
      player_score = (averageTime / timesPlayed).toFixed(3);
      qs('#current-average').textContent = player_score;
    }

    if (timesPlayed >= maxPlays) {
      clearTimeout(timer);
      if (el) el.removeAttribute('class');
      qs('#start-over')?.classList.remove('hidden');

      // compare numerically (beat_time might be a string)
      const beatThreshold = typeof beat_time !== 'undefined'
        ? parseFloat(beat_time)
        : parseFloat(qs('#beat-time')?.textContent || 'Infinity');

      if (parseFloat(player_score) < beatThreshold) {
        qs('#submit-score')?.classList.remove('hidden');
        const scoreInput = qs('#submit-score input[name="user_score"]');
        if (scoreInput) scoreInput.value = player_score;
      }
    }
  };

  clickBall?.addEventListener('mousedown', onClickBall);

  const startOverBtn = qs('#start-over');
  startOverBtn?.addEventListener('click', (e) => {
    clearTimeout(timer);
    recordedTimes = [];
    qsa('#score-list li').forEach(li => li.textContent = '');
    averageTime = 0;
    timesPlayed = 0;
    qs('#current-average').textContent = '0.000';
    const submit = qs('#submit-score');
    if (submit && !submit.classList.contains('hidden')) submit.classList.add('hidden');
    (e.currentTarget).classList.add('hidden');
    postNoBody('/speed/add_play_count');
    timer = setTimeout(activate, getRandomNum());
  });
}

// delegated click to hide flash message with id=feedback
document.addEventListener('click', (e) => {
  if (e.target && e.target.matches && e.target.matches('#feedback')) {
    e.target.classList.add('hidden');
  }
});