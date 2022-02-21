import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

console.log(localStorage);
const player = new Player('vimeo-player');
const key = localStorage.getItem('videoplayer-current-time');
player
  .setCurrentTime(key)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000),
);
