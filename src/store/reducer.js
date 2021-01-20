import { RiQqFill } from "react-icons/ri";

import { food3 } from "contract/food3.js";

const Web3 = require("web3");
const quorumjs = require("quorum-js");

var web3 = new Web3("http://foodchain-node1.etherhost.org:22001");
quorumjs.extend(web3);

const CONTRACT_ADDRESS = "0xA4fafbE0ea4823e262b4916EF93CC5A6306A5DBc";
const ACCOUNT_ADDRESS = "0x7CbEb723CA0788af6549110fb2a9816ED0BAa1a6";
const PRIVATE_KEY =
  "0xab09158d9a817633c28c74b6e6c1bf34c26ffadc1a961870beaeef38b0753495";
const CONTRACT_ABI = food3;
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const initialState = {
  logno: 400000,
  date: "",
  foodname: "",
  org: "",
  starttime: "",
  endtime: "",
  images: [],
  sections: [],
  archived: [],
};

const chainLogFood = async (action, logno, date) => {
  var encoded_data = contract.methods
    .FoodLog(logno, "0x00", action.foodname, action.org, date)
    .encodeABI();

  const accountNonce =
    "0x" + (web3.eth.getTransactionCount(ACCOUNT_ADDRESS) + 1).toString(16);

  var tx = {
    nouce: accountNonce,
    from: ACCOUNT_ADDRESS,
    to: CONTRACT_ADDRESS,
    gas: 238960, //隨便設定的，只要大於下限即可
    data: encoded_data,
  };

  web3.eth.accounts
    .signTransaction(tx, PRIVATE_KEY)
    .then((signed) => {
      web3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .on("receipt", console.log)
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const chainLogImage = async (state, action) => {
  var encoded_data = contract.methods
    .FoodLogImage(state.logno, action.image, "0x00")
    .encodeABI();

  const accountNonce =
    "0x" + (web3.eth.getTransactionCount(ACCOUNT_ADDRESS) + 1).toString(16);

  var tx = {
    nouce: accountNonce,
    from: ACCOUNT_ADDRESS,
    to: CONTRACT_ADDRESS,
    gas: 238960, //隨便設定的，只要大於下限即可
    data: encoded_data,
  };

  web3.eth.accounts
    .signTransaction(tx, PRIVATE_KEY)
    .then((signed) => {
      web3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .on("receipt", console.log)
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const chainLogSection = async (state, action, endtime) => {
  var encoded_data = contract.methods
    .FoodLogSection(state.logno, state.sectionname, state.starttime, endtime)
    .encodeABI();

  console.log(encoded_data);

  const accountNonce =
    "0x" + (web3.eth.getTransactionCount(ACCOUNT_ADDRESS) + 1).toString(16);

  var tx = {
    nouce: accountNonce,
    from: ACCOUNT_ADDRESS,
    to: CONTRACT_ADDRESS,
    gas: 238960, //隨便設定的，只要大於下限即可
    data: encoded_data,
  };

  web3.eth.accounts
    .signTransaction(tx, PRIVATE_KEY)
    .then((signed) => {
      web3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .on("receipt", console.log)
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const reducer = (state = initialState, action) => {
  if (!state.sections) {
    state.sections = [];
  }
  if (!state.images) {
    state.images = [];
  }
  if (!state.archived) {
    state.archived = [];
  }

  switch (action.type) {
    case "LOGFOOD":
      const date = new Date().toLocaleDateString();

      chainLogFood(action, state.logno, date);
      return {
        ...state,
        foodname: action.foodname,
        org: action.org,
        date: date,
      };
    case "LOGSECTION":
      const endtime = new Date().toLocaleString();
      chainLogSection(state, action, endtime);
      return {
        ...state,
        starttime: "",
        sectionname: "",
        images: [],
        sections: state.sections.concat({
          sectionname: state.sectionname,
          starttime: state.starttime,
          endtime: endtime,
          images: state.images,
        }),
      };

    case "LOGIMAGE":
      chainLogImage(state, action);
      return {
        ...state,
        images: state.images.concat(action.image),
      };

    case "LOGSTARTTIME":
      return {
        ...state,
        starttime: action.starttime,
        sectionname: action.sectionname,
      };
    case "FINISHLOGGING":
      return {
        ...state,
        archived: state.archived.concat({
          logno: state.logno,
          date: state.date,
          foodname: state.foodname,
          org: state.org,
          sections: state.sections,
        }),
        logno: state.logno + 1,
        date: "",
        foodname: "",
        org: "",
        starttime: "",
        endtime: "",
        images: [],
        sections: [],
      };
  }

  return state;
};

export default reducer;
