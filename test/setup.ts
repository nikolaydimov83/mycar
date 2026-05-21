import { unlink } from "fs/promises";
global.afterAll(async ()=>{
    await unlink('db.sqliteTest')
})