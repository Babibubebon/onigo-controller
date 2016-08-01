import eventPublisher from "./publisher";

function ResultScreen() {
  this.screenElement = document.getElementById("result-screen");
  this.rankingElement = document.getElementById("ranking");
  this.oniElement = document.getElementById("result-oni");

  eventPublisher.subscribe("rankingState", rankingState => {
    if (rankingState === "show") {
      this.screenElement.classList.add("screen-active");
    } else if (rankingState === "hide") {
      this.screenElement.classList.remove("screen-active");
    }
  });

  eventPublisher.subscribe("ranking", rankingDetail => {
    this.rankingElement.innerHTML = "";
    rankingDetail.ranking.forEach((player, index) => {
      const rank = !player.isTie ? index + 1 : (function() {
        for (let i = index - 1; i >= 0; i--) {
          if (!rankingDetail.ranking[i].isTie) {
            return i + 1;
          }
        }
        return -1;
      })();
      const playerListItem = document.createElement("li");
      playerListItem.dataset.rank = rank;
      playerListItem.value = rank;
      playerListItem.textContent = player.name;
      const hpElement = document.createElement("span");
      hpElement.textContent = player.states.hp;
      hpElement.classList.add("ranking-hp");
      playerListItem.appendChild(hpElement);
      const colorElement = document.createElement("span");
      colorElement.textContent = player.states.color;
      colorElement.style.backgroundColor = player.states.color;
      playerListItem.appendChild(colorElement);
      this.rankingElement.appendChild(playerListItem);
    });
    this.oniElement.innerHTML = "";
    Object.keys(rankingDetail.onis).forEach(name => {
      const oniListItem = document.createElement("li");
      oniListItem.textContent = name;
      this.oniElement.appendChild(oniListItem);
    });
  });
}

export default ResultScreen;