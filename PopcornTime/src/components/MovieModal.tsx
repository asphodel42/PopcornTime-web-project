// src/components/MovieModal.tsx
import { useRef, useEffect } from "react";
import type { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleIframeClick = () => {
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-6xl max-h-screen overflow-y-auto p-6">
        <div
          ref={modalRef}
          className="bg-surface-a0 text-light-a0 rounded-xl shadow-xl"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/10 max-[768px]:h-64 max-[768px]:hidden  p-4">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-auto   rounded-xl"
              />
            </div>

            <div className="md:w-8/10 p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-3xl font-bold text-primary-a10">
                  {movie.title}
                </h2>
                <p className="text-surface-tonal-a40 text-sm mb-2">
                  Release: {movie.releaseDate}
                </p>
                <p className="text-light-a0 text-sm">{movie.description}</p>
              </div>

              <div className="text-sm text-surface-tonal-a50 space-y-1">
                <p>
                  <strong>Rating:</strong> ⭐ {movie.rating.toFixed(1)}
                </p>
                <p>
                  <strong>Budget:</strong> $
                  {movie.budget.toLocaleString() || "N/A"}
                </p>
                <p>
                  <strong>Country:</strong>{" "}
                  {movie.productionCountries.join(", ")}
                </p>
                <p>
                  <strong>Cast:</strong> {movie.cast.slice(0, 8).join(", ")}
                </p>
              </div>
            </div>
          </div>

          {movie.trailer && (
            <div
              className="aspect-video mt-4 cursor-pointer"
              onClick={handleIframeClick}
            >
              <iframe
                ref={iframeRef}
                src={`${movie.trailer.replace(
                  "watch?v=",
                  "embed/"
                )}?enablejsapi=1`}
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-9/10 mx-auto h-full rounded-b-xl"
              ></iframe>
            </div>
          )}

          <div className="flex justify-end p-4">
            <button
              className="px-4 py-2 bg-primary-a0 text-dark-a0 font-semibold rounded hover:bg-primary-a10 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
