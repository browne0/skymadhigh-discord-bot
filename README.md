Most of this bot is based off the YouTube API.

# Commands

## General

_search_ - Returns the top 5 results from YouTube search.

## Controls

_play_ - Plays the first song in the queue, a specific song in the queue, or a
song given a YouTube video URL.

example: `!play`

2nd example: `!play https://www.youtube.com/watch?v=Ww9S7YWD-Ew`

3rd example: `!play 2`

_pause_ - Pauses current song

example: `!pause`

_resume_ - Resumes current song

example: `!resume`

_add_ - Adds a song to the queue, given a YouTube video url.

example: `!add https://www.youtube.com/watch?v=Ww9S7YWD-Ew`

_stop_ - Stops the Discord bot, and makes the bot leave the channel.

example: `!stop`

_queue_ - Lists the current song queue for the Discord bot

example: `!queue`

_volume_ - Sets the volume of the Discord bot, out of 100. (default is 5)

example: `!volume`

_help_ - Posts the commands to use this bot in the Discord chat.

example: `!help`

_clear_ - Clears all messages for a channel

example: `!clear`

<!---
## Playlists

_playlist list_ - Lists all the playlists for your Discord account.

_playlist add_ - Adds a YouTube playlist to your list of playlists.

_playlist remove_ - Removes a YouTube playlist from your list of playlists.

_playlist play_ - Plays a playlist on your list of playlists.

### Adding Playlists

#### YouTube
--->

<!---
#### Spotify

Currently, Spotify doesn't allow you to stream music via their API. However, you
can convert a spotify playlist to a YouTube playlist on your account, by using
the command:

`!add spotify [spotify url]`

-->
### Installing the bot

For this project you will need [NodeJS 8.0.0](https://nodejs.org/en/download/) or newer.

Once you have node installed do the following:

Since this project uses node-opus to handle audio, you will need to install [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

Run this command to install it: `npm install --global windows-build-tools`

Once that's done, clone or download this repo, open the directory with 'package.json' in it and run `npm install`.

### Starting the bot

Now that the bot has all the dependencies installed, you can run:

`npm run start` 

or if you use yarn package manager: 

`yarn start`

If you run into any issues feel free to leave a message on this repo, or email me at malik@malikbrowne.com
