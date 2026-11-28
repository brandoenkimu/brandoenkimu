import { useCallback, useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
};

export type GitHubProfile = {
  public_repos: number;
  bio: string | null;
  avatar_url: string;
};

export function useGithub(username: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const headers = { Accept: "application/vnd.github+json" };
      const [reposRes, profileRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
        fetch(`https://api.github.com/users/${username}`, { headers }),
      ]);
      if (!reposRes.ok) {
        throw new Error(
          reposRes.status === 403
            ? "GitHub rate limit reached. Please try again shortly."
            : `GitHub API returned ${reposRes.status}.`
        );
      }
      const data: Repo[] = await reposRes.json();
      setRepos(data.filter((r) => !r.fork));
      if (profileRes.ok) setProfile(await profileRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load repositories.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    void load();
  }, [load]);

  return { repos, profile, loading, error, refresh: load };
}