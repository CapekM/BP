import * as path from 'path';

module.exports = async () => {
    require('dotenv-safe').config({
        path: path.resolve(__dirname, '../.env'),
        sample: path.resolve(__dirname, '../.example.env'),
    });
}