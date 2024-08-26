// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const checkAudio = (req, res, next) => {
    try {
        const { word, definition, example } = req.body;
        const audioWord = quickStart(word, 'en');
        const audioDefinition = quickStart(definition, 'vi');
        const audioExample = quickStart(example, 'en');
        res.status(200).json({ audioWord, audioDefinition, audioExample });
    } catch (error) {
        return res
            .status(501)
            .json({ message: 'up load audio  is failed', error });
    }
};

async function quickStart(text, language) {
    // Construct the request
    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: language, ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    return writeFile;
}
module.exports = { checkAudio };
