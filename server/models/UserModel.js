const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
     {
          email: { type: mongoose.Schema.Types.String },
          password: { type: mongoose.Schema.Types.String },
          role: {
               type: mongoose.Schema.Types.String,
               enum: ["admin", "customer"],
               default: "customer",
          },
          name: { type: mongoose.Schema.Types.String },
          address: { type: mongoose.Schema.Types.String },
          city: { type: mongoose.Schema.Types.String },
          state: { type: mongoose.Schema.Types.String },
          pin: { type: mongoose.Schema.Types.Number },
     },
     { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
