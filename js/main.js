const url = "https://api.coinmarketcap.com/v1/ticker/?limit=2000";
let dataArray = [];
let stringItem = "";

// add EventListener

const assignEvent = {
  data: [],
  filterCoins(data, inputValue) {
    let searchInput = document.getElementById("filterInput").value;
    console.log("form value ", inputValue);
    let filteredCoins = this.data.filter(function(item) {
      console.log(item.name.toLowerCase());
      return item.name.toLowerCase().includes(searchInput);
    });
    console.log("This is filtered Coins", filteredCoins);
    document.getElementById("coinsList").innerHTML = "";
    render(filteredCoins);
  },
  sortByName(data) {
    let sortedByName = this.data.sort(function(a, b) {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    console.log("sorted by name", sortedByName);
    document.getElementById("coinsList").innerHTML = "";
    render(sortedByName);
  },
  sortByPrice(data) {
    let sortedByPrice = this.data.slice(0).sort(function(a, b) {
      return a.price_usd - b.price_usd;
    });
    document.getElementById("coinsList").innerHTML = "";
    render(sortedByPrice);
  },
  sortByRank(data) {
    let sortedByRank = this.data.sort(function(a, b) {
      return a.rank - b.rank;
    });
    document.getElementById("coinsList").innerHTML = "";
    render(sortedByRank);
  }
};

const render = items => {
  console.log("day la items render", items);
  items.forEach(item => {
    renderItem(item);
  });
  document.getElementById("coinsList").innerHTML = stringItem;
  stringItem = "";
};

const renderItem = data => {
  let percentData = parseFloat(data.percent_change_24h);
  let redOrGreen = percentData >= 0 ? "green-percent" : "red-percent";
  stringItem += `

  <div class="coin-item hvr-pulse">
    <div class="coinName">
      ${data.name}
    </div>
    <div class="coinSymbol">
      ${data.symbol}
    </div>
    <div class="coinRank">
      ${data.rank}
    </div>
    <div class="coinPrice">
      ${data.price_usd}
    </div>

    <div class="${redOrGreen}">
      ${data.percent_change_24h}%
    </div>


  </div>
  `;
};

fetch(url)
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(myJson) {
    dataArray = myJson;
    console.log(myJson);
    render(dataArray);
    console.log("Finish running forEach");
    assignEvent.data = myJson;
  });
