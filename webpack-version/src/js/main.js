// var processorsArray = [
//   require('autoprefixer')({ grid: true, browsers: ['>1%'] })
// ];

import '../css/output.css';

let w;

const _C = document.querySelector('.scroll-container'),
  N = _C.children.length;

_C.style.setProperty('--n', N);

let locked = false;

function lock(e) {
  x0 = unify(e).clientX;
  _C.classList.toggle('smooth', !(locked = true));
}

function move(e) {
  if (locked) {
    let dx = unify(e).clientX - x0,
      s = Math.sign(dx),
      f = +((s * dx) / w).toFixed(2);

    if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > 0.2) {
      _C.style.setProperty('--i', (i -= s));
      f = 1 - f;
    }

    _C.style.setProperty('--tx', '0px');
    _C.style.setProperty('--f', f);
    _C.classList.toggle('smooth', !(locked = false));
    x0 = null;
  }
}

size();

addEventListener('resize', size, false);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);

console.log(N);

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function size() {
  w = window.innerWidth;
}

let x0 = null;

function lock(e) {
  x0 = unify(e).clientX;
}

let i = 0;

function move(e) {
  if (x0 || x0 === 0) {
    let dx = unify(e).clientX - x0,
      s = Math.sign(dx);

    if ((i > 0 || s < 0) && (i < N - 1 || s > 0))
      _C.style.setProperty('--i', (i -= s));

    x0 = null;
  }
}

_C.addEventListener(
  'touchmove',
  e => {
    e.preventDefault();
  },
  false
);

function drag(e) {
  e.preventDefault();
  if (locked) {
    e.preventDefault();

    if (x0 || x0 === 0)
      _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
  }

  _C.addEventListener('mousemove', drag, false);
  _C.addEventListener('touchmove', drag, false);
}
