const mecab = require('mecabaas-client');

mecab.parse('メロンパンを食べました。').then(
  function (response) {
    console.log(response);
  },
  function (error) {
    console.log(error);
  },
);

mecab.wakachi('メロンパンを食べました。').then(
  function (response) {
    console.log(response);
  },
  function (error) {
    console.log(error);
  },
);
