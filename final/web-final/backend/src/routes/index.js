// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ index.js ]
// * PackageName  [ server ]
// * Synopsis     [ Define backend APIs ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import infoRoute from './info'
// import commentRoute from './comment'
import RegRoute from './Reg'
import idRoute from './clientID'

import HubRoute from './hub'
import UpdataRoute from './Update'
const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  // app.get(infoRoute.GetSearch)
  app.get('/api/getSearch', wrap(infoRoute.GetSearch))
  app.get('/api/getInfoArtisit', wrap(infoRoute.GetInfoArtist))
  app.get('/api/getInfoMusic', wrap(infoRoute.GetInfoMusic))
  app.get('/api/getInfoOpportunity', wrap(infoRoute.GetInfoOpportunity))
  app.get('/api/getHubData',wrap(HubRoute.GetHubData))
  // app.get('/api/getCommentsByRestaurantId', wrap(commentRoute.GetCommentsByRestaurantId))
  app.get('/api/login',wrap(RegRoute.Login))
  app.put('/api/getUpdataArtist',wrap(UpdataRoute.UpdateUserData))
  app.put('/api/updataHubData',wrap(UpdataRoute.UpdateHubData))
  app.put('/api/acceptinvitation',wrap(UpdataRoute.acceptInvitation))
  app.put('/api/MusicEdit',wrap(UpdataRoute.MusicEdit))
  app.put('/api/OppEdit',wrap(UpdataRoute.OppEdit))
  app.put('/api/HubInvite',wrap(HubRoute.HubInvite))
  app.put('/api/DeleteMusic',wrap(UpdataRoute.DeleteMusic))
  app.put('/api/DeleteOpp',wrap(UpdataRoute.DeleteOpp))
  // app.post('/api/createComment', wrap(commentRoute.CreateComment));
  app.post('/api/Reg',wrap(RegRoute.Reg))
  app.post('/api/NewMusic',wrap(UpdataRoute.NewMusic))
  app.post('/api/NewOpp',wrap(UpdataRoute.NewOpp))
  app.post('/api/NewHub',wrap(HubRoute.NewHub))
  app.get('/api/getClientID', wrap(idRoute.getClientID))
}

export default main
