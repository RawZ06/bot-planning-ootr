import express from 'express';
import CSV from 'csv-string';
import {parseCCDate, parseS6Date} from "./date.js";
import fetch from 'node-fetch';

const app = express();

const CC_DOC_URL = "https://docs.google.com/spreadsheets/d/1ZDc5fE6weTJkXwdBkcFXqt05rQJEi9BQOGy8SE8cIes/export?format=csv&gid=0";
const S6_DOC_URL = "https://docs.google.com/spreadsheets/d/1BqSVJXHSrC_INEVIPRLTQa2qdFvAICEltjWYJo49CTg/export?format=csv&gid=0"

app.get('/cc', (req, res) => {
    fetch(CC_DOC_URL).then(res => res.text()).then(text => {
        const data = CSV.parse(text).slice(1);
        const value = data.filter(a => parseCCDate(a[3]) > new Date()).sort((a, b) => {
            return parseCCDate(a[3]) - parseCCDate(b[3]);
        });
        res.send(`Prochain match de CC: ${value[0][1]}, ${parseCCDate(value[0][3]).toLocaleString('FR-fr')} sur la chaine de ${value[0][4]} (${value[0][5]})`);
    });
});

app.get('/s6', (req, res) => {
    fetch(S6_DOC_URL).then(res => res.text()).then(text => {
        const data = CSV.parse(text).slice(1);
        const value = data.filter(a => parseS6Date(a[3]) > new Date()).sort((a, b) => {
            return parseS6Date(a[3]) - parseS6Date(b[3]);
        });
        res.send(`Prochain match de S6: ${value[0][0]}, ${parseS6Date(value[0][3]).toLocaleString('FR-fr')} sur la chaine de ${value[0][5]} (${value[0][4]})`);
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});