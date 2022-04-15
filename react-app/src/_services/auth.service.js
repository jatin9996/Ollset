import { AClient, AClientHeaders, GQL } from './apollo/apollo-client-config';

import {
    gql
  } from "@apollo/client";
import { getStore, removeItem } from '../_utils';
import { LogService } from './log.service';

export class AuthenticationService {
  
  logService = new LogService();
  
  login(username, password) {
    let params = {
        "username": username,
        "password": password
    };
    return AClient.mutate({
        mutation: gql`
          mutation($username :String!, $password: String!) {
            createLogin(loginRequestModel: {
                    clientId: "id-d0507e10-cb80-e41f-48bf-219a841deac8",
                    clientSecret: "secret-32f818d7-ccba-68fe-92be-5ab913e1e6",
                    username: $username,
                    password: $password
                }){
                access_token
                companyId
                contactId
                createDate
                emailAddress
                emailAddressVerified
                expires_in
                failedLoginAttempts
                firstName
                groupId
                jobTitle
                languageId
                lastFailedLoginDate
                lastLoginDate
                lastLoginIP
                lastName
                loginDate
                middleName
                modifiedDate
                refresh_token
                screenName
                status
                timeZoneId
                token_type
                userId
                coverImage
                portraitImage
                uuid
              }
          }`,
          variables : params,
          notifyOnNetworkStatusChange: true
      });
  }

  getVerificationCode(emailorphone, firstname) {
    let params = {
      emailOrPhone: emailorphone,
      name: firstname
    }
    return AClient.mutate({
        mutation: gql`
        mutation($emailOrPhone: String!, $name: String!) {
          createSendVerification(sendVerificationRequestModel: {
            emailOrPhone: $emailOrPhone,
            name: $name
          }),
          {
            isSent
            reason
          }
        }`,
        variables: params

      });
  }

  registerUser(user) {
    user.dob = "04/04/1990";
    let params = { ...user };

    return AClient.mutate({
        mutation: gql`
          mutation($dob: String!, $emailOrPhone: String!, $firstName: String!, $lastName: String!, $gender: String!, $password: String!, $username: String!, $verificationCode: String!){
            createAccount(userRequestModel: {
              dob: $dob,
              emailOrPhone: $emailOrPhone,
              firstName: $firstName,
              lastName: $lastName,
              gender: $gender,
              password: $password,
              username: $username,
              verificationCode: $verificationCode
            }){
            companyId
            contactId
            createDate
            emailAddress
            emailAddressVerified
            failedLoginAttempts
            firstName
            groupId
            jobTitle
            languageId
            lastFailedLoginDate
            lastLoginDate
            lastLoginIP
            lastName
            loginDate
            middleName
            modifiedDate
            screenName
            status
            timeZoneId
            userId
            uuid
          }
        }`,
        variables: params
      });
  }

  trackUserLogin(username, loginStatus) {
    let params = { ...this.logService.getSystemInfo(), "loginStatus": loginStatus, "userName": username};
    console.log(params);
    return AClient.mutate({
        mutation: gql`
          mutation($userName :String!, $ipAddress: String!, $deviceName: String!, $browserName: String!, $ua: String!, $loginStatus: Boolean!) {
            createTrackLogin(loginTrackingRequestModel: {
                username: $userName,
                ipAddress: $ipAddress,
                loginSuccess: $loginStatus,
                deviceName: $deviceName,
                browserName: $browserName,
                ua: $ua
            })
        }`,
        variables: params
      });
  }

  sendResetLink(username) {
     let params = { "username": username};
      console.log(params);
      return AClient.mutate({
          mutation: gql`
            mutation($username: String!) {
            createSendPasswordResetCode(sendVerificationRequestModel: {
              emailOrPhone: $username
            }){
              isSent
              reason
            }
          }`,
          variables: params
        });
    
  }
  
  updatePassword(username, password) {
     let params = { "username": username, "password": password};
      console.log(params);
      return AClient.mutate({
          mutation: gql`
            mutation($username: String!, $password: String!) {
            createSendPasswordResetCode(sendVerificationRequestModel: {
              emailOrPhone: $username,
              newpassword: $password
            }){
              isSent
              reason
            }
          }`,
          variables: params
        });
    
  }

  userAvailable(username) {
    return AClient.mutate({
        mutation: gql`
          query{
            checkUserName(userName: "${username}"){
              isAvailable
            }
          }`
        });
  }

  isUserLoggedIn() {
    const user = getStore('user');
    return user ? true : false;
  }

  logout(params) {
    removeItem();
  }

 
}