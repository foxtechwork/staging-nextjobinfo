<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Coming Soon</title>
  <style>
    :root { --bg:#0f1724; --accent:#7c3aed; --muted:#94a3b8; }
    html,body{height:100%;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;}
    body{
      display:grid;place-items:center;
      background:linear-gradient(180deg,#071029 0%,var(--bg) 100%);
      color:#fff;padding:32px;
    }
    .card{max-width:720px;text-align:center;}
    h1{font-size:clamp(2rem,4vw,3rem);margin:0 0 8px}
    p{color:var(--muted);margin:0 0 20px}
    .email{
      display:inline-flex;
      gap:8px;
    }
    .email input{
      padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);
      background:rgba(255,255,255,0.02);color:#fff;outline:none;
      min-width:220px;
    }
    .btn{
      padding:10px 14px;border-radius:8px;border:0;background:var(--accent);color:#fff;font-weight:600;
      cursor:pointer;
    }
    footer{margin-top:28px;color:rgba(255,255,255,0.12);font-size:13px}
    @media (max-width:420px){ .email{flex-direction:column;align-items:stretch} }
  </style>
</head>
<body>
  <main class="card" role="main">
    <h1>We're launching soon</h1>
    <p>Something awesome is on its way. Join our mailing list to get notified when we go live.</p>

    <!-- Replace form action with your email provider / server endpoint -->
    <form class="email" action="#" method="post" onsubmit="alert('Replace the form action with your signup endpoint.'); return false;">
      <input aria-label="Email address" type="email" placeholder="your@email.com" required />
      <button class="btn" type="submit">Notify me</button>
    </form>

    <footer>© <span id="year"></span> Your Company</footer>
  </main>

  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
</body>
</html>
