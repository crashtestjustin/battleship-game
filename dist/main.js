(()=>{"use strict";const t=t=>({name:t,length:(()=>{switch(t){case"Carrier":return 5;case"Battleship":return 4;case"Destroyer":case"Submarine":return 3;case"Patrol Boat":return 2;default:return 0}})(),hitCount:0,sunk:!1,hit:function(){this.hitCount++,this.isSunk()},isSunk:function(){this.hitCount>=this.length&&(this.sunk=!0)}}),e=()=>({boardArray:[],missedGuesses:[],hitGuesses:[],shipsLeft:["Carrier","Battleship","Submarine","Destroyer","Patrol Boat"],shipsSunk:0,shipObjects:[],placeShipsRandom:function(){for(let e=0;e<this.shipsLeft.length;e++){let n=Math.random()>=.5,o=t(this.shipsLeft[e]),r=this.placeShipRecursive(o,n);this.boardArray.push(r),this.shipObjects.push(o),o.location=r}},placeShipRecursive:function(t,e){let o=n(),r=this.checkValidPlacement(t,o,e);return r?this.checkForShipOverlap(r)?this.placeShipRecursive(t,e):r:this.placeShipRecursive(t,e)},checkValidPlacement:function(t,e,n){let o=[];if(o.push(e),n&&e[0]+t.length>10)return!1;if(!n&&e[1]+t.length>10)return!1;for(let r=1;r<t.length;r++){let t;if(t=n?[e[0]+r,e[1]]:[e[0],e[1]+r],this.compareArrays(t))return!1;o.push(t)}return o},checkForShipOverlap:function(t){for(let e=0;e<this.shipObjects.length;e++){const n=this.shipObjects[e].location;for(let e=0;e<t.length;e++){const o=t[e];for(let t=0;t<n.length;t++){const e=n[t];if(e[0]===o[0]&&e[1]===o[1])return!0}}}return!1},compareArrays:function(t,e){let n=!1;if(void 0===e)for(let e=0;e<this.boardArray.length;e++){const o=this.boardArray[e];for(let e=0;e<o.length;e++)if(o[e][0]===t[0]&&o[e][1]===t[1]){n=!0;break}if(n)break}else for(let o=0;o<t.length;o++)if(t[o][0]===e[0]&&t[o][1]===e[1]){n=!0;break}return n},checkForAllSunk:function(){let t=0;for(let e=0;e<this.shipObjects.length;e++)this.shipObjects[e].sunk&&t++;return this.shipsSunk=t,t},receiveAttack:function(t){let e=null;for(let n=0;n<this.shipObjects.length;n++){const o=this.shipObjects[n].location;if(this.compareArrays(o,t)){if(this.shipObjects[n].hit(),this.hitGuesses.push(t),e=this.shipObjects[n],e.sunk){this.shipsLeft=[];for(let t=0;t<this.shipObjects.length;t++)this.shipObjects[t].sunk||this.shipsLeft.push(this.shipObjects[t].name)}break}}if(null!==e){const t=this.checkForAllSunk();return 5===t?t:e}return this.missedGuesses.push(t),t}});function n(){return[parseInt(10*Math.random()),parseInt(10*Math.random())]}const o=t=>({name:t,CPU:"CPU"===t,oponentGameboard:e(),attackHistory:[],checkAttackHist:function(t){let e=this.attackHistory;for(let n of e)if(n[0]===t[0]&&n[1]===t[1])return!0;return!1},submitAttack:function(t){if(void 0!==t&&this.checkAttackHist(t))return console.log("invalid guess"),"invalid guess";if(void 0===t){let e;do{e=n()}while(this.checkAttackHist(e));t=e}const e=this.oponentGameboard.receiveAttack(t);return this.attackHistory.push(t),e}});function r(t,e){const n=document.createElement("div");return n.className=t,n.id=e,"undefined"===n.id&&(n.id=t),n}function s(t){const e=[];for(let t=0;t<10;t++)for(let n=0;n<10;n++){let o=[t,n];e.push(o)}return e[t]}document.querySelector(".body-title"),document.querySelector(".start-game"),document.querySelectorAll(".grid-square"),document.querySelectorAll(".p-grid"),document.querySelectorAll(".c-grid"),function(){const t=document.querySelector(".application"),e=function(){const t=r("header"),e=r("title");return e.textContent="Battleship Game",t.appendChild(e),t}();t.appendChild(e);const n=function(){const t=r("body"),e=r("body-title");e.textContent="Provide your name to start the game.";const n=r("game-inputs"),o=r("player-name-title");o.textContent="Your Name:";const i=function(t,e,n,o){const r=document.createElement("input");return r.type="text",r.id="name",r.placeholder="Enter your name captain!",r}(),a=function(t,e){const n=document.createElement("button");return n.className="start-game",n.textContent="Start Game",n}();n.append(o,i,a);const c=r("player-board-title");c.textContent="Your Ships";const l=r("board-div");l.classList.add("player-board");for(let t=0;t<100;t++){const e=r("grid-square",JSON.stringify(s(t)));e.classList.add("p-grid"),l.appendChild(e)}const u=r("cpu-board-title");u.textContent="Sink the Enemy Ships";const h=r("board-div");h.classList.add("cpu-board");for(let t=0;t<100;t++){const e=r("grid-square",JSON.stringify(s(t)));e.classList.add("c-grid"),h.appendChild(e)}return t.appendChild(e),t.append(n,c,l,u,h),t}();t.appendChild(n);const o=function(){const t=r("footer"),e=r("title");return e.textContent="Footer",t.appendChild(e),t}();t.appendChild(o)}(),function(){const t=document.querySelector(".body-title"),e=document.querySelector(".start-game"),n=document.querySelectorAll(".grid-square"),r=document.querySelectorAll(".p-grid"),s=document.querySelectorAll(".c-grid");e.addEventListener("click",(e=>{n.forEach((t=>{t.style.backgroundColor="transparent"}));const i=o(document.querySelector("#name").value),a=o("CPU");i.oponentGameboard.placeShipsRandom(),a.oponentGameboard.placeShipsRandom(),a.oponentGameboard.boardArray.forEach((t=>{t.forEach((t=>{for(let e=0;e<r.length;e++){const n=JSON.parse(r[e].id);t[0]===n[0]&&t[1]===n[1]&&(r[e].style.backgroundColor="#7faec9")}}))})),t.textContent=`Awaiting ${i.name}'s attack.`,console.log(i.oponentGameboard.boardArray);for(let t=0;t<i.oponentGameboard.shipObjects.length;t++)console.log(i.oponentGameboard.shipObjects[t].location);let c;s.forEach((e=>{e.addEventListener("click",(n=>{if(c=i.submitAttack(JSON.parse(n.target.id)),"invalid guess"===c)return c;5===c&&(e.style.backgroundColor="red",console.log("Game Over")),Array.isArray(c)&&(e.style.backgroundColor="#b3b3cc",console.log("MISS")),Array.isArray(c)||(e.style.backgroundColor="red",console.log(c.name),console.log(c.hitCount),console.log(c.sunk)),t.textContent=`Awaiting ${a.name}'s attack.`,setTimeout((function(){if(c=a.submitAttack(),"invalid guess"===c)return c;if(5===c&&(coor.style.backgroundColor="red",console.log("Game Over")),Array.isArray(c)&&(r.forEach((t=>{let e=JSON.parse(t.id);c[0]===e[0]&&c[1]===e[1]&&(t.style.backgroundColor="#b3b3cc")})),console.log("MISS")),!Array.isArray(c)){let t=a.attackHistory.slice(-1);r.forEach((e=>{let n=JSON.parse(e.id);n[0]===t[0][0]&&n[1]===t[0][1]&&(e.style.backgroundColor="red")})),console.log(c),console.log(a.attackHistory),console.log(c.name),console.log(c.hitCount),console.log(c.sunk)}}),2e3),t.textContent=`Awaiting ${i.name}'s attack.`}))}))}))}()})();