/*
  支持环境变量：
  - $XDG_DATA_HOME:   ~/.local
  - $XDG_CACHE_HOME:  ~/.cache
  - $XDG_CONFIG_HOME: ~/.config
*/

export const CONFIG: Record<string, string[]> = {
  d2c: [
    '$HOME/.local/design2code/*.log',
    '!$HOME/.local/design2code/daemon-*.log',
    '$HOME/.cache/design2code/daemon.out',
    '$HOME/.cache/design2code/daemon.pid',
  ],
}
