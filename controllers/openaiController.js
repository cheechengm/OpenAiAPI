const openai = require('../config/openaiConfig');

const generateMeta = async (req, res) => {
    const { title } = req.body

    
    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'user',
                content: `Come up with a description for a Youtube Video called${title}`
            }
        ],
        max_tokens: 100
    })
    console.log(description.choices[0].message.content);

    const tags = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'user',
                content: `Come up with a 10 keywords for a Youtube video  called ${title}`
            }
        ],
        max_tokens: 100
    })
    //console.log(descriptions.choices[0].message.content);

    res.status(200).json({
        description: description.choices[0].message.content,
        tags: tags.choices[0].message.content   
    })

    //console.log(tags.choices[0].message.content);
};
const generateImage = async (req, res) => {
    
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: req.body.prompt,
            n: 1,
            size: "1024x1024",
            //max_tokens: 50 // Set the max_tokens parameter to limit token usage
        });
        res.json({
            url: image.data
        })
      //  console.log(image.data);
    
}

module.exports = { generateMeta, generateImage }
