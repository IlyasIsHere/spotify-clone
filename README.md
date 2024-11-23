# Spotify Clone Application 🎵

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Installation and Deployment Guide](#installation-and-deployment-guide)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Project Description
This project is a Spotify Clone Application built using Vue.js, Nuxt.js, and the Spotify API. It aims to provide a fully functional web application with features like music search, track playback, playlist management, and user profile display. The application offers a sleek user interface and intuitive navigation to replicate a Spotify-like experience.

## Features
- **User Authentication**
  - OAuth 2.0 integration for authenticating with Spotify user accounts.
  - Access and refresh token management to ensure seamless access to user data.
- **Navigation**
  - Home page displaying recommended playlists or tracks.
  - Intuitive navigation bar for accessing various sections (Search, Playlists, Profile, etc.).
- **Search**
  - Search functionality to find artists, albums, playlists, or tracks.
  - Display of search results in interactive cards for easy exploration.
- **Playlist Management**
  - Display of playlists created by the authenticated user.
  - Features to create and edit playlists, including adding or removing tracks.
- **Music Player**
  - User-friendly interface for playing, pausing, and skipping tracks.
  - Real-time display of the currently playing track, including title, artist, and album details.

## Installation and Deployment Guide

### Prerequisites
- Node.js (v14 or later)
- Yarn package manager
- Spotify Developer Account and API credentials

### Clone the Repository
```bash
git clone https://github.com/IlyasIsHere/spotify-clone.git
cd spotify-clone
```

### Install Dependencies
Using Yarn:
```bash
yarn install
```

### Set Up Environment Variables
Create a `.env` file at the root of your project and add the following variables:
```env
NUXT_PUBLIC_SPOTIFY_CLIENT_ID=your-client-id
NUXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your-client-secret
NUXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

### Run the Development Server
Start the server in development mode with Yarn:
```bash
yarn dev
```
Visit `http://localhost:3000` to access the application.

### Build for Production
To build the application for production:
```bash
yarn build
```
Deploy the `dist` folder to your preferred hosting platform.

## API Endpoints

### Spotify API Endpoints Used:
1. **Authorization**
   - Endpoint: `https://accounts.spotify.com/api/token`
   - Method: POST
   - Purpose: To obtain access and refresh tokens.

2. **User Profile**
   - Endpoint: `https://api.spotify.com/v1/me`
   - Method: GET
   - Purpose: Retrieve authenticated user's profile information.

3. **Search**
   - Endpoint: `https://api.spotify.com/v1/search`
   - Method: GET
   - Query Parameters:
     - `q`: The search query.
     - `type`: Type of item to search (artist, album, track, playlist).
   - Purpose: Search for Spotify content.

4. **User Playlists**
   - Endpoint: `https://api.spotify.com/v1/me/playlists`
   - Method: GET
   - Purpose: Retrieve playlists created by the user.

5. **Playlist Management**
   - Create Playlist: `POST /v1/users/{user_id}/playlists`
   - Add Tracks: `POST /v1/playlists/{playlist_id}/tracks`
   - Remove Tracks: `DELETE /v1/playlists/{playlist_id}/tracks`

6. **Playback**
   - Endpoint: `https://api.spotify.com/v1/me/player`
   - Methods: GET, POST
   - Purpose: Control playback or retrieve current playback state.

## Technologies Used
- Frontend: Vue.js, Nuxt.js
- API: Spotify API
- Authentication: OAuth 2.0
