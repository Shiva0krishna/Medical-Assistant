import { Router } from "express";
// import  {callapi} from "./callapi.js";
import { getDatafromJson } from "./getDatafromJson.js";

export const userRouter = Router();

userRouter.post('/chat', async(req, res) => {
  const userMessage = req.body.message;
   if (!userMessage || userMessage.trim().length === 0) {
    return res.status(400).json({ reply: 'Please enter a valid message.' });
  }

  // try {
  //   const response = await callapi(userMessage);
  //   res.json({reply : response})  
  //   console.log(`response is ${response}`)  
  // } catch (error) {
  //   res.status(500).json({reply : error})
  //   console.log(`catch ${error}`)
  // }

  try {
    // temperoty data is fetched from data.json file instead of integrating external model.
    const data = await getDatafromJson(userMessage);
    res.json({reply : data})
    console.log(`response is1 :${data}`);
  } catch (error) {
    res.status(500).json({reply : "sever side problem,Try again later"})
    console.log(error)
  }
});
 