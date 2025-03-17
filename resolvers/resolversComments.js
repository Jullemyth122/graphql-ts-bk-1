const Comment = require('../models/Comment');

const resolvers = {
    Query: {
        comments: async (_, { accountId }) => {
        try {
            const query = accountId ? { accountId } : {};
            return await Comment.find(query);
        } catch (error) {
            throw new Error('Error fetching comments');
        }
        },
        comment: async (_, { id }) => {
        try {
            return await Comment.findById(id);
        } catch (error) {
            throw new Error('Error fetching comment');
        }
        },
    },
    Mutation: {
        createComment: async (_, { input }) => {
        try {
            const newComment = new Comment(input);
            await newComment.save();
            return {
                success: true,
                message: 'Comment created successfully',
                comment: newComment,
            };
        } catch (error) {
            console.error('Error creating comment:', error);
            return {
                success: false,
                message: 'Error creating comment',
                comment: null,
            };
        }
        },
        deleteComment: async (_, { id }) => {
        try {
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                return {
                    success: false,
                    message: 'Comment not found',
                    comment: null,
                };
            }
            return {
                success: true,
                message: 'Comment deleted successfully',
                comment: deletedComment,
            };
        } catch (error) {
            console.error('Error deleting comment:', error);
            return {
                success: false,
                message: 'Error deleting comment',
                comment: null,
            };
        }
        },
        updateComment: async (_, { input }) => {
        try {
            const { id, ...updateFields } = input;
            const updatedComment = await Comment.findByIdAndUpdate(id, updateFields, { new: true });
            if (!updatedComment) {
                return {
                    success: false,
                    message: 'Comment not found',
                    comment: null,
                };
            }
            return {
                success: true,
                message: 'Comment updated successfully',
                comment: updatedComment,
            };
        } catch (error) {
            console.error('Error updating comment:', error);
            return {
                success: false,
                message: 'Error updating comment',
                comment: null,
            };
        }
        },
    },
};

module.exports = resolvers;
