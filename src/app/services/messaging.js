import socketCluster from 'socketcluster-client';
import socketOptions from '../constants/socketOptions';

let socket;
let channel;

export function subscribe(subscriber, options = socketOptions, onInstancesChanged) {
  if (channel) channel.unwatch();
  if (socket) socket.disconnect();
  socket = socketCluster.connect(options);

  socket.emit('login', {}, (err, channelName) => {
    if (err) { console.error(err); return; }
    channel = socket.subscribe(channelName);
    channel.watch(req => {
      let data;
      if (req.data) {
        data = req.data;
        data.id = req.id;
      } else data = req;

      if (data.type === 'DISCONNECTED') {
        onInstancesChanged(req.id, undefined, true);
        return;
      }
      subscriber(data);
    });
  });
}

export function dispatchRemotely(action, id) {
  socket.emit(
    'sc-' + id,
    { type: 'DISPATCH', action }
  );
}
