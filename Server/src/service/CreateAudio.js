const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
const path = require('path');

require('dotenv').config();
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
process.env.GOOGLE_APPLICATION_CREDENTIALS;

async function generateAudio(text, outputFileName) {
    try {
        // Construct the request
        const request = {
            input: { text: text },
            // Select the language and SSML voice gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };
        // Sử dụng đường dẫn tương đối cho thư mục đầu ra
        const outputDir = path.join(__dirname, '..', 'public', 'audio');

        // Kiểm tra nếu thư mục tồn tại, nếu không thì tạo mới
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(`Đã tạo thư mục: ${outputDir}`);
        }

        // Định nghĩa đường dẫn đầy đủ cho tệp đầu ra
        const outputPath = path.join(outputDir, outputFileName);

        const [response] = await client.synthesizeSpeech(request);
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(outputPath, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${outputFileName}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { generateAudio };
