
import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("http://127.0.0.1:5004/api/coins")  // Flask backend
        .then((res) => setCoins(res.data))
        .catch((err) => console.log(err));
    }, 2000); // 2s
    return () => clearInterval(intervalId);
  }, []);
  
  const filteredCoins = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a[sortKey] - b[sortKey];
      else return b[sortKey] - a[sortKey];
    });

  const handleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">
          Crypto Market Price (Top 20 Cryptocurrencies)
        </h1>

        <input
          type="text"
          placeholder="Search by Coin Name..."
          className="mb-1 w-full md:w-3/4 p-4 rounded-md bg-gray-800 border border-gray-700 text-white "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-md overflow-hidden border-2 solid align-center">
            <thead className="text-md border-2 solid">
              <tr className="bg-gray-800 text-sm uppercase text-gray-400 border-2 solid">
                <th className="p-4 text-center">No</th>
                <th className="p-4 text-center">Coin Name</th>
                <th
                  className="p-4 text-center cursor-pointer"
                  onClick={() => handleSort("current_price")}
                >
                  Price (USD) {sortKey === "current_price" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="p-4 text-center cursor-pointer"
                  onClick={() => handleSort("market_cap")}
                >
                  Market Cap {sortKey === "market_cap" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th className="p-4 text-center cursor-pointer" onClick={() => handleSort("total_volume")}>
                  24h Trading Change {sortKey === "total_volume" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin, index) => (
                <tr
                  key={coin.id}
                  className="border-t border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name}
                  </td>
                  <td className="p-4">${coin.current_price.toLocaleString()}</td>
                  <td className="p-4">${coin.market_cap.toLocaleString()}</td>
                  <td
                    className={`p-4 font-semibold ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
