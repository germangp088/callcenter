'use strict'
import express from 'express'
const logger = require('log');

export const validatePut = (req: express.Request, res: express.Response, next: any) => {
	logger.debug('Validate method')

	const { request } = req.body
	const errors: string[] = [];

	validateRequest(request, errors)
	validateErrors(errors, res, next)
}

const validateRequest = (request: any, errors: string[]) => {
	const empty = (request: any,) => {
		return (request.l1OpQty === 0 || request.supervisorQty  === 0 || request.managerQty  === 0)
	}

	if(!request || request.length == 0 || empty(request)){
		errors.push("Employees are necessary.")
	}
}

const validateErrors = (errors: string[], res: express.Response, next: any) => {
	if(errors.length > 0) {
		logger.error('Validate errors:', errors)
		return res.status(400).json({ errors });
	} else {
		next()
	}
}