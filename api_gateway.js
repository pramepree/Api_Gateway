const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // เพิ่ม middleware สำหรับการตั้งค่า CORS

// เส้นทางสำหรับรับคำขอ GET ที่ /api1
app.get('/get_NameMember', async (req, res) => {
  try {
    // ส่งคำขอไปยัง API ภายนอก
    //const response = await axios.get('https://servermongodb-angular.onrender.com/articles');
    const response = await axios.get('http://localhost:3000/get_NameMember');
    // ส่งค่าตอบกลับจาก API ภายนอกมายังผู้เรียกใช้
    res.json(response.data);
  } catch (error) {
    // จัดการข้อผิดพลาดและส่งข้อความกลับไปยังผู้เรียกใช้
    res.status(500).send('Failed to fetch data from API 1');
  }
});

// เส้นทางสำหรับรับคำขอ POST ที่ /api1
app.post('/api1/post', async (req, res) => {
  try {
    // ส่งคำขอไปยัง API ภายนอก
    const response = await axios.post('https://servermongodb-angular.onrender.com/articles', req.body);
    
    // ส่งค่าตอบกลับจาก API ภายนอกมายังผู้เรียกใช้
    res.status(response.status).json(response.data);
    console.log(response.data);
  } catch (error) {
    // จัดการข้อผิดพลาดและส่งข้อความกลับไปยังผู้เรียกใช้
    res.status(500).send('Failed to post data to API 1');
  }
});

app.listen(5001, () => {
  console.log('API Gateway is running on port 5001');
});
