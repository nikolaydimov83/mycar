import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
// 1. Import cookie-session (or whichever package you use in main.ts)
import cookieSession from 'cookie-session';
import { response } from 'express';
import { CurrentUserInterceptors } from 'src/interceptors/user.interceptors';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

describe('Authentication controllers (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // 2. Add the cookie-session middleware matching your main.ts setup!
    app.use(
      cookieSession({
        keys: ['dgbasjbd22bnbs'], // This matches your app setup config
      }),
    );
    const usersService = moduleFixture.get(UsersService);

    // 2. Pass that working instance into your interceptor
    app.useGlobalInterceptors(new CurrentUserInterceptors(usersService));

    await app.init();
  });

  it('Sign up with user that does not exist', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'ger@abv.bg', password: '1234' })
      .expect(201)
      .then((data) => {
        const { id, email } = data.body
        expect(id).toBeDefined()
        expect(email).toEqual('ger@abv.bg')
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({ email: 'ger@abv.bg', password: '1234' })
          .expect(201)
          .then(async (data) => {
            const { id, email } = data.body
            expect(id).toBeDefined()
            expect(email).toEqual('ger@abv.bg')
            const rawCookie = data.get('Set-Cookie'); // This is an array: ['session=...', 'session.sig=...']
            expect(rawCookie).toBeDefined();

            if (rawCookie) {
              // Join the cookies together into a single header string: "session=...; session.sig=..."
              const cookieHeader = rawCookie.map(c => c.split(';')[0]).join('; ');
              console.log(cookieHeader)
              const { body } = await request(app.getHttpServer())
                .get('/auth/whoami')
                .set('Cookie', cookieHeader) // Pass both session AND session.sig
                .expect(200);

              expect(body.email).toEqual('ger@abv.bg');
            }
          })
      })
  });
  it('Try to sign up with user that DOES EXIST', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'ger@abv.bg', password: '1234' })
      .expect(400)

  });
  it('Tries to sign in with existing user with the right password', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'ger@abv.bg', password: '1234' })
      .expect(201)
      .then(async (data) => {
        const { id, email } = data.body
        expect(id).toBeDefined()
        expect(email).toEqual('ger@abv.bg')
        const cookie = (data.get('Set-Cookie'))
        expect(cookie).toBeDefined()
        if (cookie) {
          const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200)
          expect(body.email).toEqual('ger@abv.bg')
        }


      })
  })

  afterEach(async () => {
    await app.close();
  });
});