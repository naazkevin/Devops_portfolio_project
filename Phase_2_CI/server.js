const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>🚀 DevOps Portfolio Pipeline is fully automated and tested with Gitops auto upgrade!</h1>');
});

app.listen(PORT, () => {
    console.log(`Application running locally on port ${PORT}`);
});
