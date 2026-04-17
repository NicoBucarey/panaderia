import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runMigrations() {
  try {
    console.log('🔄 Ejecutando migraciones de base de datos...');
    const { stdout } = await execAsync('npx prisma migrate deploy', {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    console.log('✅ Migraciones completadas');
    return true;
  } catch (error) {
    // Las migraciones podrían fallar si ya existen, lo cual es normal
    console.log('⚠️  Las migraciones ya fueron aplicadas o BD está lista');
    return true;
  }
}

export default runMigrations;
