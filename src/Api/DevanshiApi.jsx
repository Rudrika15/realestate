export const baseUrl = "https://acsw.in/api/";


//Login
export const login = baseUrl + "v1/users/login";
//Users
export const getUsers = baseUrl + "v1/users/get-users";
export const deleteUsers = baseUrl + "v1/users/delete-users";
export const addUsers = baseUrl + "v1/users/add-user";
export const getSingleUsers = baseUrl + "v1/users/get-users-by-id";
//Projects
export const getProject = baseUrl + "v1/projects/get-project";
export const deleteProject = baseUrl + "v1/projects/delete-project";
//Broker
export const getBroker = baseUrl + "v1/brokers/get-broker";
export const addBroker = baseUrl + "v1/brokers/store-broker";
export const singleUpdateBroker = baseUrl + "v1/brokers/get-broker-by-id/"
export const deleteBroker = baseUrl + "v1/brokers/delete-broker";
export const updateBroker = baseUrl + "v1/brokers/update-broker"
//wing
export const getProjectWing = baseUrl + "v1/projects/get-project-wing"
// project Stage
export const getProjectStage = baseUrl + "v1/projectstage/get-project-stage"
export const addProjectStage = baseUrl + "v1/projectstage/store-project-stage"
export const getSingleProjectStage = baseUrl + "v1/projectstage/get-project-stage-by-id"
export const updateProjectStage = baseUrl + "v1/projectstage/update-project-stage"
//Expense
export const storeExpenseHead = baseUrl + "v1/expense/store-expense-head"
export const storeExpense = baseUrl + "v1/expense/store-expense"
export const getExpenseHead = baseUrl + "v1/expense/get-expense-head"
export const getExpense = baseUrl + "v1/expense/get-expense"
export const deleteExpense = baseUrl + "v1/expense/delete-expense"
export const singleIdExpense = baseUrl + "v1/expense/get-expense-by-id/"
export const updatedExpense = baseUrl + "v1/expense/update-expense"
// partner-income
export const storePartnerIncome = baseUrl + "v1/partnerIncome/store-partner-income"
export const getPartnerIncome = baseUrl + "v1/partnerIncome/get-partner-income"
