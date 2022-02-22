import React, { useRef } from "react";
import ScriptLoader from "react-script-loader-hoc";

const VIDYARD_EMBED_JS_URL = "https://play.vidyard.com/embed/v4.js";

const VidyardPlayer = ({
  scriptsLoadedSuccessfully,
  maxWidth,
  maxHeight,
  type,
  uuid,
  aspect,
  onLoadCallback,
}) => {
  const containerRef = useRef();

  React.useEffect(() => {
    if (scriptsLoadedSuccessfully) {
      window.VidyardV4.api
        .renderPlayer({
          aspect,
          container: containerRef.current,
          height: maxHeight,
          type,
          uuid,
          width: maxWidth,
        })
        .then((player) => {
          if (onLoadCallback) {
            onLoadCallback(player, window.VidyardV4.api);
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e.message);
        });
    }
  }, [scriptsLoadedSuccessfully]);

  return <div ref={containerRef} />;
};

export default ScriptLoader(VIDYARD_EMBED_JS_URL)(VidyardPlayer);
