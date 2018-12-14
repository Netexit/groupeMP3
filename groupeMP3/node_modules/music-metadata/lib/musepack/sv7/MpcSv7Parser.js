'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const initDebug = require("debug");
const assert = require("assert");
const BasicParser_1 = require("../../common/BasicParser");
const SV7 = require("./StreamVersion7");
const APEv2Parser_1 = require("../../apev2/APEv2Parser");
const BitReader_1 = require("./BitReader");
const debug = initDebug('music-metadata:parser:musepack');
class MpcSv7Parser extends BasicParser_1.BasicParser {
    constructor() {
        super(...arguments);
        this.audioLength = 0;
    }
    parse() {
        return this.tokenizer.readToken(SV7.Header)
            .then(header => {
            assert.equal(header.signature, 'MP+', 'Magic number');
            debug(`stream-version=${header.streamMajorVersion}.${header.streamMinorVersion}`);
            this.metadata.setFormat('dataformat', 'Musepack, SV7');
            this.metadata.setFormat('sampleRate', header.sampleFrequency);
            const numberOfSamples = 1152 * (header.frameCount - 1) + header.lastFrameLength;
            this.metadata.setFormat('numberOfSamples', numberOfSamples);
            this.duration = numberOfSamples / header.sampleFrequency;
            this.metadata.setFormat('duration', this.duration);
            this.bitreader = new BitReader_1.BitReader(this.tokenizer);
            this.metadata.setFormat('numberOfChannels', header.midSideStereo || header.intensityStereo ? 2 : 1);
            return this.bitreader.read(8).then(version => {
                this.metadata.setFormat('encoder', (version / 100).toFixed(2));
                return this.skipAudioData(header.frameCount);
            });
        }).then(() => {
            debug(`End of audio stream, switching to APEv2, offset=${this.tokenizer.position}`);
            return APEv2Parser_1.APEv2Parser.parseTagHeader(this.metadata, this.tokenizer, this.options);
        });
    }
    skipAudioData(frameCount) {
        if (frameCount > 0) {
            return this.bitreader.read(20).then(frameLength => {
                this.audioLength += 20 + frameLength;
                return this.bitreader.ignore(frameLength);
            }).then(() => this.skipAudioData(--frameCount));
        }
        else {
            // last frame
            return this.bitreader.read(11).then(lastFrameLength => {
                this.audioLength += lastFrameLength;
                this.metadata.setFormat('bitrate', this.audioLength / this.duration);
            });
        }
    }
}
exports.MpcSv7Parser = MpcSv7Parser;
