import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Authentication controllers (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform:true }));
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
        const rawCookie = data.get('Set-Cookie');
        expect(rawCookie).toBeDefined();
        if (rawCookie) {
          const cookie = rawCookie.map(c => c.split(';')[0]).join('; ');
          const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200);
          expect(body.email).toEqual('ger@abv.bg');
        }


      })
  })

  afterEach(async () => {
    await app.close();
  });
});