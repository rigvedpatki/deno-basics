const file = await Deno.open("greet.txt");

await Deno.copy(file, Deno.stdout);

file.close();

const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("greet.txt");
console.log("\n", decoder.decode(data));
