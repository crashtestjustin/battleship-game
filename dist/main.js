(()=>{"use strict";function t(t,e){const n=document.createElement("div");return n.className=t,n.id=e,"undefined"===n.id&&(n.id=t),n}!function(){const e=document.querySelector(".application"),n=function(){const e=t("header"),n=t("title");return n.textContent="Battleship Game",e.appendChild(n),e}();e.appendChild(n);const o=function(){const e=t("body"),n=t("body-title");n.textContent="Provide your name to start the game.";const o=t("game-inputs"),a=t("player-name-title");a.textContent="Your Name:";const d=function(t,e,n,o){const a=document.createElement("input");return a.type="text",a.id="name",a.placeholder="Enter your name captain!",a}(),r=function(t,e){const n=document.createElement("button");return n.className="start-game",n.textContent="Start Game",n}();o.append(a,d,r);const i=t("player-board-title");i.textContent="Your Ships";const c=t("board-div");c.classList.add("player-board");for(let e=0;e<100;e++){const e=t("grid-square");c.appendChild(e)}const s=t("cpu-board-title");s.textContent="Sink the Enemy Ships";const p=t("board-div");p.classList.add("cpu-board");for(let e=0;e<100;e++){const e=t("grid-square");p.appendChild(e)}return e.appendChild(n),e.append(o,i,c,s,p),e}();e.appendChild(o);const a=function(){const e=t("footer"),n=t("title");return n.textContent="Footer",e.appendChild(n),e}();e.appendChild(a)}()})();