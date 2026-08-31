const bcrypt = require('bcryptjs');
async function test() {
  const hash = '$2b$10$IypQouxyFjSjM74WD3D6gu7ECm2usndQjQM2vwBanQA9ir3gdWOP2';
  const match = await bcrypt.compare('clavel2025!', hash);
  console.log('Match?', match);
}
test();
