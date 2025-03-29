# fetchlog

zip log files for user

## Usage

```bash
npx fetchlog <file_glob_patterns>
```

Support environment variable:

- $XDG_DATA_HOME:   ~/.local
- $XDG_CACHE_HOME:  ~/.cache
- $XDG_CONFIG_HOME: ~/.config

e.g: `npx fetchlog "$XDG_DATA_HOME/logs/*.log"`

## Reference

* glob use: https://www.npmjs.com/package/fast-glob
* zip  use: https://www.npmjs.com/package/adm-zip


<!--
## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.
-->

## Changelog

[Changelog](./CHANGELOG.md)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

[MIT](https://choosealicense.com/licenses/mit/)
