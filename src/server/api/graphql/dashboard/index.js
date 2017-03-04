const schema = (`
  type Dashboard {
    message: String!
  }
`);

export const dashboardQuery = `
  getDashboard: Dashboard
`;

export const getDashboard = (args, context) => {
  if (context.user) {
    return ({ message: "You're authorized to see this secret message." });
  }
  return ({ message: 'default message' });
};

export default schema;
