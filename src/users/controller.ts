// src/users/controller.ts
import { JsonController, Get, Post, Put, Param, Body, NotFoundError, Authorized } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

    @Get('/users')
    allUsers = async () => {
    const users = await User.find()
    return { users }
    }

    @Authorized()
    @Get('/users/:id')
    getUser(
    @Param('id') id: number
    ) {
    return User.findOne(id)
    }

    @Put('/users/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ) { 
        const user = await User.findOne(id)
        if (!user) throw new NotFoundError('Cannot find page')

        return User.merge(user, update).save()
    }
    
    @Post('/users')
    async createUser(
        @Body() user: User
    ) {
        const {password, ...rest} = user
        const entity = User.create(rest)
        await entity.setPassword(password)
        return entity.save()
    }

}