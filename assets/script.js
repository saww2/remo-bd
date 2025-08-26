// Confetti - lightweight particles
function startConfetti() {
  const canvas = document.getElementById('confetti');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: 6 + Math.random() * 6,
    dx: -1 + Math.random() * 2,
    dy: 1 + Math.random() * 3,
    rot: Math.random() * Math.PI,
    dr: (-0.03 + Math.random() * 0.06)
  }));

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.rot += p.dr;
      if (p.y > canvas.height + 20) { p.y = -10; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = `hsl(${(p.y/4 + p.x/4) % 360}, 90%, 60%)`;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
      ctx.restore();
    });
    requestAnimationFrame(step);
  }
  step();
}

// Nothing else global; page-specific logic is embedded per page.
