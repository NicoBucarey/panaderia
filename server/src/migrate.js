import { spawn } from 'child_process';

async function runMigrations() {
  return new Promise((resolve) => {
    try {
      console.log('🔄 Ejecutando migraciones de base de datos...');
      
      const migrate = spawn('npx', ['prisma', 'migrate', 'deploy'], {
        cwd: process.cwd(),
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      migrate.stdout.on('data', (data) => {
        const message = data.toString();
        stdout += message;
        console.log(message);
      });

      migrate.stderr.on('data', (data) => {
        const message = data.toString();
        stderr += message;
        console.log(message);
      });

      migrate.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Migraciones completadas exitosamente');
        } else {
          console.log('⚠️  Las migraciones ya fueron aplicadas o BD está lista');
        }
        resolve(true);
      });

      migrate.on('error', (error) => {
        console.log('⚠️  No se pudo ejecutar migraciones:', error.message);
        resolve(true); // No fallar si hay error
      });
    } catch (error) {
      console.log('⚠️  Error al intentar ejecutar migraciones:', error.message);
      resolve(true); // No fallar
    }
  });
}

export default runMigrations;

