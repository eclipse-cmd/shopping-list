import User from "../models/User"
import bcrypt from "bcrypt"
import { jwtSignAuth } from "../services/AuthServices"
import { customResponse } from "../Helper/ResponseServices"

export const
    createUser = (req: any, res: any) => {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body

        //Simple validation
        if (!(first_name && last_name && email && password)) {
            return res.status(400).json(customResponse("All fields are required", false))
        }

        //Check for unique column "Email"
        User.findOne({ email })
            .then((user) => {
                if (user) return res.status(400).json(customResponse("User with this email already exist", false))

                const newUser = new User({
                    first_name, last_name, email, password
                })
                //If no user found
                bcrypt.genSalt(15, (_, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) return res.status(500).json(customResponse("Something went wrong", false));

                        newUser.password = hash
                        newUser.save()
                            .then(async (user: any) => {
                                const token = await jwtSignAuth(user._id)
                                if (token) {
                                    return res.send(customResponse("User account created successfully", true,
                                        {
                                            token,
                                            user: {
                                                _id: user._id,
                                                name: `${user.first_name} ${user.last_name}`,
                                                email: user.email,
                                                created_at: user.created_at,
                                                updated_at: user.updated_at
                                            }
                                        }
                                    ))
                                } else {
                                    res.status(500).json(customResponse(`Internal server error: User register but not authenticated`, false))
                                }
                            })
                            .catch((error: any) => {
                                res.status(400).send(customResponse(`${error}`, false))
                            })
                    })
                })
            })
    },

    loginUser = (req: any, res: any) => {
        const {
            email,
            password
        } = req.body

        //Simple validation
        if (!(email && password)) {
            return res.status(400).json(customResponse("All fields are required", false))
        }

        //Check for unique column "Email"
        User.findOne({ email })
            .then((user) => {
                if (!user) return res.status(400).json(customResponse("Email is incorrect", false))

                bcrypt.compare(password, user.password.toString())
                    .then(async (verified: boolean) => {
                        if (!verified) return res.status(400).json(customResponse("Password is incorrect", false))

                        const token = await jwtSignAuth(user._id)
                        if (token) {
                            return res.send(customResponse("", true,
                                {
                                    token,
                                    user: {
                                        _id: user._id,
                                        name: `${user.first_name} ${user.last_name}`,
                                        email: user.email,
                                        created_at: user.created_at,
                                        updated_at: user.updated_at
                                    }
                                }
                            ))
                        } else {
                            return res.status(500).json(customResponse(`Internal server error: User register but not authenticated`, false))
                        }
                    })
            })
    },

    getUser = (req: any, res: any) => {
        const token = req.header('x-auth-token')
        return res.json(customResponse("", true, { token, user: req.user }))
    }