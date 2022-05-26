import Chat from "./Chat";
import Friends from "./Friends";
import Like from "./Like";
import Media from "./Media";
import Message from "./Message";
import Post from "./Post";
import Subscribers from "./Subscribers";
import User from "./User";

User.hasMany(Post, { foreignKey: "authorId" });
Post.belongsTo(User);

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User);

Post.hasMany(Like, { foreignKey: "postId" });
Like.belongsTo(Post);

Post.hasMany(Media, { foreignKey: "postId" });
Media.belongsTo(Post);

User.belongsToMany(User, { through: Subscribers, uniqueKey: "firstId" });
User.belongsToMany(User, { through: Subscribers, uniqueKey: "secondId" });

User.belongsToMany(User, { through: Friends, uniqueKey: "firstId" });
User.belongsToMany(User, { through: Friends, uniqueKey: "secondId" });

User.belongsToMany(User, { through: Chat, uniqueKey: "firstId" });
User.belongsToMany(User, { through: Chat, uniqueKey: "secondId" });

User.hasMany(Message, { foreignKey: "authorId" });
Message.belongsTo(User);

Chat.hasMany(Message, { foreignKey: "chatId" });
Message.belongsTo(Chat);

Chat.hasMany(Message, { foreignKey: "lastMessageId" });
Message.belongsTo(Chat);
