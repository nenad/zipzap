const path = require('path')
const electron = require('electron')
const { app, BrowserWindow } = electron

let initialPage = null;
let dashboard = null;
let dashboardNext = null;

let pages = [
  {
    'url': 'http://google.com?q=1',
    'displayTime': 3000,
  },
  {
    'url': 'http://google.com?q=2',
    'displayTime': 3000,
  }
];

function initialize() {
  const windowOptions = {
    backgroundColor: '#333333',
    show: false,
    frame: false,
    width: electron.screen.getPrimaryDisplay().workAreaSize.width,
    height: electron.screen.getPrimaryDisplay().workAreaSize.height
  }

  initialPage = new BrowserWindow(windowOptions);
  initialPage.loadURL(path.join('file://', __dirname, '/assets/index.html'));
  initialPage.once('ready-to-show', () => {
    initialPage.show();
    initialPage.setFullScreen(true);
  });
  initialPage.once('closed', () => initialPage = null);

  if (pages.length === 0) {
    return
  }
  dashboard = new BrowserWindow(windowOptions);
  dashboardNext = new BrowserWindow(windowOptions);

  dashboard.loadURL(pages[0].url);
  dashboard.hide();
  dashboard.once('ready-to-show', () => {
    initialPage.destroy();
    changeScreens();
  });
}

async function changeScreens() {
  let temp = null;
  let shouldLoop = true;
  let index = 0;

  while (shouldLoop) {
    let currentPage = pages[index];
    index === pages.length - 1 ? index = 0 : ++index; // Loop through the pages
    let nextPage = pages[index];

    dashboard.setFullScreen(true); // Implicit show()

    dashboardNext.loadURL(nextPage.url); // Preload the next dashboard
    dashboardNext.hide();

    await wait(currentPage.displayTime);

    temp = dashboard;
    dashboard = dashboardNext;
    dashboardNext = temp;
  }
}

app.on('ready', () => {
  initialize()
})

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}