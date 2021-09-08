export default ({ mongoose }) => {
  const { Schema, model } = mongoose;

  const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    signature: { type: String },
    avatar: { type: String },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  });
  return model('User', UserSchema);
};
