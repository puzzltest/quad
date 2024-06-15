

export const sound = {};

const sounds = {
  tap1: "8NznahsfU7eMqVvfJTbf6eihN51tdvoix2r6yS1TFS4uQHTLwRED7zqxuEMGUgrop5SJqmv6jKX1CzRTeHFnrSC9taKQ8nxy71pJJewuGKbZLNB4JyfU9sCpX",
  tap2: "57uBnWcURsYH6yXd8EF98QhbN1kxvbnD9U6wE9KTzxa5NHecjxEtNMyLz5N5NpF52KE56ASRyqRayoiAm7JAqEBKrKwrvjqWjEPrtcVGyLe3VZMgAePfeAAdV",
  tap: "7BMHBGL5s2mdZJ4Co7Q5AZRsb7CXDhtn5m1tHcepeZNDn4ZUgAdZBNtvMLCiSFZMgHSU9D6PrC2fFpmnC7uEvv78sd86mMUuXtH8Kqo12TonWoqJ9L3jBtPJw",
};

sound.init = function() {
  for (const k in sounds) {
    sounds[k] = sfxr.toAudio(sounds[k]);
  }
};

sound.play = function(name) {
  return sounds[name]?.play();
};