export interface PlaylistResponse {
  items: PlaylistItem[];
  next: string | null;
}

interface PlaylistTrack {
  artists: { name: string }[];
  album: Album;
  name: string;
}

interface PlaylistItem {
  track: PlaylistTrack;
}

export interface Track {
  artists: string[];
  name: string;
  image: string;
  album: string;
}

interface Image {
  url: string;
}

interface Album {
  images: Image[];
  name: string;
}
