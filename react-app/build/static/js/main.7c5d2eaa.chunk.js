(this.webpackJsonpschedular=this.webpackJsonpschedular||[]).push([[2],{102:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var a,r,o,i,l,c,s,u=n(2),m=n(39),d=n(29),p=n(30),g=n(40),f=n(24),b=n(23),h=function(){function e(){Object(d.a)(this,e),this.os=[{name:"Windows Phone",value:"Windows Phone",version:"OS"},{name:"Windows",value:"Win",version:"NT"},{name:"iPhone",value:"iPhone",version:"OS"},{name:"iPad",value:"iPad",version:"OS"},{name:"Kindle",value:"Silk",version:"Silk"},{name:"Android",value:"Android",version:"Android"},{name:"PlayBook",value:"PlayBook",version:"OS"},{name:"BlackBerry",value:"BlackBerry",version:"/"},{name:"Macintosh",value:"Mac",version:"OS X"},{name:"Linux",value:"Linux",version:"rv"},{name:"Palm",value:"Palm",version:"PalmOS"}],this.browser=[{name:"Chrome",value:"Chrome",version:"Chrome"},{name:"Firefox",value:"Firefox",version:"Firefox"},{name:"Safari",value:"Safari",version:"Version"},{name:"Internet Explorer",value:"MSIE",version:"MSIE"},{name:"Opera",value:"Opera",version:"Opera"},{name:"BlackBerry",value:"CLDC",version:"CLDC"},{name:"Mozilla",value:"Mozilla",version:"Mozilla"}],this.header=[navigator.platform,navigator.userAgent,navigator.appVersion,navigator.vendor,window.opera]}return Object(p.a)(e,[{key:"matchItem",value:function(e,t){var n,a,r,o=0,i=0;for(o=0;o<t.length;o+=1)if(new RegExp(t[o].value,"i").test(e)){if(n=new RegExp(t[o].version+"[- /:;]([d._]+)","i"),r="",(a=e.match(n))&&a[1]&&(a=a[1]),a)for(a=a.split(/[._]+/),i=0;i<a.length;i+=1)r+=0===i?a[i]+".":a[i];else r="0";return{name:t[o].name,version:parseFloat(r)}}return{name:"unknown",version:0}}},{key:"getSystemInfo",value:function(){var e=this.header.join(" "),t=this.matchItem(e,this.os),n=this.matchItem(e,this.browser);return{deviceName:t.name,browserName:n.name,ipAddress:Object(b.a)("ip").address,ua:navigator.userAgent}}}]),e}(),v=function(){function e(){Object(d.a)(this,e),this.logService=new h}return Object(p.a)(e,[{key:"login",value:function(e,t){var n={username:e,password:t};return g.a.mutate({mutation:Object(f.gql)(a||(a=Object(m.a)(['\n          mutation($username :String!, $password: String!) {\n            createLogin(loginRequestModel: {\n                    clientId: "id-d0507e10-cb80-e41f-48bf-219a841deac8",\n                    clientSecret: "secret-32f818d7-ccba-68fe-92be-5ab913e1e6",\n                    username: $username,\n                    password: $password\n                }){\n                access_token\n                companyId\n                contactId\n                createDate\n                emailAddress\n                emailAddressVerified\n                expires_in\n                failedLoginAttempts\n                firstName\n                groupId\n                jobTitle\n                languageId\n                lastFailedLoginDate\n                lastLoginDate\n                lastLoginIP\n                lastName\n                loginDate\n                middleName\n                modifiedDate\n                refresh_token\n                screenName\n                status\n                timeZoneId\n                token_type\n                userId\n                coverImage\n                portraitImage\n                uuid\n              }\n          }']))),variables:n,notifyOnNetworkStatusChange:!0})}},{key:"getVerificationCode",value:function(e,t){var n={emailOrPhone:e,name:t};return g.a.mutate({mutation:Object(f.gql)(r||(r=Object(m.a)(["\n        mutation($emailOrPhone: String!, $name: String!) {\n          createSendVerification(sendVerificationRequestModel: {\n            emailOrPhone: $emailOrPhone,\n            name: $name\n          }),\n          {\n            isSent\n            reason\n          }\n        }"]))),variables:n})}},{key:"registerUser",value:function(e){e.dob="04/04/1990";var t=Object(u.a)({},e);return g.a.mutate({mutation:Object(f.gql)(o||(o=Object(m.a)(["\n          mutation($dob: String!, $emailOrPhone: String!, $firstName: String!, $lastName: String!, $gender: String!, $password: String!, $username: String!, $verificationCode: String!){\n            createAccount(userRequestModel: {\n              dob: $dob,\n              emailOrPhone: $emailOrPhone,\n              firstName: $firstName,\n              lastName: $lastName,\n              gender: $gender,\n              password: $password,\n              username: $username,\n              verificationCode: $verificationCode\n            }){\n            companyId\n            contactId\n            createDate\n            emailAddress\n            emailAddressVerified\n            failedLoginAttempts\n            firstName\n            groupId\n            jobTitle\n            languageId\n            lastFailedLoginDate\n            lastLoginDate\n            lastLoginIP\n            lastName\n            loginDate\n            middleName\n            modifiedDate\n            screenName\n            status\n            timeZoneId\n            userId\n            uuid\n          }\n        }"]))),variables:t})}},{key:"trackUserLogin",value:function(e,t){var n=Object(u.a)(Object(u.a)({},this.logService.getSystemInfo()),{},{loginStatus:t,userName:e});return console.log(n),g.a.mutate({mutation:Object(f.gql)(i||(i=Object(m.a)(["\n          mutation($userName :String!, $ipAddress: String!, $deviceName: String!, $browserName: String!, $ua: String!, $loginStatus: Boolean!) {\n            createTrackLogin(loginTrackingRequestModel: {\n                username: $userName,\n                ipAddress: $ipAddress,\n                loginSuccess: $loginStatus,\n                deviceName: $deviceName,\n                browserName: $browserName,\n                ua: $ua\n            })\n        }"]))),variables:n})}},{key:"sendResetLink",value:function(e){var t={username:e};return console.log(t),g.a.mutate({mutation:Object(f.gql)(l||(l=Object(m.a)(["\n            mutation($username: String!) {\n            createSendPasswordResetCode(sendVerificationRequestModel: {\n              emailOrPhone: $username\n            }){\n              isSent\n              reason\n            }\n          }"]))),variables:t})}},{key:"updatePassword",value:function(e,t){var n={username:e,password:t};return console.log(n),g.a.mutate({mutation:Object(f.gql)(c||(c=Object(m.a)(["\n            mutation($username: String!, $password: String!) {\n            createSendPasswordResetCode(sendVerificationRequestModel: {\n              emailOrPhone: $username,\n              newpassword: $password\n            }){\n              isSent\n              reason\n            }\n          }"]))),variables:n})}},{key:"userAvailable",value:function(e){return g.a.mutate({mutation:Object(f.gql)(s||(s=Object(m.a)(['\n          query{\n            checkUserName(userName: "','"){\n              isAvailable\n            }\n          }'])),e)})}},{key:"isUserLoggedIn",value:function(){return!!Object(b.a)("user")}},{key:"logout",value:function(e){Object(b.b)()}}]),e}()},136:function(e,t,n){e.exports=n(156)},149:function(e,t,n){},155:function(e,t,n){},156:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(31),i=n.n(o),l=n(53),c=n(68),s=n(121),u=n(2),m=n(35),d={profile:{access_token:"",companyId:"",contactId:"",createDate:"",emailAddress:"",emailAddressVerified:"",expires_in:"",failedLoginAttempts:"",firstName:"",groupId:"",jobTitle:"",languageId:"",lastFailedLoginDate:"",lastLoginDate:"",lastLoginIP:"",lastName:"",loginDate:"",middleName:"",modifiedDate:"",refresh_token:"",screenName:"",status:"",timeZoneId:"",token_type:"",userId:"",coverImage:"",portraitImage:"",uuid:""},formSubmitted:!1},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m.b.LOGIN:return console.log("login",t.payload.user),Object(u.a)(Object(u.a)({},e),{},{profile:t.payload.user,formSubmitted:!1});case m.b.ADD_USER:case m.b.UPDATE_USER:return Object(u.a)(Object(u.a)({},e),{},{profile:t.payload.user,formSubmitted:!1});case m.b.UPDATE_PROFILE_PICTURE:return Object(u.a)(Object(u.a)({},e),{},{profile:Object(u.a)(Object(u.a)({},e.profile),{},{profileImage:t.payload.image})});case m.b.FORM_SUBMITION_STATUS:return Object(u.a)(Object(u.a)({},e),{},{formSubmitted:t.payload.status});case m.b.REGISTER_INFO:return Object(u.a)(Object(u.a)({},e),{},{registerData:t.payload.user});default:return e}},g=Object(c.b)({user:p}),f=function(){return Object(c.d)(g,Object(c.c)(Object(c.a)(s.a)))},b=n(29),h=n(30),v=n(51),O=n(50),E=n(23),S=n(15),w=n(52),j=n(102),N=n(49),y=n(66),I=n(67),P=n(163),k=n(179),x=n(180),L=n(116),R=n.n(L),A=n(55),$=(n(149),function(e){var t=Object(E.a)("user"),n="";return n=t?a.createElement(P.a,{md:"4"},a.createElement(I.a.Collapse,{id:"basic-navbar-nav"},a.createElement(y.a,{className:"mr-auto d-flex"},a.createElement(y.a.Link,{href:"#/home",className:"bold g-r-24"},a.createElement("i",{className:"header-menu-icon g-r-10"},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-people-fill",viewBox:"0 0 16 16"},a.createElement("path",{d:"M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),a.createElement("path",{fillRule:"evenodd",d:"M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"}),a.createElement("path",{d:"M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"}))),"Social Events"),a.createElement(y.a.Link,{href:"#/calendar",className:"bold g-r-24"},a.createElement("i",{className:"header-menu-icon g-r-10"},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-calendar2-event-fill",viewBox:"0 0 16 16"},a.createElement("path",{d:"M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"}))),"Calendar"),a.createElement(y.a.Link,{href:"#/calendar",className:"bold"},a.createElement("i",{className:"header-menu-icon g-r-10"},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-gear-fill",viewBox:"0 0 16 16"},a.createElement("path",{d:"M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"}))),"Settings")))):a.createElement(P.a,{md:"8",className:"d-flex justify-content-end"},a.createElement("div",null,a.createElement("ul",{className:"navbar-nav ml-auto"},a.createElement("li",{className:"nav-item"},a.createElement(w.b,{className:"nav-link",to:"/login"},a.createElement(N.a,{size:"lg",className:"form-control",variant:"outline-secondary"},"Log in"))),a.createElement("li",{className:"nav-item"},a.createElement(w.b,{className:"nav-link",to:"/register"},a.createElement(N.a,{size:"lg",className:"form-control",variant:"primary"},"Register")))))),a.createElement(a.Fragment,null,null!==e.props.profile?a.createElement(I.a,{collapseOnSelect:!0,expand:"lg",bg:"light",variant:"light",sticky:"top"},a.createElement("div",{className:"container-fluid"},a.createElement(k.a,null),a.createElement(P.a,{xs:"8",md:"4",className:"d-flex justify-content-center align-items-center"},a.createElement(I.a.Brand,{href:"/"},a.createElement("img",{src:A.c,alt:"Logo",className:"Brandlogo"})),a.createElement(R.a,{placeholder:"Type to search...",classNames:"Navsearch"}),a.createElement(I.a.Toggle,{"aria-controls":"responsive-navbar-nav"})),n,t?a.createElement(P.a,{xs:"4",md:"4",className:"d-flex justify-content-end align-items-center"},a.createElement("span",{className:"g-r-24"},a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-bell-fill",viewBox:"0 0 16 16"},a.createElement("path",{d:"M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"}))),a.createElement("span",null,a.createElement(x.a,{align:"end"},a.createElement(x.a.Toggle,{id:"dropdown-custom-components"},a.createElement("img",{src:"".concat(A.d).concat(e.props.profile.portraitImage),className:"header-user-icon g-r-10"}),a.createElement("label",{className:"f-16 bold primary-color g-r-24"},"".concat(e.props.profile.firstName," ").concat(e.props.profile.lastName)),a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"#555360",className:"bi bi-chevron-down",viewBox:"0 0 16 16"},a.createElement("path",{fillRule:"evenodd",d:"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"}))),a.createElement(x.a.Menu,null,a.createElement(x.a.Item,{onClick:e.logout},"Logout"))))):"")):"")}),T=function(e){Object(v.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(b.a)(this,n),(a=t.call(this,e)).logout=function(){Object(E.b)("user"),a.props.history.push("/login")},a}return Object(h.a)(n,[{key:"render",value:function(){return $(this)}}]),n}(a.Component),_=Object(l.b)((function(e){return{profile:e.user.profile}}))(Object(S.g)(T)),C=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,315))})),U=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(8)]).then(n.bind(null,316))})),M=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,317))})),D=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(5),n.e(6)]).then(n.bind(null,312))})),z=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,314))})),B=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,313))})),F={routes:[{path:"/",redirect:"/login",exact:!0},{path:"/login",component:C,exact:!0},{path:"/register",component:U,exact:!0},{path:"/verify-user",component:M,exact:!0},{path:"/reset-password",component:z,exact:!0},{path:"/update-password",component:B,exact:!0},{path:"/calendar",component:D,exact:!0,auth:!0}]},q=function(e){Object(v.a)(n,e);var t=Object(O.a)(n);function n(e){var a;return Object(b.a)(this,n),(a=t.call(this,e)).authenticationService=new j.a,a.prepareRoutes=function(){return F.routes.forEach((function(e){e.component="component"===e.component?C:e.component})),F.routes.filter((function(e){return e.hasOwnProperty("path")})).map((function(e,t){return e.hasOwnProperty("auth")&&!0===e.auth?r.a.createElement(S.b,{props:a.props,key:t,path:e.path,render:function(t){return a.authenticationService.isUserLoggedIn()?r.a.createElement("div",{className:"bodyWrapper"},r.a.createElement(e.component,Object.assign({},t,{notificationContext:a.props.notificationContext,globalContext:a.props.globalContext,setLoading:a.props.setLoading}))," "):r.a.createElement(S.a,{to:"/"})}}):"/"===e.path?r.a.createElement(S.b,{exact:!0,path:"/",key:t},a.authenticationService.isUserLoggedIn()?r.a.createElement(S.a,{to:"/calendar"}):r.a.createElement(S.a,{to:e.redirect})):r.a.createElement(S.b,{props:a.props,key:t,path:e.path,render:function(t){return r.a.createElement("div",{className:"bodyWrapper"},r.a.createElement(e.component,Object.assign({},t,{notificationContext:a.props.notificationContext,globalContext:a.props.globalContext,setLoading:a.props.setLoading})))},exact:!0})}))},a.state={body:a.prepareRoutes()},a}return Object(h.a)(n,[{key:"render",value:function(){return r.a.createElement(w.a,null,r.a.createElement(a.Suspense,{fallback:"Loading..."},r.a.createElement(_,null),r.a.createElement(S.d,null,this.state.body)))}}]),n}(a.Component),V=function(e){Object(v.a)(n,e);var t=Object(O.a)(n);function n(){return Object(b.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){console.log(this.props.profile);var e=Object(E.a)("user");e&&(this.props.dispatch(m.a.login(e)),console.log("UserProfile",this.props.profile)),fetch("https://api.ipify.org/?format=json").then((function(e){return e.json()})).then((function(e){return Object(E.c)("ip",{address:e.ip})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(q,null))}}]),n}(r.a.Component),G=Object(l.b)((function(e){return{profile:e.user.profile}}))(V);n(155),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=f();i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(l.a,{store:W},r.a.createElement(G,null))),document.getElementById("app-root"))},23:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var a=function(e,t){if(e)return"string"!==typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t)},r=function(e){if(e)return JSON.parse(window.localStorage.getItem(e))},o=function(e){return e||window.localStorage.clear(),window.localStorage.removeItem(e)}},35:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}));var a={LOGIN:"LOGIN",ADD_USER:"ADD_USER",UPDATE_USER:"UPDATE_USER",UPDATE_PROFILE_PICTURE:"UPDATE_PROFILE_PICTURE",FORM_SUBMITION_STATUS:"FORM_SUBMITION_STATUS",REGISTER_INFO:"FORM_SUBMITION_STATUS"},r={registrationInfo:function(e){return{type:a.REGISTER_INFO,payload:{user:e}}},addProfile:function(e){return{type:a.ADD_USER,payload:{user:e}}},updateProfileImage:function(e){return{type:a.UPDATE_PROFILE_PICTURE,payload:{image:e}}},updateProfile:function(e){return{type:a.UPDATE_USER,payload:{user:e}}},formSubmittionStatus:function(e){return{type:a.FORM_SUBMITION_STATUS,payload:{status:e}}},login:function(e){return{type:a.LOGIN,payload:{user:e}}}}},40:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(2),r=n(24),o=n(125),i=n(55),l=(n(23),r.gql,Object(r.createHttpLink)({uri:"http://18.222.211.166:8080/o/graphql"})),c=Object(o.a)((function(e,t){var n=t.headers,r=void 0===localStorage.getItem("user")||null===localStorage.getItem("user")?"":JSON.parse(localStorage.getItem("user")).access_token;return""!==r?{headers:Object(a.a)(Object(a.a)({},n),{},{Authorization:r?"Bearer ".concat(r):""})}:{headers:Object(a.a)({},n)}})),s=new r.ApolloClient({link:c.concat(l),cache:new r.InMemoryCache({addTypename:!1}),awaitRefetchQueries:!0});console.log(s);i.a,i.b},55:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i}));var a="http://18.222.211.166:8080",r="/assets/logo.png",o="id-d0507e10-cb80-e41f-48bf-219a841deac8",i="secret-32f818d7-ccba-68fe-92be-5ab913e1e6"}},[[136,3,4]]]);
//# sourceMappingURL=main.7c5d2eaa.chunk.js.map