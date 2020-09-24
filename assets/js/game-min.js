const myModule = (() => {
  'use strict';
  let e = [];
  const t = ['C', 'D', 'H', 'S'],
    n = ['A', 'J', 'Q', 'K'];
  let r = [];
  const a = document.querySelector('#btnNew'),
    o = document.querySelector('#btnCard'),
    l = document.querySelector('#btnStop'),
    s = document.querySelectorAll('.divCards'),
    d = document.querySelectorAll('small'),
    c = (t = 2) => {
      (e = i()), (r = []);
      for (let e = 0; e < t; e++) r.push(0);
      d.forEach((e) => (e.innerText = 0)),
        s.forEach((e) => (e.innerText = '')),
        (o.disabled = !1),
        (l.disabled = !1);
    },
    i = () => {
      e = [];
      for (let n = 2; n <= 10; n++) for (let r of t) e.push(n + r);
      for (let r of t) for (let t of n) e.push(t + r);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw 'No quedan cartas en el mazo';
      return e.pop();
    },
    m = (e, t) => (
      (r[t] =
        r[t] +
        ((e) => {
          const t = e.substring(0, e.length - 1);
          return isNaN(t) ? ('A' === t ? 11 : 10) : 1 * t;
        })(e)),
      (d[t].innerText = r[t]),
      r[t]
    ),
    f = (e, t) => {
      const n = document.createElement('img');
      (n.src = `assets/cards/${e}.png`),
        n.classList.add('card'),
        s[t].append(n);
    },
    g = (e) => {
      l.disabled = !0;
      let t = 0;
      do {
        const e = u();
        (t = m(e, r.length - 1)), f(e, r.length - 1);
      } while (t <= e && e <= 21);
      (() => {
        const [e, t] = r;
        setTimeout(() => {
          t === e
            ? alert('Nadie gana :(')
            : e > 21
            ? alert('Computadora gana')
            : t > 21
            ? alert('Jugador gana')
            : alert('Computadora gana');
        }, 100);
      })();
    };
  return (
    o.addEventListener('click', () => {
      const e = u(),
        t = m(e, 0);
      f(e, 0),
        t > 21
          ? (console.warn('Perdiste!!'), (o.disabled = !0), g(t))
          : 21 === t &&
            (console.warn('Ganaste!'), (o.disabled = !0), g(pointsPlayer));
    }),
    l.addEventListener('click', () => {
      (o.disabled = !0), (l.disabled = !0), g(r[0]);
    }),
    a.addEventListener('click', () => {
      c();
    }),
    { newGame: c }
  );
})();
