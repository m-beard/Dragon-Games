const HASH = "33f976e96ea7c369955545d98b9c909dda505eeb8efbe67946c3076e2ccd54da";

async function askPassword() {
  const passwordInput = prompt("Enter Password:");

  if (passwordInput === null) {
    alert("Authentication cancelled.");
    return;
  }

  const msgBuffer = new TextEncoder().encode(passwordInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  if (hashHex === HASH) {
    openProxy();
  } else {
    alert("The dragons are not pleased");
  }
}

var url = "https://m-beard.github.com/Dragon-Games/menu.html";

function openProxy() {
  console.log('Opening automatically');
  let targetUrl = url.trim();

  if (!targetUrl) {
    console.log('No URL provided');
    return;
  }

  if (!targetUrl.startsWith('http')) {
    targetUrl = 'https://' + targetUrl;
  }

  console.log('Attempting to open:', targetUrl);

  // Open URL through about:blank iframe method
  const newWindow = window.open('about:blank', '_blank');
  if (newWindow) {
    newWindow.document.write(`
<html>
<head>
  <title>Dragon Games | The Lair</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body style="margin:0;overflow:hidden;background:#000;">
<iframe src="${targetUrl}" style="width:100%;height:100vh;border:none;"></iframe>
</body>
</html>
`);
    newWindow.document.close();
    console.log('Opened in about:blank with iframe');
    window.close(); // Close the original window/tab
  } else {
    // Fallback: open in same tab if popup blocked
    console.log('Popup blocked, opening in same tab');
    window.location.href = targetUrl;
  }
}
