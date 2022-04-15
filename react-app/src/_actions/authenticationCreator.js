import AuthenticationTypes from './authenticationTypes';

const AuthenticationActionCreators = {

  registrationInfo: (user) => ({ type: AuthenticationTypes.REGISTER_INFO, payload: {user}}),

  addProfile: (user) => ({ type: AuthenticationTypes.ADD_USER, payload: { user } }),

  updateProfileImage: (image) => ({ type: AuthenticationTypes.UPDATE_PROFILE_PICTURE, payload: { image } }),

  updateProfile: (user) => ({ type: AuthenticationTypes.UPDATE_USER, payload: { user } }),

  formSubmittionStatus: (status) => ({ type: AuthenticationTypes.FORM_SUBMITION_STATUS, payload: { status }}),

  login: (user) => ({ type: AuthenticationTypes.LOGIN, payload: { user } })

}

export default AuthenticationActionCreators;