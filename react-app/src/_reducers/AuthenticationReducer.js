import { AuthenticationTypes } from '../_actions';

const initialState = {
  profile: {
      access_token: "",
      companyId: "",
      contactId: "",
      createDate: "",
      emailAddress: "",
      emailAddressVerified: "",
      expires_in: "",
      failedLoginAttempts: "",
      firstName: "",
      groupId: "",
      jobTitle: "",
      languageId: "",
      lastFailedLoginDate: "",
      lastLoginDate: "",
      lastLoginIP: "",
      lastName: "",
      loginDate: "",
      middleName: "",
      modifiedDate: "",
      refresh_token: "",
      screenName: "",
      status: "",
      timeZoneId: "",
      token_type: "",
      userId: "",
      coverImage: "",
      portraitImage: "",
      uuid: ""

  },
  formSubmitted: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthenticationTypes.LOGIN:
    console.log('login', action.payload.user)
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case AuthenticationTypes.ADD_USER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case AuthenticationTypes.UPDATE_USER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case AuthenticationTypes.UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          profileImage: action.payload.image
        }
      }
    case AuthenticationTypes.FORM_SUBMITION_STATUS:
      return {
        ...state,
        formSubmitted: action.payload.status
      }
    case AuthenticationTypes.REGISTER_INFO: 
      return {
        ...state,
        registerData: action.payload.user,
      }
    default:
      return state;
  }
}

export default reducer;