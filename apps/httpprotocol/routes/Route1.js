import { Router } from "express";
import axios from "axios";

export const userRouter = Router();

userRouter.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim().length === 0) {
    return res.status(400).json({ reply: 'Please enter a valid message.' });
  }

  try {
    // Call the Flask API for model predictions
    const response = await axios.post('http://127.0.0.1:7000/predict', { message: userMessage });
    res.json({ reply: response.data.reply });
    console.log(`Response from Flask: ${response.data.reply}`);
  } catch (error) {
    res.status(500).json({ reply: 'Server-side problem, try again later.' });
    console.error('Error calling Flask API:', error.message);
  }
});


// import { Router } from "express";
// // import  {callapi} from "./callapi.js";
// import { getDatafromJson } from "./getDatafromJson.js";

// export const userRouter = Router();

// userRouter.post('/chat', async(req, res) => {
//   const userMessage = req.body.message;
//    if (!userMessage || userMessage.trim().length === 0) {
//     return res.status(400).json({ reply: 'Please enter a valid message.' });
//   }

//   // try {
//   //   const response = await callapi(userMessage);
//   //   res.json({reply : response})  
//   //   console.log(`response is ${response}`)  
//   // } catch (error) {
//   //   res.status(500).json({reply : error})
//   //   console.log(`catch ${error}`)
//   // }

//   try {
//     // temperoty data is fetched from data.json file instead of integrating external model.
//     const data = await getDatafromJson(userMessage);
//     res.json({reply : data})
//     console.log(`response is1 :${data}`);
//   } catch (error) {
//     res.status(500).json({reply : "sever side problem,Try again later"})
//     console.log(error)
//   }
// });


 