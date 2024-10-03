import fs, { close } from 'fs';
// @ts-ignore
Symbol.dispose ??= Symbol("Symbol.dispose")
// @ts-ignore
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose")

export function writeFile(path: string) {
  using file = openFileSync(`files/${path}`)

  fs.writeFileSync(file.handle, "Text\n")

  if (path.includes("temp")) {
    return
  }

  fs.writeFileSync(file.handle, "Permanent")
}

writeFile("a.txt")

export function openFileSync(path: string) {
  const file = fs.openSync(path, "w+")
  console.log("+", path)

  return {
    handle: file,
    // @ts-ignore
    [Symbol.dispose]() {
      console.log("-", path)
      fs.closeSync(file);
    }
  }
}

export async function openFileAsync(path: string) {
  const file = await fs.open(`files/${path}`)
  console.log("+", path)

  return {
    handle: file,
    // @ts-ignore
    async [Symbol.asyncDispose]() {
      console.log("-", path)
    }
  }
}

await using a = openFileAsync("a")
await using b = openFileAsync("b")
if (path.includes("temp")) {
  await using c = openFileAsync("c")
}
await using d  = openFileAsync("d")
await using e = openFileAsync("e")

// Wat teh heck, y not?
const f = await openFileAsync("f")
defer fs.close(f)


// ...


// proposed idiom:
function * g() {
  // block scoped critical resource
  using handle = aacquireFileHandle(); 
}

{
  using obj = g();
  const r = obj.next();
} // calls finally blocks in `g`


//...
// ? Non-blocking memory I/O operations
import { ReaderWriterLock} from '...'
const lock = new ReaderWriterLock();

export async function readData() {
  // ! wait for outstanding writer and take a read lock
  using lockHandle = await lock.read();
  //... any numbe of readers
  await // ...
  //... still in read lock after `await`
} // ! release the read lock !

export async function writeData(data) {
  // ! wait for all readers and take a write lock
  using lockHandle = await lock.write();
  //... only one writer
  await //...
  //... still in write lock after `await`
} // ! release the write lock ! 



/** 
 * ... POTENTIAL FOR ...
 * 
 * use with the  FIXED LAYOUT OBJECTS proposal
 * & SHARED STRUCT
 * */ 
shared struct class SharedData {
  ready = false;
  processed = false;
}
const worker = new Worker('worker.js')
