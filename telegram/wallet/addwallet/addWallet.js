let query = require('../../../database/query');
const { callbackWallet } = require('./callbackData');
const handleAdd = require('./handleAdd');

let addWallet = {
    evm: (db, bot, data) => {
        handleAdd.evm(db,bot,data);
    },
    //
    sui: (db,bot,data)=>{
        handleAdd.sui(db,bot,data);
    },
    venom: (db,bot,data)=>{
        handleAdd.venom(db,bot,data);
    },
}


module.exports = {addWallet};