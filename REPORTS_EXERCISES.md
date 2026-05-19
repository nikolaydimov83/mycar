# Exercise Plan: Reports Module Learning Path

This plan mirrors your users module progression. Each exercise builds on the previous one.

## Exercise 1: Report Entity
- Add `@Column()` decorators for `price` (currently `Number` type, should be `number`)
- Add `@ManyToOne()` relationship to `User` entity (each report belongs to a user)
- Add `createdAt` column with `@CreateDateColumn()`

## Exercise 2: Report DTOs
- Create `create-report.dto.ts`: `price` with `@IsNumber()`, `userId` with `@IsNumber()`
- Create `update-report.dto.ts`: `price?: number` with `@IsNumber()` and `@IsOptional()`
- Create `report.dto.ts`: serialization DTO with `@Expose()` decorators

## Exercise 3: Reports Service CRUD
- Implement `create(price: number, userId: number)`
- Implement `findOne(id: number)`
- Implement `findAll()`
- Implement `update(id: number, props: Partial<Report>)`
- Implement `delete(id: number)`

## Exercise 4: Reports Controller Endpoints
- `POST /reports` - create report (use `@Body()`, `@CurrentUser()`)
- `GET /reports/:id` - get one report
- `GET /reports` - list all reports
- `PUT /reports/:id` - update report
- `DELETE /reports/:id` - delete report

## Exercise 5: Serialization Interceptor
- Add `@Serialize(ReportDto)` to controller class
- Ensure sensitive data is excluded from responses

## Exercise 6: Authentication Integration
- Add `@UseGuards(AuthGuard)` to protect reports endpoints
- Use `@CurrentUser()` to get current user in controller methods
- Add authorization: only report owner can update/delete

## Exercise 7: Report Module Dependencies
- Import `TypeOrmModule.forFeature([Report])` in ReportsModule
- Import `UsersModule` for user lookup capabilities
- Remove unnecessary User imports from ReportsModule
