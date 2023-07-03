export const SHOW_MSG = 'show-msg'

function createEventEmitter() {
    const listenersMap = {}
    return {
        on(evName, listener){
            listenersMap[evName] = (listenersMap[evName])? [...listenersMap[evName], listener] : [listener]
            return ()=>{
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBus = createEventEmitter()


// eventBus.on('puk', (level)=>{
//     console.log('Got a Puk, level:', level)
// })

// eventBus.emit('puk', 17)
// eventBus.emit('puk', 7)
// setTimeout(()=>{
//     eventBus.emit('puk', 3)
// }, 1500)

export function showUserMsg(msg) {
    eventBus.emit('show-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({txt, type: 'success'})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error'})
}