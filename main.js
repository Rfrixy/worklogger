const { app, BrowserWindow, Notification} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win
var current_cron
function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 700, height: 65, show:false ,frame: false,transparent:true})
  
    // and load the index.html of the app.
    win.loadFile('index.html')
    win.show()
    win.focusOnWebView()
    // Open the DevTools.
    // win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}
  
  function showWindow(e){
    if(e!=null)
        e.preventDefault()
    if( win == null){
        createWindow()
    }else{
        win.show()
        win.focusOnWebView()
    }
  }
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

app.on('ready', function ready(){
    var CronJob = require('cron').CronJob;
    current_cron = new CronJob('0 0,30 * * * *', function() {
        showNotification()
    }, null, true, null);
    // current_cron.stop()
})

function showNotification(){


    let notificationOptions = {
        'title':'Work Logger',
        'body':'Click to log your work'
    }
    let myNotification = new Notification(notificationOptions)
        
    myNotification.show()
    myNotification.on('click', showWindow)
    console.log('notifying')
}

function notificationReply(e,replyText){
    logWork(replyText)
}

app.on('activate', () => {

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (win == null) {
    createWindow()
}
})

exports.handleForm = function handleForm(targetWindow, work) {
    response = logWork(work)
};


function logWork(worktext){
    console.log('logwork was called')
    var fs = require('fs');

    let path = app.getPath('documents')
    path+="/worklog"
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
    d= new Date()
    path+="/" + (d.getMonth()+1) + '_' +  (d.getYear()-100)
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    let LogText = `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]\n${worktext}\n\n`
    fs.appendFile(path+"/"+d.getDate(), LogText, function(err) {
        console.log('appendfile was called')
        if(err) {
                let notifi = new Notification({title:"Error","body":""+err,"silent":true})
                notifi.on("click",function clickfun(e){e.preventDefault()}) // stop weird behaviour
                notifi.show()
        }else{
            let notifi = new Notification({title:"Success","body":"Your log was saved!","silent":true})
            notifi.on("click",function clickfun(e){e.preventDefault()}) // stop weird behaviour
            notifi.show()
        }
        win.close()
    }); 
}
