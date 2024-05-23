const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/camping', async (req, res) => {
  try {
    const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/basedList', {
      params: {
        numOfRows: req.query.numOfRows || 10,
        pageNo: req.query.pageNo || 1,
        MobileOS: req.query.MobileOS || 'WIN',
        MobileApp: req.query.MobileApp || '22',
        serviceKey: req.query.serviceKey || 'lzGvqDf5E5TR4COdKFCVs/8cc/NaPzSTIRWyXjR2AlJAJMn0O0aKlspa8XwDBDYcOPpWuV1v7ZLRCyj9mgNkqw==',
        _type: req.query._type || 'json',
      },
    });
    res.json(response.data.response.body.items.item);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
