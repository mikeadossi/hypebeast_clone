module.exports = {
  secret: 'todayistheday',
  google: {
    clientID: '602227765073-b09h6c6vba4d5ea8e7o0g03di9mqvtdv.apps.googleusercontent.com',
    clientSecret: 'e4Dh94FLUqYv2J3aXEtgvOAj',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  facebook: {
    clientID: '1638140072893956',
    clientSecret: '2db3a413cc0a2bda794f5fa309f7aba2',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  slack: {
    clientID: '253170710421.253916914502',
    clientSecret: '8b09b157446236429d6ec6e4eaf7d196',
    verificationToken: 'l6tVX28V0zmXk0exi62szYEv',
    callbackURL: ""
  }
}
