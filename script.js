 const messages = [
      "Initializing Hacking...",
      "reading your files...",
      "Password files Dtected...",
      "Sending all passwords and personal files to server...",
      "Cleaning up..."
    ];

    // helper sleep
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    // random delay 1-7 seconds
    const randomDelay = () => 1000 + Math.floor(Math.random() * 7000);

    async function showLine(container, text) {
      
      const trailingDotsMatch = text.match(/(\.+)$/);
      const baseText = trailingDotsMatch ? text.slice(0, -trailingDotsMatch[0].length) : text;
      const dotCount = trailingDotsMatch ? trailingDotsMatch[0].length : 0;

      // create elements
      const lineEl = document.createElement("div");
      lineEl.className = "line";
      const textEl = document.createElement("span");
      textEl.textContent = baseText;
      const dotsEl = document.createElement("span");
      dotsEl.className = "dots";

      const animateDots = Math.min(dotCount || 3, 3);
      for (let i=0; i<animateDots; i++){
        const d = document.createElement("span");
        d.className = "dot";
        d.textContent = ".";
        dotsEl.appendChild(d);
      }

      lineEl.appendChild(textEl);
      lineEl.appendChild(dotsEl);
      container.appendChild(lineEl);

      // small show animation
      requestAnimationFrame(()=> lineEl.classList.add("show"));

      // animate dots one by one
      const dotSpans = Array.from(dotsEl.querySelectorAll(".dot"));
      for (let i=0; i<dotSpans.length; i++){
        await sleep(400);                 // time between each dot
        dotSpans[i].classList.add("visible");
      }

      // brief pause after all dots visible before resolving
      await sleep(500);
    }

    // main runner
    (async function runTerminal(){
      const term = document.getElementById("term");
      for (const msg of messages) {
        // random wait before showing each line (1-7s)
        await sleep(randomDelay());

        // show the line and animate its dots
        await showLine(term, msg);

        // optional tiny pause before next line starts
        await sleep(200);
      }

      const done = document.createElement("div");
      done.className = "line show";
      done.textContent = "Process complete.";
      term.appendChild(done);
    })();