const slugify = require('slugify'); // chuyển thành slug
const { generateAudio } = require('../../service/CreateAudio');

const CreateAudioFile = async (req, res, next) => {
    try {
        const fileNames = [];
        const { data } = req.body;
        // Sử dụng Promise.all để chờ tất cả các Promise từ generateAudio hoàn thành
        await Promise.all(
            data.map(async (item) => {
                const word = item.word;
                const fileName = `${slugify(word, {
                    lower: true,
                    strict: true,
                })}.mp3`;
                fileNames.push(fileName);
                // Đảm bảo generateAudio trả về một Promise
                await generateAudio(word, fileName);
            }),
        );

        req.body.fileNames = fileNames;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = CreateAudioFile;
