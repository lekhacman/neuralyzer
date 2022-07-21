# Neuralyzer
A Chrome plugin that has the ability to bring the kiosk back to its homepage from any other websites.

![Neuralizer](https://duckduckgo.com/i/4b28a7b3.jpg)

## User guide: How to

### Setup
1. Download [Neuralyzer](https://github.com/lekhacman/neuralyzer/archive/refs/heads/clients/khaos.zip) and unzip file on the kiosk.
2. Open Chrome browser and type [chrome://extensions](chrome://extensions) on the address bar.
3. Turn on `Developer mode` (usually in the top right corner).
4. Congrats! You are now a 'developer'. Now click on `Load unpacked` button and point to the neuralyzer folder 
that contains the `manifest.json` which is `src` folder in this case.
5. Neuralyzer has been installed, now you have to config it by clicking on the `extensions` icon
on the right side of the address bar on Chrome and choose `Neuralyzer` to open the configuration box.
6. Set the target URL which is the kiosk's homepage in this case.
7. Reload the kiosk app

### Use
After setup, a tiny dot appears at the bottom left corner. When you want to bring the kiosk back to the configured homepage, just tap on the dot 10 times continuously.

Hope you find this helpful. Have fun!

### Developer guide
1. Create a `.env` file
```
# For linux
BROWSER=google-chrome
# For mac
#BROWSER=google chrome
```
2. To develop plugin configuration `yarn start:options`
3. To develop the main plugin `yarn start:neuralyzer`

There is a `chrome` polyfill in `./config/chrome` for us to develop and debug out of Chrome's plugin platform. 

Plugin's version can be configured in `package.json`
