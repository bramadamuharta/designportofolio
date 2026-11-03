# Vendored skill — provenance

This skill is a vendored copy of **tasteskill** by Leon Lin (`Leonxlnx`).

| | |
|---|---|
| Upstream | https://github.com/Leonxlnx/taste-skill |
| Commit | `12af471f627f866411b4bd785b19646d3672784c` |
| Upstream subject | tasteskill v2.1.5: community fixes (#172) |
| Vendored on | 2026-11-03 |
| Licence | MIT — see `LICENSE` in this folder |
| Source path upstream | `skills/taste-skill/` |

## Why vendored instead of symlinked

Upstream ships `install.sh`, which symlinks the skill into `~/.claude/skills`.
That suits a long-lived workstation, but this project is also worked on from
ephemeral cloud containers where `$HOME` does not survive between sessions, and
by collaborators who only clone this repository. Committing the skill means it
loads for anyone who opens the repo, with no install step.

## Updating

```bash
git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/taste-skill
rsync -a --delete /tmp/taste-skill/skills/taste-skill/ .claude/skills/design-taste-frontend/ \
  --exclude VENDORED.md --exclude LICENSE
cp /tmp/taste-skill/LICENSE .claude/skills/design-taste-frontend/LICENSE
```

Then refresh the commit hash in the table above. Review the upstream diff before
committing: a skill is instructions an agent will follow, so it deserves the same
scrutiny as a dependency bump.
