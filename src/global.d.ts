export {};

declare global {
  interface Window {
    PPRO: {
      app: {
        project: {
          activeSequence: {
            createMarker: (options: {
              name: string;
              comments: string;
            }) => void;
            audioTracks: unknown[];
            videoTracks: unknown[];
          } | null;

          exportMedia: (
            sequence: unknown,
            fileName: string,
            options: {
              preset: string;
            }
          ) => void;
        };
      };
    };
  }
}