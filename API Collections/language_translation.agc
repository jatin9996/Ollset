{"version":1,"type":"collection","title":"Language Translation","queries":[{"version":1,"type":"window","query":"mutation{\n  createLanguageTranslation(languageTranslationResquestModel: {\n    assetGroups: {\n      name:\"LoginPage\"\n    }\n    languageProperties: {\n      key: \"OLLSET_LOGIN_TITLE\"\n    }\n  }){\n    assetGroupTranslations{\n      languageKeyTranslations{ \n        key\n        value\n      }\n  \t}\n    languageKeyTranslations{\n      key\n      value\n  \t}\n  }\n}\n\n","apiUrl":"{{serverURL}}/o/graphql","variables":"{}","subscriptionUrl":"","subscriptionConnectionParams":"{}","headers":[{"key":"Authorization","value":"Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0","enabled":true}],"windowName":"Get Language Translation","preRequestScript":"","preRequestScriptEnabled":false,"id":"0dc1727a-0d0e-4ac8-8f32-9fd36df616bc","created_at":1634835924654,"updated_at":1634835924654}],"created_at":1634835924654,"updated_at":1634835924654,"id":4}