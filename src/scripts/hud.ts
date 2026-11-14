import type Lenis from 'lenis';

/** OSD: tiempo de grabación, velocidad (scroll), altitud y batería (progreso de la página). */
export function iniciarHud(lenis: Lenis | null, reducido: boolean) {
  const tiempo = document.querySelector<HTMLElement>('[data-hud-tiempo]');
  const spd = document.querySelector<HTMLElement>('[data-hud-spd]');
  const alt = document.querySelector<HTMLElement>('[data-hud-alt]');
  const volt = document.querySelector<HTMLElement>('[data-hud-volt]');
  const carga = document.querySelector<SVGRectElement>('[data-hud-carga]');
  const bat = document.querySelector<HTMLElement>('[data-hud-bat]');
  if (!tiempo || !spd || !alt || !volt || !carga || !bat) return;

  const stickI = document.querySelector<HTMLElement>('[data-hud-stick-i]');
  const stickD = document.querySelector<HTMLElement>('[data-hud-stick-d]');
  let raton = { x: 0, y: 0 }, dx = 0, dy = 0, gas = 0, guinada = 0;
  window.addEventListener('pointermove', (e) => {
    raton = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
  }, { passive: true });

  const inicio = performance.now();
  const dos = (n: number) => String(n).padStart(2, '0');

  let ultimoY = window.scrollY;
  let ultimoT = performance.now();
  let velSuave = 0;

  const progreso = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };

  const pintar = () => {
    const s = Math.floor((performance.now() - inicio) / 1000);
    tiempo.textContent = `${dos(Math.floor(s / 3600))}:${dos(Math.floor(s / 60) % 60)}:${dos(s % 60)}`;

    const p = progreso();
    alt.textContent = String(Math.round(120 * (1 - p)));
    const v = 16.8 - p * 2.6; // 4S: de 16,8 V a ~14,2 V
    volt.textContent = `${v.toFixed(1)}V`;
    carga.setAttribute('width', String(Math.max(1.5, 23 * (1 - p * 0.92))));
    bat.classList.toggle('es-baja', p > 0.86);

    // velocidad: px/s de scroll convertidos a una cifra creíble de km/h
    const ahora = performance.now();
    const y = window.scrollY;
    const dt = Math.max(16, ahora - ultimoT);
    const pxs = lenis ? Math.abs(lenis.velocity) * 60 : Math.abs(y - ultimoY) / (dt / 1000);
    ultimoY = y; ultimoT = ahora;
    velSuave += (Math.min(140, pxs * 0.045) - velSuave) * 0.12;
    spd.textContent = String(Math.round(velSuave));

    // sticks: gas con la velocidad de scroll (y su sentido), cabeceo/alabeo con el ratón
    if (stickI && stickD) {
      const sentido = lenis ? Math.sign(lenis.velocity) : 0;
      gas += (Math.min(1, velSuave / 90) - gas) * 0.2;
      guinada += (sentido * Math.min(1, velSuave / 120) - guinada) * 0.1;
      dx += (raton.x - dx) * 0.15; dy += (raton.y - dy) * 0.15;
      stickI.style.transform = `translate(${(guinada * 9).toFixed(1)}px, ${(9 - gas * 18).toFixed(1)}px)`;
      stickD.style.transform = `translate(${(dx * 10).toFixed(1)}px, ${(dy * 10).toFixed(1)}px)`;
    }
  };

  if (reducido) {
    pintar();
    setInterval(pintar, 1000);
  } else {
    const bucle = () => { pintar(); requestAnimationFrame(bucle); };
    requestAnimationFrame(bucle);
  }
}
