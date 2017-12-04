Most of this bot is based off the YouTube API.

# Commands

## General

_search_ - Returns the top 5 results from YouTube search.

## Controls

_play_ - Plays a song or playlist given a YouTube video URL.

example: `!play https://www.youtube.com/watch?v=Ww9S7YWD-Ew`

2nd example: `!play playlist my-rock-playlist`

_pause_ - Pauses current song

example: `!pause`

_resume_ - Resumes current song

example: `!resume`

_add_ - Adds a song to the queue, given a YouTube video url.

example: `!add https://www.youtube.com/watch?v=Ww9S7YWD-Ew`

_stop_ - Stops the Discord bot, and makes the bot leave the channel.

## Playlists

_playlist list_ - Lists all the playlists for your Discord account.

_playlist add_ - Adds a YouTube playlist to your list of playlists.

_playlist remove_ - Removes a YouTube playlist from your list of playlists.

_playlist play_ - Plays a playlist on your list of playlists.

### Adding Playlists

#### YouTube

#### Spotify

Currently, Spotify doesn't allow you to stream music via their API. However, you
can convert a spotify playlist to a YouTube playlist on your account, by using
the command:

`!add spotify [spotify url]`
