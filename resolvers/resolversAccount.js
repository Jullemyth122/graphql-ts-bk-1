const Account = require('../models/Account');

const resolvers = {
  Query: {
    accounts: async () => {
      try {
        return await Account.find();
      } catch (error) {
        throw new Error('Error fetching accounts');
      }
    },
    account: async (_, { id }) => {
      try {
        return await Account.findById(id);
      } catch (error) {
        throw new Error('Error fetching account');
      }
    },
  },
  Mutation: {
    createAccount: async (_, { input }) => {
      try {
        const newAccount = new Account(input);
        await newAccount.save();
        return {
          success: true,
          message: 'Account created successfully',
          account: newAccount,
        };
      } catch (error) {
        console.error('Error creating account:', error);
        return {
          success: false,
          message: 'Error creating account',
          account: null,
        };
      }
    },
    deleteAccount: async (_, { id }) => {
      try {
        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount) {
          return {
            success: false,
            message: 'Account not found',
            account: null,
          };
        }
        return {
          success: true,
          message: 'Account deleted successfully',
          account: deletedAccount,
        };
      } catch (error) {
        console.error('Error deleting account:', error);
        return {
          success: false,
          message: 'Error deleting account',
          account: null,
        };
      }
    },
    updateAccount: async (_, { input }) => {
      try {
        const { id, ...updateFields } = input;
        const updatedAccount = await Account.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedAccount) {
          return {
            success: false,
            message: 'Account not found',
            account: null,
          };
        }
        return {
          success: true,
          message: 'Account updated successfully',
          account: updatedAccount,
        };
      } catch (error) {
        console.error('Error updating account:', error);
        return {
          success: false,
          message: 'Error updating account',
          account: null,
        };
      }
    },

  },
};

module.exports = resolvers;
