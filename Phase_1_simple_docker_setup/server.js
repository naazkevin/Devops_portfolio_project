const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>🚀 DevOps Portfolio Pipeline is automated!</h1>');
});

app.listen(PORT, () => {
    console.log(`Application running locally on port ${PORT}`);
});
