'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var VirtualClosetSchema = new Schema({
    name: String,
    color: String,
    description: String,
    type: String,
    style: String,
    urlPath: String
});

module.exports = _mongoose2.default.model('VirtualCloset', VirtualClosetSchema);
//# sourceMappingURL=virtual_closet.js.map