(()=>{"use strict";const t=t=>({name:t,length:(()=>{switch(t){case"Carrier":return 5;case"Battleship":return 4;case"Destroyer":case"Submarine":return 3;case"Patrol Boat":return 2;default:return 0}})(),hitCount:0,sunk:!1,hit:function(){this.hitCount++,this.isSunk()},isSunk:function(){this.hitCount>=this.length&&(this.sunk=!0)}}),e=()=>({boardArray:[],missedGuesses:[],hitGuesses:[],shipsLeft:["Carrier","Battleship","Submarine","Destroyer","Patrol Boat"],shipsSunk:0,shipObjects:[],placeShipsRandom:function(){for(let e=0;e<this.shipsLeft.length;e++){let n=Math.random()>=.5,s=t(this.shipsLeft[e]),r=this.placeShipRecursive(s,n);this.boardArray.push(r),this.shipObjects.push(s),s.location=r}},placeShipRecursive:function(t,e){let s=n(),r=this.checkValidPlacement(t,s,e);return r?this.checkForShipOverlap(r)?this.placeShipRecursive(t,e):r:this.placeShipRecursive(t,e)},checkValidPlacement:function(t,e,n){let s=[];if(s.push(e),n&&e[0]+t.length>10)return!1;if(!n&&e[1]+t.length>10)return!1;for(let r=1;r<t.length;r++){let t;if(t=n?[e[0]+r,e[1]]:[e[0],e[1]+r],this.compareArrays(t))return!1;s.push(t)}return s},checkForShipOverlap:function(t){for(let e=0;e<this.shipObjects.length;e++){const n=this.shipObjects[e].location;for(let e=0;e<t.length;e++){const s=t[e];for(let t=0;t<n.length;t++){const e=n[t];if(e[0]===s[0]&&e[1]===s[1])return!0}}}return!1},compareArrays:function(t,e){let n=!1;if(void 0===e)for(let e=0;e<this.boardArray.length;e++){const s=this.boardArray[e];for(let e=0;e<s.length;e++)if(s[e][0]===t[0]&&s[e][1]===t[1]){n=!0;break}if(n)break}else for(let s=0;s<t.length;s++)if(t[s][0]===e[0]&&t[s][1]===e[1]){n=!0;break}return n},checkForAllSunk:function(){let t=0;for(let e=0;e<this.shipObjects.length;e++)this.shipObjects[e].sunk&&t++;return this.shipsSunk=t,t},receiveAttack:function(t){let e=null;for(let n=0;n<this.shipObjects.length;n++){const s=this.shipObjects[n].location;if(this.compareArrays(s,t)){if(this.shipObjects[n].hit(),this.hitGuesses.push(t),e=this.shipObjects[n],e.sunk){this.shipsLeft=[];for(let t=0;t<this.shipObjects.length;t++)this.shipObjects[t].sunk||this.shipsLeft.push(this.shipObjects[t].name)}break}}if(null!==e){const t=this.checkForAllSunk();return 5===t?t:e}return this.missedGuesses.push(t),t}});function n(){return[parseInt(10*Math.random()),parseInt(10*Math.random())]}const s=t=>({name:t,CPU:"CPU"===t,oponentGameboard:e(),attackHistory:[],checkAttackHist:function(t){let e=this.attackHistory;for(let n of e)if(n[0]===t[0]&&n[1]===t[1])return!0;return!1},submitAttack:function(t){if(void 0!==t&&this.checkAttackHist(t))return console.log("invalid guess"),"invalid guess";if(void 0===t){let e;do{e=n()}while(this.checkAttackHist(e));t=e}const e=this.oponentGameboard.receiveAttack(t);return this.attackHistory.push(t),e}});function r(t,e){const n=document.createElement("div");return n.className=t,n.id=e,"undefined"===n.id&&(n.id=t),n}function o(t){const e=[];for(let t=0;t<10;t++)for(let n=0;n<10;n++){let s=[t,n];e.push(s)}return e[t]}document.querySelector(".body-title"),document.querySelector(".start-game"),document.querySelectorAll(".grid-square"),document.querySelectorAll(".p-grid"),document.querySelectorAll(".c-grid"),function(){const t=document.querySelector(".application"),e=function(){const t=r("header"),e=r("title");return e.textContent="Battleship Game",t.appendChild(e),t}();t.appendChild(e);const n=function(){const t=r("body"),e=r("body-title");e.textContent="Provide your name to start the game.";const n=r("game-inputs"),s=r("player-name-title");s.textContent="Your Name:";const i=function(t,e,n,s){const r=document.createElement("input");return r.type="text",r.id="name",r.placeholder="Enter your name captain!",r}(),c=function(t,e){const n=document.createElement("button");return n.className="start-game",n.textContent="Start Game",n}();n.append(s,i,c);const a=r("player-board-title");a.textContent="Your Ships";const l=r("board-div");l.classList.add("player-board");for(let t=0;t<100;t++){const e=r("grid-square",JSON.stringify(o(t)));e.classList.add("p-grid"),l.appendChild(e)}const h=r("cpu-board-title");h.textContent="Sink the Enemy Ships";const u=r("board-div");u.classList.add("cpu-board");for(let t=0;t<100;t++){const e=r("grid-square",JSON.stringify(o(t)));e.classList.add("c-grid"),u.appendChild(e)}return t.appendChild(e),t.append(n,a,l,h,u),t}();t.appendChild(n);const s=function(){const t=r("footer"),e=r("title");return e.textContent="Footer",t.appendChild(e),t}();t.appendChild(s)}(),function(){const t=document.querySelector(".body-title"),e=document.querySelector(".start-game"),n=document.querySelectorAll(".grid-square"),r=document.querySelectorAll(".p-grid"),o=document.querySelectorAll(".c-grid");e.addEventListener("click",(e=>{n.forEach((t=>{t.style.backgroundColor="transparent"}));const i=s(document.querySelector("#name").value),c=s("CPU");i.oponentGameboard.placeShipsRandom(),c.oponentGameboard.placeShipsRandom(),c.oponentGameboard.boardArray.forEach((t=>{t.forEach((t=>{for(let e=0;e<r.length;e++){const n=JSON.parse(r[e].id);t[0]===n[0]&&t[1]===n[1]&&(r[e].style.backgroundColor="#7faec9")}}))})),t.textContent=`Awaiting ${i.name}'s attack.`,console.log("opponent ships"),console.log(`Ships Sunk: ${i.oponentGameboard.shipsSunk}`),console.log(i.oponentGameboard.boardArray);for(let t=0;t<i.oponentGameboard.shipObjects.length;t++)console.log(i.oponentGameboard.shipObjects[t].location);o.forEach((t=>{t.addEventListener("click",(t=>{const e=i.submitAttack(JSON.parse(t.target.id));console.log(e)}))}))}))}()})();