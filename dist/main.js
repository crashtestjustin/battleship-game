(()=>{"use strict";const t=t=>({name:t,length:(()=>{switch(t){case"Carrier":return 5;case"Battleship":return 4;case"Destroyer":case"Submarine":return 3;case"Patrol Boat":return 2;default:return 0}})(),hitCount:0,sunk:!1,hit:function(){this.hitCount++,this.isSunk()},isSunk:function(){this.hitCount>=this.length&&(this.sunk=!0)}}),e=()=>({boardArray:[],missedGuesses:[],hitGuesses:[],shipsLeft:["Carrier","Battleship","Submarine","Destroyer","Patrol Boat"],shipsSunk:0,shipObjects:[],placeShipsRandom:function(){for(let e=0;e<this.shipsLeft.length;e++){let n=Math.random()>=.5,o=t(this.shipsLeft[e]),s=this.placeShipRecursive(o,n);this.boardArray.push(s),this.shipObjects.push(o),o.location=s}},placeShipRecursive:function(t,e){let o=n(),s=this.checkValidPlacement(t,o,e);return s?this.checkForShipOverlap(s)?this.placeShipRecursive(t,e):s:this.placeShipRecursive(t,e)},checkValidPlacement:function(t,e,n){let o=[];if(o.push(e),n&&e[0]+t.length>10)return!1;if(!n&&e[1]+t.length>10)return!1;for(let s=1;s<t.length;s++){let t;if(t=n?[e[0]+s,e[1]]:[e[0],e[1]+s],this.compareArrays(t))return!1;o.push(t)}return o},checkForShipOverlap:function(t){for(let e=0;e<this.shipObjects.length;e++){const n=this.shipObjects[e].location;for(let e=0;e<t.length;e++){const o=t[e];for(let t=0;t<n.length;t++){const e=n[t];if(e[0]===o[0]&&e[1]===o[1])return!0}}}return!1},compareArrays:function(t,e){let n=!1;if(void 0===e)for(let e=0;e<this.boardArray.length;e++){const o=this.boardArray[e];for(let e=0;e<o.length;e++)if(o[e][0]===t[0]&&o[e][1]===t[1]){n=!0;break}if(n)break}else for(let o=0;o<t.length;o++)if(t[o][0]===e[0]&&t[o][1]===e[1]){n=!0;break}return n},checkForAllSunk:function(){let t=0;for(let e=0;e<this.shipObjects.length;e++)this.shipObjects[e].sunk&&t++;return this.shipsSunk=t,t},receiveAttack:function(t){let e=null;for(let n=0;n<this.shipObjects.length;n++){const o=this.shipObjects[n].location;if(this.compareArrays(o,t)){if(this.shipObjects[n].hit(),this.hitGuesses.push(t),e=this.shipObjects[n],e.sunk){this.shipsLeft=[];for(let t=0;t<this.shipObjects.length;t++)this.shipObjects[t].sunk||this.shipsLeft.push(this.shipObjects[t].name)}break}}if(null!==e){const t=this.checkForAllSunk();return 5===t?t:e}return this.missedGuesses.push(t),t}});function n(){return[parseInt(10*Math.random()),parseInt(10*Math.random())]}const o=t=>({name:t,CPU:"CPU"===t,oponentGameboard:e(),attackHistory:[],checkAttackHist:function(t){let e=this.attackHistory;for(let n of e)if(n[0]===t[0]&&n[1]===t[1])return!0;return!1},submitAttack:function(t){if(void 0!==t&&this.checkAttackHist(t))return console.log("invalid guess"),"invalid guess";if(void 0===t){let e;do{e=n()}while(this.checkAttackHist(e));t=e}const e=this.oponentGameboard.receiveAttack(t);return this.attackHistory.push(t),e},announceAsWinner:function(){const t=`${this.name} has won the game!`;return console.log(t),t}});function s(t,e){console.log(t);const n=document.querySelectorAll(".all-p-ships"),o=document.querySelectorAll(".all-c-ships");if(void 0===t&&void 0===e)return n.forEach((t=>{t.style.textDecoration="none",t.style.opacity="1"})),void o.forEach((t=>{t.style.textDecoration="none",t.style.opacity="1"}));"CPU"===e?n.forEach((e=>{("final"===t||e.textContent===t.name)&&(e.style.textDecoration="line-through",e.style.opacity="0.25")})):o.forEach((e=>{("final"===t||e.textContent===t.name)&&(e.style.textDecoration="line-through",e.style.opacity="0.25")}))}function r(t,e,n){const o=document.querySelectorAll(".c-grid"),s=document.querySelectorAll(".p-grid");"user"===e?void 0!==n?o.forEach((t=>{const e=JSON.parse(t.id);n.forEach((n=>{n.location.forEach((n=>{n[0]===e[0]&&n[1]===e[1]&&(t.textContent="X")}))}))})):o.forEach((e=>{const n=JSON.parse(e.id);t.location.forEach((t=>{n[0]===t[0]&&n[1]===t[1]&&(e.textContent="X")}))})):void 0!==n?s.forEach((t=>{const e=JSON.parse(t.id);n.forEach((n=>{n.location.forEach((n=>{n[0]===e[0]&&n[1]===e[1]&&(t.textContent="X")}))}))})):s.forEach((e=>{const n=JSON.parse(e.id);t.location.forEach((t=>{n[0]===t[0]&&n[1]===t[1]&&(e.textContent="X")}))}))}function i(t,e){const n=document.createElement("div");return n.className=t,n.id=e,"undefined"===n.id&&(n.id=t),n}function a(t){const e=[];for(let t=0;t<10;t++)for(let n=0;n<10;n++){let o=[t,n];e.push(o)}return e[t]}!function(){const t=document.querySelector(".application"),e=function(){const t=i("header"),e=i("title");return e.textContent="Battleship Game",t.appendChild(e),t}();t.appendChild(e);const n=function(){const t=i("body"),e=i("body-title");e.textContent="Provide your name to start the game.";const n=i("game-inputs"),o=i("player-name-title");o.textContent="Your Name:";const s=function(t,e,n,o){const s=document.createElement("input");return s.type="text",s.id="name",s.placeholder="Enter your name captain!",s}(),r=function(t,e){const n=document.createElement("button");return n.className="start-game",n.textContent="Start Game",n}();n.append(o,s,r);const c=i("board-section"),l=i("board-titles");l.classList.add("p-board-titles");const h=i("player-board-title");h.textContent="Your Fleet",l.appendChild(h);const u=i("move-result");u.classList.add("p-move-result"),u.textContent="⛴️",l.appendChild(u);const d=i("board-div");d.classList.add("player-board");for(let t=0;t<100;t++){const e=i("grid-square",JSON.stringify(a(t)));e.classList.add("p-grid"),d.appendChild(e)}const p=i("board-titles");p.classList.add("c-board-titles");const f=i("cpu-board-title");f.textContent="Sink Enemy Ships!",p.appendChild(f);const m=i("move-result");m.classList.add("c-move-result"),m.textContent="⛴️",p.appendChild(m);const C=i("board-div");C.classList.add("cpu-board");for(let t=0;t<100;t++){const e=i("grid-square",JSON.stringify(a(t)));e.classList.add("c-grid"),C.appendChild(e)}c.append(l,d,p,C);const y=["Carrier","Battleship","Destroyer","Submarine","Patrol Boat"],b=i("ship-lists"),g=i("player-list"),k=i("ships-title");k.textContent="Your Ships Left";const S=i("p-ship-list");for(let t=0;t<y.length;t++){const e=i(`${y[t]}`);e.classList.add("all-p-ships"),e.textContent=`${y[t]}`,S.appendChild(e)}const v=i("cpu-list"),x=i("ships-title");x.textContent="CPU Ships Left";const E=i("c-ship-list");for(let t=0;t<y.length;t++){const e=i(`${y[t]}`);e.classList.add("all-c-ships"),e.textContent=`${y[t]}`,E.appendChild(e)}return g.append(k,S),v.append(x,E),b.append(g,v),t.appendChild(e),t.append(n,c,b),t}();t.appendChild(n);const o=function(){const t=i("footer"),e=i("title"),n=document.createElement("span");n.textContent="Created by ";const o=document.createElement("a");return o.href="https://github.com/crashtestjustin/battleship-game",o.textContent="Justin Elliott",e.append(n,o),t.appendChild(e),t}();t.appendChild(o)}(),function(){const t=document.querySelector(".body-title"),e=document.querySelector(".start-game"),n=document.querySelectorAll(".grid-square"),i=document.querySelectorAll(".p-grid"),a=document.querySelectorAll(".c-grid"),c=document.querySelector(".p-move-result"),l=document.querySelector(".c-move-result");let h,u,d,p=!0;function f(e){return t.textContent=`Awaiting ${d.name}'s attack.`,h=u.submitAttack(JSON.parse(e.target.id)),"invalid guess"===h?h:(5===h&&(e.target.style.backgroundColor="red",console.log("Game Over"),p=!1),Array.isArray(h)&&(e.target.style.backgroundColor="#b3b3cc",l.textContent="You Missed! ❌",console.log("MISS")),Array.isArray(h)||5===h||(e.target.style.backgroundColor="red",console.log(h),h.sunk?(l.textContent=`You sunk their ${h.name}!`,s(h,"user"),r(h,"user")):l.textContent="You hit a ship! 🫡"),p?void setTimeout((function(){if(h=d.submitAttack(),"invalid guess"===h)return h;if(5===h){let e=d.attackHistory.slice(-1);return i.forEach((t=>{let n=JSON.parse(t.id);n[0]===e[0][0]&&n[1]===e[0][1]&&(t.style.backgroundColor="red")})),console.log("Game Over"),t.textContent=d.announceAsWinner(),s("final","CPU"),r(h,"CPU",d.oponentGameboard.shipObjects),c.textContent="(You = LOSER)",l.textContent="(CPU = WINNER!)",p=!1,void a.forEach((t=>{t.removeEventListener("click",f)}))}if(Array.isArray(h)&&(i.forEach((t=>{let e=JSON.parse(t.id);h[0]===e[0]&&h[1]===e[1]&&(t.style.backgroundColor="#b3b3cc")})),c.textContent="CPU Missed! ❌",console.log("MISS")),!Array.isArray(h)&&5!==h){let t=d.attackHistory.slice(-1);i.forEach((e=>{let n=JSON.parse(e.id);n[0]===t[0][0]&&n[1]===t[0][1]&&(e.style.backgroundColor="red")})),console.log(h),h.sunk?(c.textContent=`CPU has sunk your ${h.name}! 🥲🪦`,s(h,"CPU"),r(h,"CPU")):c.textContent="CPU has hit a ship! 😬"}t.textContent=`Awaiting ${u.name}'s attack.`}),500):(t.textContent=u.announceAsWinner(),s("final","user"),r(h,"user",u.oponentGameboard.shipObjects),l.textContent="(CPU = LOSER)",c.textContent="(You = WINNER!)",void a.forEach((t=>{t.removeEventListener("click",f)}))))}e.addEventListener("click",(e=>{p=!0,n.forEach((t=>{t.style.backgroundColor="transparent",t.textContent=""})),s(),u=o(document.querySelector("#name").value),d=o("CPU"),u.oponentGameboard.placeShipsRandom(),d.oponentGameboard.placeShipsRandom(),d.oponentGameboard.boardArray.forEach((t=>{t.forEach((t=>{for(let e=0;e<i.length;e++){const n=JSON.parse(i[e].id);t[0]===n[0]&&t[1]===n[1]&&(i[e].style.backgroundColor="#7faec9")}}))})),t.textContent=`Awaiting ${u.name}'s attack.`,a.forEach((t=>{t.removeEventListener("click",f)})),a.forEach((t=>{t.addEventListener("click",f)}))}))}()})();