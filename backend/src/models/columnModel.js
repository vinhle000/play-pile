const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
    isOnBoard: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ColumnSchema.index({ userId: 1, position: 1 });
ColumnSchema.index({ userId: 1, isOnBoard: 1 });
ColumnSchema.index({ userId: 1, position: 1, isOnBoard: 1 });

module.exports = mongoose.model('Column', ColumnSchema);
