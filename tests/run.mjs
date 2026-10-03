import ts from 'typescript';
import { mkdtemp, readdir, rm, readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
// Build TypeScript tests into an isolated project-local directory, keeping
// external dependencies resolvable without modifying application source.
const directory = await mkdtemp(path.resolve('.test-build-'));
try {
  const tests = (await readdir('tests')).filter(name => name.endsWith('.test.ts')).map(name => path.join('tests', name));
  const entries = ['lib/investor.ts', 'app/api/investors/route.ts', ...tests];
  for (const entry of entries) {
    const output = path.join(directory, entry.replace(/\.ts$/, '.js'));
    await mkdir(path.dirname(output), { recursive: true });
    const source = await readFile(entry, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
    await writeFile(output, outputText);
  }
  const files = tests.map(name => path.join(directory, name.replace(/\.ts$/, '.js')));
  const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally { await rm(directory, { recursive: true, force: true }); }
