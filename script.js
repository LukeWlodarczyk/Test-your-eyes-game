document.addEventListener("DOMContentLoaded", event => {

  const btn = document.querySelector('#startBtn');
  const sqrs = document.querySelectorAll('.square');
  const result = document.querySelector('.score');
  const difficulty = document.querySelector('#difficulty')
  let lighten = 0.3;
  let score = 0;
  let best = 0;

  sqrs.forEach( s => s.style.backgroundColor=getRandomRgb());

  function getRandomNum() {
    return Math.floor(Math.random() * 16)
  }


  function getRandomRgb() {
    const r = Math.floor(Math.random() * 100);
    const g = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    return `rgb(${r}, ${g}, ${b})`
  }

  function shadeRGBColor(color, percent) {
    const f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
  }

  btn.addEventListener('click', startGame);
  difficulty.addEventListener('change', () => {
    best = 0;
    startGame();
  })

  function startGame() {
    lighten = 1-difficulty.value;
    score = 0;
    prepareGame()
  }


  let color;
  let num;

  function prepareGame() {
    result.innerText = `Points: ${score} / Best: ${best} points`;
    color = getRandomRgb();
    sqrs.forEach( s => s.style.backgroundColor=color );
    num = getRandomNum();
    console.log(num);
    sqrs[num].style.backgroundColor = shadeRGBColor(color, lighten)
  }

  sqrs.forEach( s => s.addEventListener('click', check));

  function check(event) {
    console.log(lighten);
    if (color === undefined || lighten <= 0) {
      return null;
    }
    if(event.target.style.backgroundColor !== color){
      console.log('correct');
      score++;
      lighten -= 0.01;
      (score>best) ? best=score : best=best
      result.innerText = `Points: ${score} / Best: ${best} points`;
      if(lighten < 0) {
        result.innerText = `Congratulations! You won!`;
        sqrs.forEach( s => s.classList.add('correct'));
        sqrs[num].addEventListener("webkitAnimationEnd", () => {
          sqrs.forEach( s => s.classList.remove('correct'));
          startGame();
        } );
        return null;
      }
      prepareGame();
    } else {
      (score>best) ? best=score : best=best;
      sqrs[num].classList.add('correct');
      sqrs[num].removeEventListener('click', check);
      btn.removeEventListener('click', startGame);
      sqrs[num].addEventListener("webkitAnimationEnd", () => {
        sqrs[num].classList.remove('correct');
        sqrs[num].addEventListener('click', check);
        btn.addEventListener('click', startGame);
        startGame();
      } );
      console.log('wrong');
    }
  }

});
