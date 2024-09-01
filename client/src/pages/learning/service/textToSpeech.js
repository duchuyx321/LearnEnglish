export const textToSpeech = (text) => {
    return new Promise((resolve, reject) => {
        if (!text) {
            alert('Vui lòng nhập văn bản');
            reject('No text provided');
            return;
        }

        // Tạo đối tượng SpeechSynthesisUtterance
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en'; // Thay đổi ngôn ngữ nếu cần

        // Tạo một audio context để ghi âm
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const destination = audioContext.createMediaStreamDestination();
        const mediaStream = destination.stream;

        // Sử dụng MediaStream để tạo URL âm thanh
        const mediaRecorder = new MediaRecorder(mediaStream);
        let chunks = [];

        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            const audioURL = URL.createObjectURL(blob);
            chunks = [];
            resolve(audioURL); // Trả về URL sau khi ghi âm xong
        };

        // Phát âm thanh và ghi âm
        const source = audioContext.createMediaStreamSource(mediaStream);
        source.connect(destination);
        speechSynthesis.speak(speech);
        mediaRecorder.start();

        // Dừng ghi âm sau khi phát xong
        speech.onend = () => {
            mediaRecorder.stop();
        };

        // Xử lý lỗi trong quá trình tạo âm thanh
        speech.onerror = (event) => {
            reject(event.error);
        };
    });
};
