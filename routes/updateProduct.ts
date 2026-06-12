/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import { updatableProductFields } from '../models/product'

const allowedProductUpdates = new Set(updatableProductFields)

export function updateProduct () {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body == null || Array.isArray(req.body) || typeof req.body !== 'object') {
      res.status(400).json({ error: 'Invalid product update payload' })
      return
    }

    const invalidFields = Object.keys(req.body).filter((field) => !allowedProductUpdates.has(field as typeof updatableProductFields[number]))
    if (invalidFields.length > 0) {
      res.status(400).json({ error: 'Invalid product update payload' })
      return
    }

    next()
  }
}
