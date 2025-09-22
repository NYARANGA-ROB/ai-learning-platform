"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const youtube_caption_extractor_1 = require("youtube-caption-extractor");
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/subtitles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoID, lang = 'en' } = req.query;
    if (typeof videoID !== 'string') {
        return res.status(400).json({ error: 'Invalid videoID parameter' });
    }
    try {
        const subtitles = yield (0, youtube_caption_extractor_1.getSubtitles)({ videoID, lang });
        const subtitleText = subtitles.map((subtitle) => subtitle.text).join(' ');
        res.status(200).json(subtitleText);
    }
    catch (error) {
        console.error('Error fetching subtitles:', error);
        res.status(500).json({ error: 'Failed to fetch subtitles' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
