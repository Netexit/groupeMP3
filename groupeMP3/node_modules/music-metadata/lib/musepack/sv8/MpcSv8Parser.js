'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const initDebug = require("debug");
const assert = require("assert");
const BasicParser_1 = require("../../common/BasicParser");
const SV8 = require("./StreamVersion8");
const APEv2Parser_1 = require("../../apev2/APEv2Parser");
const FourCC_1 = require("../../common/FourCC");
const debug = initDebug('music-metadata:parser:musepack');
class MpcSv8Parser extends BasicParser_1.BasicParser {
    constructor() {
        super(...arguments);
        this.audioLength = 0;
    }
    parse() {
        return this.tokenizer.readToken(FourCC_1.FourCcToken)
            .then(signature => {
            assert.equal(signature, 'MPCK', 'Magic number');
            this.metadata.setFormat('dataformat', 'Musepack, SV8');
            return this.parsePacket();
        });
    }
    parsePacket() {
        const sv8reader = new SV8.StreamReader(this.tokenizer);
        return sv8reader.readPacketHeader()
            .then(header => {
            debug(`packet-header key=${header.key}, payloadLength=${header.payloadLength}`);
            switch (header.key) {
                case 'SH': // Stream Header
                    return sv8reader.readStreamHeader(header.payloadLength).then(sh => {
                        this.metadata.setFormat('numberOfSamples', sh.sampleCount);
                        this.metadata.setFormat('sampleRate', sh.sampleFrequency);
                        this.metadata.setFormat('duration', sh.sampleCount / sh.sampleFrequency);
                        this.metadata.setFormat('numberOfChannels', sh.channelCount);
                        return this.parsePacket();
                    });
                case 'AP': // Audio Packet
                    this.audioLength += header.payloadLength;
                    break;
                case 'RG': // Replaygain
                case 'EI': // Encoder Info
                case 'SO': // Seek Table Offset
                case 'ST': // Seek Table
                case 'CT': // Chapter-Tag
                    break;
                case 'SE': // Stream End
                    this.metadata.setFormat('bitrate', this.audioLength * 8 / this.metadata.format.duration);
                    return APEv2Parser_1.APEv2Parser.parseTagHeader(this.metadata, this.tokenizer, this.options);
                default:
                    throw new Error(`Unexpected header: ${header.key}`);
            }
            return this.tokenizer.ignore(header.payloadLength).then(() => this.parsePacket());
        });
    }
}
exports.MpcSv8Parser = MpcSv8Parser;
