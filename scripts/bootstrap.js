import { execaSync } from 'execa';

try {
  const { stdout } = await execaSync('pnpm', ['run', 'p']);
  console.log(stdout);
} catch (error) {
  console.log(error);
}
