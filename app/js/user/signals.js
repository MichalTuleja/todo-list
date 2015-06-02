/* 
 */

var Signal = signals.Signal;

var Signals = {
    data: {
        syncStarted: new Signal(),
        syncFinished: new Signal(),
        forceSync: new Signal(),
        forceReload: new Signal()
    }
};