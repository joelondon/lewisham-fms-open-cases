// const records = await Deno.readTextFile('fixmystreet-open-cases.json');

// const data:object[] = JSON.parse(records).service_requests
// const header:string[] = Object.keys(data[0]).filter(el => el !== 'agency_responsible')

// // data.unshift(header)

// // WRITE CSV
// import {exists} from "https://deno.land/std/fs/mod.ts";
// const filename = "fixmystreet-open-cases.csv"
// exists(filename).then((result) => Deno.truncate(filename));
// import {CsvFile} from "https://deno.land/x/csv_file/mod.ts";
// let csv = new CsvFile(await Deno.open(filename, {read: true, write: true, create: true, truncate: true}));
// await csv.writeRecord(header.map(el => String(el)))
// for (const el of data) {
//     await csv.writeRecord(Object.values(el).map(el => String(el)))
// }
// csv.close();

// import safeEval from 'https://raw.githubusercontent.com/deepakshrma/deno-by-example/master/examples/safe_eval.ts'
import safeEval from './safe_eval.ts'
const response = await Deno.readTextFile('fixmystreet-open-cases.json')
try {
  const ret = safeEval('.service_requests', JSON.parse(response))
  console.log(JSON.stringify(ret))
  await Deno.writeTextFile(
    'fixmystreet-open-cases.json',
    JSON.stringify(ret, null, '  ')
  )
} catch (err) {
  console.log(response)
}

const pip_install = Deno.run({
  cmd: ['python', '-m', 'pip', 'install', '-r', 'requirements.txt']
})

await pip_install.status()

// Forwards the execution to the python script
const py_run = Deno.run({
  cmd: ['python', './postprocess.py'].concat(Deno.args)
})

await py_run.status()
