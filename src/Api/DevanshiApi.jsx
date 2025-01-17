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
//Broker
export const getBroker = baseUrl + "v1/brokers/get-broker";
export const addBroker = baseUrl + "v1/brokers/store-broker";
export const singleUpdateBroker = baseUrl + "v1/brokers/get-broker-by-id/"
export const deleteBroker = baseUrl + "v1/brokers/delete-broker";
export const updateBroker = baseUrl + "v1/brokers/update-broker"
//wing
export const getProjectWing = baseUrl + "v1/projects/get-project-wing/39"
// project Stage
export const getProjectStage = baseUrl + "v1/projectstage/get-project-stage"
export const addProjectStage = baseUrl + "v1/projectstage/store-project-stage"
export const getSingleProjectStage = baseUrl + "v1/projectstage/get-project-stage-by-id"
export const updateProjectStage = baseUrl + "v1/projectstage/update-project-stage"
