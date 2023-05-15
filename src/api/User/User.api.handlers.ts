import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import db from '../../services/firebase/firestore'
import env from '../../utils/constants/env'
import { hashPassword, verifyPassword } from '../../utils/password/functions'
import { IExtendedRequest } from '../../types/interfaces/request.interface'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const usersRef = db.collection('users')

    const userDocRef = await usersRef.where('email', '==', email).get()

    if (userDocRef.empty) {
      return res.json({
        success: false,
        message: `There is no user with ${email} address`,
      })
    }

    const user = userDocRef.docs[0].data()
    if (!(await verifyPassword(password, user.password))) {
      return res.json({
        success: false,
        message: `Password is incorrect`,
      })
    }

    const token = jwt.sign(user.password, env.tokenKey)

    return res.send({ success: true, token: token })
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const usersRef = db.collection('users')
    const user = await usersRef.where('email', '==', email).get()

    if (!user.empty) {
      return res.json({
        success: false,
        message: `User with ${email} email address already exist`,
      })
    }

    const newUserData = {
      email,
      password: await hashPassword(password),
    }

    await usersRef.doc().set(newUserData)

    return res.json({
      success: true,
      message: 'User successfully created',
    })
  } catch (err: any) {
    res.send({ success: false, message: err.message })
  }
}

export const deleteUser = async (req: IExtendedRequest, res: Response) => {
  try {
    const { email } = req.params

    const usersRef = db.collection('users')
    const querySnapshot = await usersRef.where('email', '==', email).get()

    if (querySnapshot.empty) {
      return res.json({ success: false, message: 'User doesnt exist' })
    }

    const userDocRef = querySnapshot.docs[0].ref
    await userDocRef.delete()
    console.log('User deleted.')

    return res.json({ success: true, message: 'User successfully deleted' })
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false })
  }
}
