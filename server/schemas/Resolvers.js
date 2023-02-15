const { GQLError } = require("graphql");
const { User } = require("../models/index");
const { SignToken, signToken } = require("../utils/auth");

const Resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user)
                throw new GQLError("Must be logged in to Query", {
                    extensions: {
                        code: "Unauthenticated",
                    },
                });
                return await User.findById(context.user._id).populate("books");
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const User = await User.findOne({ email });
            if (!user) {
                throw new GQLError("Unable to find user with this email");
            }
            const checkPassword = await user.isCorrectPassword(password);
            if (!checkPassword) {
                throw new GQLError("Wrong Password");
            }
            const Token = signToken(User);
            return { Token, User };
        },

        addUser: async (parent, { username, email, password }) => {
            const User = await User.create({ username, email, password });
            const Token = signToken(User);
            return { Token, User };
        },
        saveBook: async (parent, args, context) => {
            if (!context.user) {
                throw new GQLError("Must be logged in");
            }
            const UpdatedU = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input }},
                {new: true }
            );
            return UpdatedU;
        },
        deleteBook: async (parent, args, context) => {
            if (!context.user) {
                throw new GQLError("Must be logged in");
            }
            const UpdatedU = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId }}},
                { new: true }
            );
            return UpdatedU;
        },
    },
};

module.exports = Resolvers; 