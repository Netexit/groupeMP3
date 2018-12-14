"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token = require("token-types");
class BitReader {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
        this.pos = 0;
        this.dword = undefined;
    }
    /**
     *
     * @param bits 1..30 bits
     */
    read(bits) {
        if (this.dword === undefined) {
            return this.tokenizer.readToken(Token.UINT32_LE).then(dword => {
                this.dword = dword;
                return this.read(bits);
            });
        }
        let out = this.dword;
        this.pos += bits;
        if (this.pos < 32) {
            out >>>= (32 - this.pos);
            return Promise.resolve(out & ((1 << bits) - 1));
        }
        else {
            this.pos -= 32;
            if (this.pos === 0) {
                this.dword = undefined;
                return Promise.resolve(out & ((1 << bits) - 1));
            }
            else {
                return this.tokenizer.readToken(Token.UINT32_LE).then(dword => {
                    this.dword = dword;
                    if (this.pos) {
                        out <<= this.pos;
                        out |= this.dword >>> (32 - this.pos);
                    }
                    return out & ((1 << bits) - 1);
                });
            }
        }
    }
    ignore(bits) {
        if (this.pos > 0) {
            const remaining = 32 - this.pos;
            this.dword = undefined;
            bits -= remaining;
            this.pos = 0;
        }
        const remainder = bits % 32;
        const numOfWords = (bits - remainder) / 32;
        return this.tokenizer.ignore(numOfWords * 4).then(() => {
            return this.read(remainder);
        });
    }
}
exports.BitReader = BitReader;
