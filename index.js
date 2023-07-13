
const express= require("express");

require('dotenv').config();

const bodyParser = require("body-parser");
const cors = require("cors");
const PORT=process.env.PORT || 8000;
const app=express();
app.use(bodyParser.json());
app.use(cors());


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-qOZQ0WDLKd4Ab1P1dYs5owZv",
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);



app.post("/",async (req,res)=>{
    const {message}=req.body;
    //console.log(req.body);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "Debug the code,provide feedback on style,best practices and potential improvement "}, {role: "user", content: message}],
      });
      //console.log(completion.data.choices[0].message);

      res.json({
        data: completion.data.choices[0].message.content  
      })
});

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}.`);
});



