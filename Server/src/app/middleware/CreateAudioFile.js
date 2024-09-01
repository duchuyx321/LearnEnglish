const { generateAudio } = require('../../service/CreateAudio');

const CreateAudioFile = async (req, res, next) => {
    try {
        const fileNames = [];
        const { data } = req.body;
        await data.map((item) => {
            const word = item.word;
            const fileName = `${word}.mp3`;
            fileNames.push(fileName);
            generateAudio(word);
        });
        req.body.fileNames = fileNames;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = CreateAudioFile;
