//// needed to change file name from js to cjs >>> 😒😒  evne can't use file system anymore , problem facing to push on github

// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const Theme = require('../models/themes'); // Adjust path if needed

// const db = require('../config/mongoose-connection.js');

// (async () => {
//   try {
//     const basePath = path.join(__dirname, '../public/assets/Themes');
//     const themeFolders = fs.readdirSync(basePath);

//     for (const folder of themeFolders) {
//       const themeName = folder;

//       // 🛑 Skip if already exists
//       const exists = await Theme.findOne({ themeName });
//       if (exists) {
//         console.log(`⚠️ Skipped (already exists): ${themeName}`);
//         continue;
//       }

//       const themePath = path.join(basePath, folder);

//       const audio1Path = path.join(themePath, 'audio1.mp3');
//       const audio2Path = path.join(themePath, 'audio2.mp3');
//       const animPath = path.join(themePath, 'anim.mp4');

//       // ❌ Skip if any file missing
//       if (!fs.existsSync(audio1Path) || !fs.existsSync(audio2Path) || !fs.existsSync(animPath)) {
//         console.warn(`⚠️ Skipping ${folder} — Missing files.`);
//         continue;
//       }

//       // ✅ Save paths in DB
//       await Theme.create({
//         themeName: folder,
//         firstaudio: `/assets/Themes/${folder}/audio1.mp3`,
//         secondaudio: `/assets/Themes/${folder}/audio2.mp3`,
//         animation: `/assets/Themes/${folder}/anim.mp4`,
//       });

//       console.log(`✅ Seeded theme: ${folder}`);
//     }

//     console.log('🎉 All themes seeded successfully!');
//     process.exit(0);
//   } catch (err) {
//     console.error('❌ Error while seeding:', err);
//     process.exit(1);
//   }
// })();


const mongoose = require('mongoose');
const Theme = require('../models/themes');
const db = require('../config/mongoose-connection.js');

const themes = [
  {
    themeName: 'handpan',
    animation: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/handpan/anim.mp4',
    firstaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/handpan/audio1.mp3',
    secondaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/handpan/audio2.mp3',
  },
  {
    themeName: 'nightFocus',
    animation: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/nightFocus/anim.mp4',
    firstaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/nightFocus/audio1.mp3',
    secondaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/nightFocus/audio2.mp3',
  },
  {
    themeName: 'lowIntensity',
    animation: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/lowIntensity/anim.mp4',
    firstaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/lowIntensity/audio1.mp3',
    secondaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/lowIntensity/audio2.mp3',
  },
  {
    themeName: 'Rainfall',
    animation: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/Rainfall/anim.mp4',
    firstaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/Rainfall/audio1.mp3',
    secondaudio: 'https://raw.githubusercontent.com/neelamPatidar-415/session-audio-video-assets/main/assets/themes/Rainfall/audio2.mp3',
  },
];

(async () => {
  try {
    for (const theme of themes) {
      const exists = await Theme.findOne({ themeName: theme.themeName });
      if (exists) continue;

      await Theme.create(theme);
      console.log(`✅ Seeded: ${theme.themeName}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("🌱 Theme seeding script finished.");
})();

