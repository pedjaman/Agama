const {Menu} = require('electron'),
      electron = require('electron'),
      app = electron.app,
      {shell} = require('electron');

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.webContents.toggleDevTools();
        }
      },
      /*{
        label: 'Relaunch app',
        click (item, focusedWindow) {
          if (focusedWindow)
            app.relaunch({ args: process.argv.slice(1).concat([ '--relaunch' ]) });
            app.exit(0);
        }
        TODO: figure out a way to restart iguana and komodod, reload gui
      },*/     
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    label: 'Support',
    submenu: [
      {
        label: 'Supernet.org',
        click () {
          if (process.platform === 'linux') {
            require('child_process').exec('xdg-open http://support.supernet.org');
          } else {
            shell.openExternal('http://support.supernet.org');
          }
        }
      },
      {
        label: 'Slack',
        click () {
          if (process.platform === 'linux') {
            require('child_process').exec('xdg-open https://sprnt.slack.com/messages/support');
          } else {
            shell.openExternal('https://sprnt.slack.com/messages/support');
          }
        }
      },
      {
        label: 'Github',
        click () {
          if (process.platform === 'linux') {
            require('child_process').exec('xdg-open https://github.com/SuperNETorg/iguana/issues');
          } else {
            shell.openExternal('https://github.com/SuperNETorg/iguana/issues');
          }
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  const name = app.getName();

  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        role: 'close'
      }
    ]
  });
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  );
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
};

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);