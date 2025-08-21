import { Response } from "express"

export const clearAuthCookie = (res: Response): void => {
  console.log('clearing auth cookie', res)
  res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
}