import { useEffect, useState } from "react";
import { superscoreTournament } from "../data/superscoreTournament";
import GoogleSheetScores from "./GoogleSheetScores";
import { googleScoresConfig } from "../data/googleScores";

const mediaBaseUrl = "https://mscsuper.blr1.digitaloceanspaces.com";

function formatDate(value) {
  if (!value) return "To be announced";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatStatus(tournament) {
  const today = new Date();
  const startDate = tournament.from_date ? new Date(tournament.from_date) : null;
  const endDate = tournament.to_date ? new Date(tournament.to_date) : null;

  if (startDate && today < startDate) return "Upcoming";
  if (endDate && today > endDate) return "Completed";
  return "Live";
}

function getTeamLogo(path, logo) {
  const baseUrl = path || mediaBaseUrl;
  return `${baseUrl.replace(/\/$/, "")}/${logo}`;
}

function SuperscoreTournament({ compact = false }) {
  const [data, setData] = useState({ tournament: null, teams: [], teamPath: "" });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const loadTournament = async () => {
      try {
        const tournamentUrl = `${superscoreTournament.apiBaseUrl}/tournaments/global-tournaments/0?tnid=${superscoreTournament.id}`;
        const teamsUrl = `${superscoreTournament.apiBaseUrl}/teams/tournament-teams-gen/${superscoreTournament.id}`;
        const [tournamentResponse, teamsResponse] = await Promise.all([
          fetch(tournamentUrl, { cache: "no-store" }),
          fetch(teamsUrl, { cache: "no-store" }),
        ]);

        if (!tournamentResponse.ok || !teamsResponse.ok) {
          throw new Error("Unable to load tournament");
        }

        const tournamentPayload = await tournamentResponse.json();
        const teamsPayload = await teamsResponse.json();
        const tournament = tournamentPayload.data?.list?.[0];

        if (!tournament) throw new Error("Tournament not found");

        if (active) {
          setData({
            tournament,
            teams: teamsPayload.data?.list ?? [],
            teamPath: teamsPayload.data?.path ?? "",
          });
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    };

    loadTournament();
    const refreshId = window.setInterval(
      loadTournament,
      superscoreTournament.refreshIntervalMs,
    );

    return () => {
      active = false;
      window.clearInterval(refreshId);
    };
  }, []);

const isReady = status === "ready";
  const tournamentStatus = isReady ? formatStatus(data.tournament) : null;
  const sortedTeams = isReady ? [...data.teams].sort(
    (first, second) => Number(second.point) - Number(first.point),
  ) : [];

  return (
    <section className={compact ? "mt-8" : "pb-16"} aria-live="polite">
      <div className={compact ? "" : "px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"}>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 md:p-8 shadow-xl">
          {isReady ? (
            <>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500" />
                    </span>
                    <span className="font-bold tracking-widest text-pink-400">{tournamentStatus.toUpperCase()} TOURNAMENT</span>
                  </div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-black">{data.tournament.title}</h2>
                  <p className="mt-2 text-zinc-300">
                    {data.tournament.sport} · Season {data.tournament.season} · {data.tournament.city}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {formatDate(data.tournament.from_date)} – {formatDate(data.tournament.to_date)}
                  </p>
                </div>
                <a
                  href={superscoreTournament.detailsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full md:w-auto inline-flex shrink-0 justify-center rounded-xl border border-pink-500 px-5 py-3 font-bold text-pink-300 transition hover:bg-pink-500 hover:text-white mt-3 md:mt-0"
                >
                  View on SuperScore ↗
                </a>
              </div>

              {!compact && (
                <div className="mt-7 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                  <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Format</span>{data.tournament.type || "—"}</div>
                  <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Game points</span>{data.tournament.game_point || "—"}</div>
                  <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Win points</span>{data.tournament.win_point ?? "—"}</div>
                  <div className="rounded-xl bg-black/30 p-4"><span className="block text-zinc-500">Teams</span>{data.teams.length}</div>
                </div>
              )}

              {/* Live standings temporarily hidden — using Google Sheet as primary source. */}
              <div className="mt-6">
                <p className="text-sm text-zinc-400">Live standings are temporarily hidden while the SuperScore integration is offline. Scores and standings are shown from the Google Sheet below.</p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 text-center text-zinc-300">
              <p>{status === "loading" ? "Loading live tournament details…" : "Live tournament details are temporarily unavailable. Please refresh in a moment."}</p>
            </div>
          )}

          <GoogleSheetScores />
        </div>
      </div>
    </section>
  );
}

export default SuperscoreTournament;
