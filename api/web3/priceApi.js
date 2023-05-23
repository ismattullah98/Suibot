const axios = require('axios');
const Web3 = require('web3');

// Inisialisasi provider Web3
const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-project-id');

// Nilai Wei yang ingin dikonversi
const weiValue = '100000000000000000'; // Contoh: 0.0001 Ether

// Konversi Wei menjadi Ether (ETH)
const ethValue = web3.utils.fromWei(weiValue, 'ether');

let getPrice = (data,callback)=>{
    let data ={
        coin: data.coin,
        currency: data.currency? data.currency:'usd',

    }
// Ambil data harga Ethereum (ETH) dari CoinGecko API (contoh)
axios.get('https://api.coingecko.com/api/v3/simple/price?ids='+data.coin+'&vs_currencies='+data.currency+'')
  .then(response => {
    const coinPriceInUSD = response.data.ethereum.usd;

    // Hitung estimasi nilai dalam USD
    const estimatedValueInUSD = parseFloat(ethValue) * ethPriceInUSD;

    // Jika nilai lebih besar atau sama dengan 0.0001, hilangkan nol di belakangnya
    const formattedEthValue = parseFloat(ethValue) >= 0.0001 ? parseFloat(ethValue).toFixed(6).replace(/\.?0*$/, '') : parseFloat(ethValue);

    // Tampilkan hasil konversi dan estimasi nilai dalam USD
    console.log('Nilai Wei:', weiValue);
    console.log('Nilai Ether:', formattedEthValue);
    console.log('Estimasi Nilai (USD):', estimatedValueInUSD);
  })
  .catch(error => {
    console.error('Gagal mengambil data harga:', error);
  });
}
