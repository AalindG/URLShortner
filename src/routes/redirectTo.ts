import express from 'express'

const redirectToRouter = express.Router()

import * as RedirecTo from '../controller/redirectTo'

redirectToRouter.get('/:hash', RedirecTo.redirectTo)

export default redirectToRouter
