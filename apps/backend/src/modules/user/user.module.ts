import { Module } from '@nestjs/common';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}


// import { Module } from '@nestjs/common';
// import { UsersController } from './user.controller';
// import { UsersService } from './user.service';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// export class UsersModule {}
