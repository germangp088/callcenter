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
  const employee = callCenterService.chat()

  if (!employee) {
    res.status(404).json()
  } else {
    res.status(200).json(employee)
  }
})

export default router