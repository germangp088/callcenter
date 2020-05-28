'use strict'
import express from 'express'
import { validatePut } from '../utils/validator'
import { CallCenterService } from '../services/callcenter'

const router = express.Router()
const callCenterService: CallCenterService = new CallCenterService()

router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json(callCenterService.callCenter)
})

router.put('/', validatePut, (req: express.Request, res: express.Response) => {
  callCenterService.updateEmployees(req.body.request)
  res.status(200).json()
})

router.get('/chat', (req: express.Request, res: express.Response) => {
  let response: string = ''

  response = callCenterService.chat()

  if (response == '') {
    res.status(404).json('All our operators are busy, try again later.')
  } else {
    res.status(200).json(response)
  }
})

export default router