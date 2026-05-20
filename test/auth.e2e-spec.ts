import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
// 1. Import cookie-session (or whichever package you use in main.ts)
import cookieSession from 'cookie-session'; 

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
        keys: ['your-test-secret-key'], // This matches your app setup config
      }),
    );

    await app.init();
  });

  it('Sign up with user that does not exist', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email:'ger@abv.bg',password:'1234'})
      .expect(201)
      .then((data)=>{
        const {id,email}=data.body
        expect(id).toBeDefined()
        expect(email).toEqual('ger@abv.bg')
      })
  });

  afterEach(async () => {
    await app.close();
  });
});