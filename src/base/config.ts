/*
  支持环境变量：
  - $XDG_DATA_HOME:   ~/.local
  - $XDG_CACHE_HOME:  ~/.cache
  - $XDG_CONFIG_HOME: ~/.config
*/

export const CONFIG: Record<string, string[]> = {
  d2c: [
    '$XDG_DATA_HOME/design2code/*.log',
    '!$XDG_DATA_HOME/design2code/daemon-*.log',
    '$XDG_CACHE_HOME/design2code/daemon.out',
    '$XDG_CACHE_HOME/design2code/daemon.pid',
  ],
}
