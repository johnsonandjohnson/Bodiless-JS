# VS Code

## Troubleshooting

### Keys will not repeat when held down

On OSX, there is an issue with Apple's "Press&Hold" feature, where you can select alternative
characters on long presses. This may interfere with auto-repeat for standard keys (which is very
useful if you are using Vim emulation, for example).

You can disable this "feature" with a defaults command in the terminal:

```shell-session
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false
```

You have to restart VS Code afterwards.

To reenable the previous behaviour:

```shell-session
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool true
```
